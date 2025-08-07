import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { setupAuth, isAuthenticated } from "./replitAuth";
import { 
  insertHeroContentSchema,
  insertAboutContentSchema,
  insertProgramSchema,
  insertEventSchema,
  insertLeadershipSchema,
  insertContactInfoSchema,
  insertDonationConfigSchema,
  insertNewsSchema,
  insertPhotoGallerySchema,
  insertMediaCoverageSchema,
} from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Auth middleware
  await setupAuth(app);

  // Auth routes
  app.get('/api/auth/user', isAuthenticated, async (req: any, res) => {
    try {
      const user = req.user;
      res.json(user);
    } catch (error) {
      console.error("Error fetching user:", error);
      res.status(401).json({ message: "Unauthorized" });
    }
  });

  // Public content routes
  app.get('/api/hero', async (req, res) => {
    try {
      const content = await storage.getHeroContent();
      res.json(content || {
        headline: "Give Her a Chance to Learn, Grow, and Thrive.",
        subheading: "Empowering rural girls and differently-abled children through education and care since 1995.",
        backgroundImageUrl: null,
        yearsOfService: "29",
        childrenSupported: "50+",
        corePrograms: "8"
      });
    } catch (error) {
      console.error("Error fetching hero content:", error);
      res.status(500).json({ message: "Failed to fetch hero content" });
    }
  });

  app.get('/api/about', async (req, res) => {
    try {
      const content = await storage.getAboutContent();
      res.json(content || {
        missionTitle: "Our Mission",
        missionDescription: "To empower underprivileged rural girls and differently-abled children by providing quality education, safe accommodation, and comprehensive care, enabling them to build independent and dignified lives.",
        journeyTitle: "Our Journey",
        journeyDescription: "Since 1995, Samruddhi Service Society has been a beacon of hope for marginalized communities. What started as a small initiative has grown into a comprehensive organization touching hundreds of lives through education, empowerment, and care.",
        imageUrl: null
      });
    } catch (error) {
      console.error("Error fetching about content:", error);
      res.status(500).json({ message: "Failed to fetch about content" });
    }
  });

  app.get('/api/programs', async (req, res) => {
    try {
      const programs = await storage.getActivePrograms();
      res.json(programs.length > 0 ? programs : [
        {
          id: 1,
          title: "Free Girls' Hostel",
          description: "Safe accommodation and nutritious meals for underprivileged rural girls",
          icon: "🏠",
          category: "education-childcare",
          isActive: true,
          orderIndex: 1
        },
        {
          id: 2,
          title: "Special Education Center",
          description: "Dedicated educational support for differently-abled children",
          icon: "📚",
          category: "education-childcare",
          isActive: true,
          orderIndex: 2
        },
        {
          id: 3,
          title: "Skill Development Programs",
          description: "Vocational training for sustainable livelihood opportunities",
          icon: "⚒️",
          category: "skill-development",
          isActive: true,
          orderIndex: 3
        }
      ]);
    } catch (error) {
      console.error("Error fetching programs:", error);
      res.status(500).json({ message: "Failed to fetch programs" });
    }
  });

  // Leadership routes
  app.get('/api/leadership', async (req, res) => {
    try {
      const leaders = await storage.getActiveLeadership();
      res.json(leaders);
    } catch (error) {
      console.error("Error fetching leadership:", error);
      res.status(500).json({ message: "Failed to fetch leadership" });
    }
  });

  // Events routes
  app.get('/api/events', async (req, res) => {
    try {
      const events = await storage.getActiveEvents();
      res.json(events);
    } catch (error) {
      console.error("Error fetching events:", error);
      res.status(500).json({ message: "Failed to fetch events" });
    }
  });

  app.get('/api/events/:id', async (req, res) => {
    try {
      const eventId = parseInt(req.params.id);
      const event = await storage.getEventById(eventId);
      if (!event) {
        return res.status(404).json({ message: "Event not found" });
      }
      res.json(event);
    } catch (error) {
      console.error("Error fetching event:", error);
      res.status(500).json({ message: "Failed to fetch event" });
    }
  });

  app.get('/api/contact', async (req, res) => {
    try {
      const contact = await storage.getContactInfo();
      res.json(contact || {
        address: "Samruddhi Service Society\nVillage Nashik, Maharashtra, India\nPIN: 422001",
        phone: "+91 9876543210",
        email: "contact@samruddhisociety.org",
        website: "www.samruddhisociety.org",
        socialMedia: JSON.stringify({
          facebook: "https://facebook.com/samruddhisociety",
          instagram: "https://instagram.com/samruddhisociety",
          twitter: "https://twitter.com/samruddhisociety"
        })
      });
    } catch (error) {
      console.error("Error fetching contact info:", error);
      res.status(500).json({ message: "Failed to fetch contact info" });
    }
  });

  app.get('/api/donation-config', async (req, res) => {
    try {
      const config = await storage.getDonationConfig();
      res.json(config || {
        monthlyAmount: "₹1,500",
        description: "Your monthly contribution can provide education, accommodation, and care for a child in need.",
        bankDetails: "Account Name: Samruddhi Service Society\nAccount Number: 1234567890\nIFSC Code: SBIN0001234\nBank: State Bank of India",
        paymentMethods: "Online Transfer, UPI, Cheque, Cash",
        taxBenefits: "All donations are eligible for 80G tax benefits under Income Tax Act."
      });
    } catch (error) {
      console.error("Error fetching donation config:", error);
      res.status(500).json({ message: "Failed to fetch donation config" });
    }
  });

  // News routes
  app.get('/api/news', async (req, res) => {
    try {
      const newsItems = await storage.getPublishedNews();
      if (newsItems.length === 0) {
        // Return sample news content if no news exists in database
        res.json([
          {
            id: 1,
            title: "Free Girls' Hostel Celebrates 10th Annual Day with Record Enrollment",
            content: "Samruddhi Service Society's Free Girls' Hostel celebrated its 10th Annual Day with great enthusiasm as we now support 65+ rural girls from 7th to 10th standard. The celebration featured cultural performances by the girls, showcasing their talents in dance, singing, and drama. This year, 12 girls from our hostel scored above 85% in their 10th standard board exams, with three securing admission to prestigious colleges. 'Seeing these girls grow from shy village children to confident young women pursuing their dreams is the greatest reward for our work,' said hostel warden Mrs. Sunita Patil.",
            excerpt: "Our Girls' Hostel celebrated its 10th Annual Day with 65+ rural girls showing remarkable achievements in academics and cultural activities.",
            imageUrl: "https://images.unsplash.com/photo-1497486751825-1233686d5d80?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=400",
            programId: 13,
            category: "education",
            tags: JSON.stringify(["education", "girls empowerment", "rural development"]),
            publishedDate: Date.now() - 86400000,
            isPublished: true,
            isActive: true
          },
          {
            id: 2,
            title: "Special Education Center (IDC) Introduces New Therapy Programs",
            content: "Our Integrated Development Center for differently-abled children has expanded its services with the introduction of occupational therapy and speech therapy programs. The new initiatives will benefit 45+ children currently enrolled in our special education program. Dr. Priya Sharma, our newly appointed special educator with 15 years of experience, brings specialized expertise. 'Every child has unique potential. Our job is to identify and nurture that potential through personalized care and education,' she shared during the program launch.",
            excerpt: "IDC expands services with new occupational and speech therapy programs for 45+ differently-abled children.",
            imageUrl: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=400",
            programId: 14,
            category: "special-education",
            tags: JSON.stringify(["special education", "therapy programs", "disability support"]),
            publishedDate: Date.now() - 172800000,
            isPublished: true,
            isActive: true
          },
          {
            id: 3,
            title: "Skill Development Programs Graduate 35 Women in Tailoring & Embroidery",
            content: "Thirty-five women from rural villages around Nashik completed our 6-month tailoring and embroidery training program, marking another successful batch. The graduation ceremony featured beautiful garments and handicrafts created by participants. Meera Devi from Pimpri village shared: 'I can now earn ₹8,000 per month from home while taking care of my family. This training has given me financial independence I never thought possible.' The program has helped over 200 women achieve economic self-sufficiency since its inception.",
            excerpt: "35 women graduated from our tailoring & embroidery program, achieving financial independence with ₹8,000+ monthly earnings.",
            imageUrl: "https://images.unsplash.com/photo-1556740738-b6a63e27c4df?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=400",
            programId: 15,
            category: "skill-development",
            tags: JSON.stringify(["skill development", "women empowerment", "livelihood"]),
            publishedDate: Date.now() - 259200000,
            isPublished: true,
            isActive: true
          },
          {
            id: 4,
            title: "Mid-Day Meal Program Serves 1 Millionth Meal Milestone",
            content: "Our Nutrition & Mid-Day Meal Program reached a historic milestone by serving its 1 millionth nutritious meal to children across 15 village schools in the Nashik region. The program currently provides daily meals to 800+ children, ensuring balanced nutrition essential for healthy growth. 'When children get proper nutrition, their attendance improves and concentration increases,' explained nutrition coordinator Mrs. Kavita Jadhav. Health assessments show a 40% reduction in malnutrition cases among participating children.",
            excerpt: "Historic milestone reached: 1 millionth nutritious meal served to 800+ children across 15 village schools.",
            imageUrl: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=400",
            programId: 16,
            category: "nutrition",
            tags: JSON.stringify(["nutrition", "child care", "health"]),
            publishedDate: Date.now() - 345600000,
            isPublished: true,
            isActive: true
          },
          {
            id: 5,
            title: "Free Medical Camp in Remote Villages Serves 500+ Patients",
            content: "Our healthcare team, in collaboration with district hospital doctors, conducted a comprehensive medical camp across three remote villages, providing free health checkups and treatment to over 500 community members. The three-day camp included general health screening, eye checkups, women's health consultations, and child vaccination drives. Dr. Rajesh Kulkarni noted: 'By bringing services to their doorstep, we're ensuring early detection and treatment of health issues.' The camp distributed free medicines worth ₹75,000.",
            excerpt: "Medical camp provides free healthcare to 500+ patients across three remote villages with ₹75,000 worth of medicines.",
            imageUrl: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=400",
            programId: 17,
            category: "healthcare",
            tags: JSON.stringify(["healthcare", "medical camp", "rural health"]),
            publishedDate: Date.now() - 432000000,
            isPublished: true,
            isActive: true
          },
          {
            id: 6,
            title: "Women Empowerment Initiative Launches New Microfinance Program",
            content: "Building on our women empowerment success, we've launched a microfinance initiative supporting 50 women entrepreneurs with loans ranging from ₹10,000 to ₹50,000. The program includes financial literacy training and business mentorship. Sushma Patil, who received a loan for her vegetable vending business, said: 'The training taught me account maintenance and business planning. In three months, I've doubled my income and can better support my children's education.' The initiative promotes comprehensive women's empowerment including leadership training and legal rights awareness.",
            excerpt: "New microfinance program supports 50 women entrepreneurs with loans up to ₹50,000 plus business mentorship.",
            imageUrl: "https://images.unsplash.com/photo-1556740738-b6a63e27c4df?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=400",
            programId: 18,
            category: "empowerment",
            tags: JSON.stringify(["women empowerment", "microfinance", "entrepreneurship"]),
            publishedDate: Date.now() - 518400000,
            isPublished: true,
            isActive: true
          },
          {
            id: 7,
            title: "Community Development Project Brings Clean Water to 5 Villages",
            content: "Our latest community development project has successfully established clean water access for over 2,000 residents across five villages through bore wells and water purification systems. The project addresses critical water scarcity affecting these communities for decades. Village sarpanch Mr. Ramesh Kale expressed gratitude: 'Our women and children no longer walk 2-3 kilometers daily for water. This project has transformed our village life completely.' The initiative includes training local youth in water system maintenance for long-term sustainability.",
            excerpt: "Clean water access established for 2,000+ residents across 5 villages through new bore wells and purification systems.",
            imageUrl: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=400",
            programId: 19,
            category: "community-development",
            tags: JSON.stringify(["water access", "community development", "infrastructure"]),
            publishedDate: Date.now() - 604800000,
            isPublished: true,
            isActive: true
          },
          {
            id: 8,
            title: "Environmental Conservation Drive Plants 5,000 Trees This Monsoon",
            content: "With the monsoon season, our environmental conservation team successfully planted 5,000 trees across 10 villages in collaboration with local schools and community groups. The plantation focuses on native species for soil erosion prevention and biodiversity improvement. Students from participating schools have adopted trees to monitor their growth as part of environmental education. 'We want children to understand their role as environmental guardians,' said environment coordinator Mr. Suresh Mane. The initiative includes training farmers in organic farming and waste management practices.",
            excerpt: "5,000 native trees planted across 10 villages with students adopting trees as environmental guardians.",
            imageUrl: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=400",
            programId: 20,
            category: "environment",
            tags: JSON.stringify(["tree plantation", "environmental education", "sustainability"]),
            publishedDate: Date.now() - 691200000,
            isPublished: true,
            isActive: true
          },
          {
            id: 9,
            title: "Child Care Center Welcomes 8 New Children, Seeks Foster Support",
            content: "Our Child Care & Shelter facility has welcomed eight new children (ages 6-14) who lost their parents due to various circumstances. Our dedicated caregivers provide comprehensive support including accommodation, nutrition, education, and emotional care. 'Each child carries their own story of loss, but also immense potential for a bright future,' shared childcare coordinator Mrs. Anita Sharma. 'We create a family-like environment where they can heal, learn, and grow.' We're actively seeking foster families and mentors for additional emotional support.",
            excerpt: "8 new children welcomed at our care center, seeking foster families and mentors for comprehensive support.",
            imageUrl: "https://images.unsplash.com/photo-1497486751825-1233686d5d80?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=400",
            programId: 21,
            category: "child-care",
            tags: JSON.stringify(["child care", "orphan support", "foster care"]),
            publishedDate: Date.now() - 777600000,
            isPublished: true,
            isActive: true
          },
          {
            id: 10,
            title: "Free Karate Coaching Program Produces State-Level Champions",
            content: "Two girls from our Free Karate Coaching program, Priya Jadhav (age 14) and Sneha Patil (age 16), won gold medals at the Maharashtra State Karate Championship, bringing pride to their villages and inspiring other rural girls. 'Learning karate has made me physically strong and mentally confident,' said Priya, who started training two years ago. 'I feel safe walking to school and want to become a karate instructor to teach other girls.' Our program currently trains 75+ rural girls free of cost with a 90% improvement in school attendance.",
            excerpt: "Rural girls Priya and Sneha win gold medals at Maharashtra State Karate Championship, inspiring others.",
            imageUrl: "https://images.unsplash.com/photo-1544717297-fa95b6ee9643?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=400",
            programId: 22,
            category: "self-defense",
            tags: JSON.stringify(["karate", "girls empowerment", "sports achievement"]),
            publishedDate: Date.now() - 864000000,
            isPublished: true,
            isActive: true
          },
          {
            id: 11,
            title: "Women Empowerment Programs Show 300% Income Increase for Graduates",
            content: "Our comprehensive women empowerment initiatives have achieved remarkable results with graduates reporting an average 300% increase in monthly income. The programs include leadership training, financial independence coaching, skill development, and awareness sessions for rural women. Over 200 women have completed various empowerment modules since inception. Success stories include micro-entrepreneurs, self-help group leaders, and women taking active roles in village development committees. The program combines practical skills with confidence building and legal rights awareness.",
            excerpt: "Women empowerment graduates achieve 300% income increase through leadership training and skill development programs.",
            imageUrl: "https://images.unsplash.com/photo-1556740738-b6a63e27c4df?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=400",
            programId: 23,
            category: "empowerment",
            tags: JSON.stringify(["women empowerment", "income generation", "leadership"]),
            publishedDate: Date.now() - 950400000,
            isPublished: true,
            isActive: true
          },
          {
            id: 12,
            title: "Old Age Care Services Expands with New Day Care Center",
            content: "Responding to growing needs in rural communities, we've opened a new day care center for elderly citizens in Pimpri village, complementing our existing old age care services. The center provides daily activities, health monitoring, nutritious meals, and social interaction opportunities for 30+ senior citizens. 'Many elderly people in villages feel isolated as their children move to cities for work. This center gives them purpose, companionship, and care,' explained elderly care specialist Mrs. Mangal Devi. The center operates six days a week with physiotherapy, recreational activities, and counseling support.",
            excerpt: "New day care center for elderly citizens provides daily activities, health monitoring, and social interaction for 30+ seniors.",
            imageUrl: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=400",
            programId: 24,
            category: "elderly-care",
            tags: JSON.stringify(["elderly care", "day care center", "community service"]),
            publishedDate: Date.now() - 1036800000,
            isPublished: true,
            isActive: true
          }
        ]);
      }
      res.json(newsItems);
    } catch (error) {
      console.error("Error fetching news:", error);
      res.status(500).json({ message: "Failed to fetch news" });
    }
  });

  app.get('/api/news/:id', async (req, res) => {
    try {
      const newsId = parseInt(req.params.id);
      const newsItem = await storage.getNewsById(newsId);
      if (!newsItem) {
        return res.status(404).json({ message: "News article not found" });
      }
      res.json(newsItem);
    } catch (error) {
      console.error("Error fetching news article:", error);
      res.status(500).json({ message: "Failed to fetch news article" });
    }
  });

  // Photo Gallery routes
  app.get('/api/photo-gallery', async (req, res) => {
    try {
      console.log("Fetching photo gallery...");
      const photos = await storage.getPhotoGallery();
      console.log(`Found ${photos.length} photos`);
      res.json(photos);
    } catch (error) {
      console.error("Error fetching photo gallery:", error);
      res.status(500).json({ message: "Failed to fetch photo gallery", error: error.message });
    }
  });

  // Media Coverage routes
  app.get('/api/media-coverage', async (req, res) => {
    try {
      console.log("Fetching media coverage...");
      const mediaItems = await storage.getMediaCoverage();
      console.log(`Found ${mediaItems.length} media items`);
      res.json(mediaItems);
    } catch (error) {
      console.error("Error fetching media coverage:", error);
      res.status(500).json({ message: "Failed to fetch media coverage", error: error.message });
    }
  });

  // Placeholder image endpoint
  app.get('/api/placeholder/:width/:height', (req, res) => {
    const { width, height } = req.params;
    const color = (req.query.color as string) || 'cccccc';
    const textColor = (req.query.text as string) || '333333';
    const text = (req.query.t as string) || `${width}x${height}`;
    
    res.redirect(`https://via.placeholder.com/${width}x${height}/${color}/${textColor}?text=${encodeURIComponent(text)}`);
  });

  // Admin routes (protected)
  app.put('/api/admin/hero', isAuthenticated, async (req, res) => {
    try {
      const validatedData = insertHeroContentSchema.parse(req.body);
      const updated = await storage.updateHeroContent(validatedData);
      res.json(updated);
    } catch (error) {
      console.error("Error updating hero content:", error);
      res.status(500).json({ message: "Failed to update hero content" });
    }
  });

  app.put('/api/admin/about', isAuthenticated, async (req, res) => {
    try {
      const validatedData = insertAboutContentSchema.parse(req.body);
      const updated = await storage.updateAboutContent(validatedData);
      res.json(updated);
    } catch (error) {
      console.error("Error updating about content:", error);
      res.status(500).json({ message: "Failed to update about content" });
    }
  });

  app.post('/api/admin/events', isAuthenticated, async (req, res) => {
    try {
      const validatedData = insertEventSchema.parse(req.body);
      const created = await storage.createEvent(validatedData);
      res.json(created);
    } catch (error) {
      console.error("Error creating event:", error);
      res.status(500).json({ message: "Failed to create event" });
    }
  });

  app.put('/api/admin/events/:id', isAuthenticated, async (req, res) => {
    try {
      const eventId = parseInt(req.params.id);
      const validatedData = insertEventSchema.partial().parse(req.body);
      const updated = await storage.updateEvent(eventId, validatedData);
      res.json(updated);
    } catch (error) {
      console.error("Error updating event:", error);
      res.status(500).json({ message: "Failed to update event" });
    }
  });

  app.delete('/api/admin/events/:id', isAuthenticated, async (req, res) => {
    try {
      const eventId = parseInt(req.params.id);
      await storage.deleteEvent(eventId);
      res.json({ message: "Event deleted successfully" });
    } catch (error) {
      console.error("Error deleting event:", error);
      res.status(500).json({ message: "Failed to delete event" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { setupAuth, isAuthenticated } from "./replitAuth";
import { 
  insertHeroContentSchema,
  insertAboutContentSchema,
  insertProgramSchema,
  insertTestimonialSchema,
  insertContactInfoSchema,
  insertContactSubmissionSchema,
  insertDonationConfigSchema,
  insertLeadershipSchema,
  insertAnnualReportSchema,
  insertPhotoGallerySchema,
  insertNewsSchema,
  insertCertificationSchema,
  insertImpactStatsSchema,
  insertPublicationSchema,
} from "@shared/schema";
import { z } from "zod";
import { NGOWebScraper } from "./webScraper";

export async function registerRoutes(app: Express): Promise<Server> {
  // Auth middleware
  await setupAuth(app);

  // Auth routes
  app.get('/api/auth/user', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const user = await storage.getUser(userId);
      res.json(user);
    } catch (error) {
      console.error("Error fetching user:", error);
      res.status(500).json({ message: "Failed to fetch user" });
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
        corePrograms: "3"
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
        missionDescription: "Established in 1995, Samruddhi Service Society has been dedicated to empowering underprivileged rural girls and differently-abled children through comprehensive education, shelter, and support services.",
        journeyTitle: "Our Journey",
        journeyDescription: "In 2002, we expanded our mission by establishing a free girls' hostel to promote rural girls' educational development. Today, we provide food, accommodation, and quality education to around 50 children.",
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
      if (programs.length === 0) {
        // Return default programs if none exist
        res.json([
          {
            id: 1,
            title: "Free Girls' Hostel",
            description: "Providing safe accommodation and supportive environment for rural girls from 1st to 10th standard. Our hostel ensures that distance and family circumstances don't become barriers to education.",
            imageUrl: "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=400&h=300&fit=crop&crop=center",
            icon: "fas fa-home",
            isActive: true
          },
          {
            id: 2,
            title: "IDC - Integrated Education",
            description: "Integrated Education for Disabled Children (IDC) program provides specialized education and support for differently-abled children, promoting inclusive learning with state and central government support.",
            imageUrl: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400&h=300&fit=crop&crop=center",
            icon: "fas fa-graduation-cap",
            isActive: true
          },
          {
            id: 3,
            title: "Food & Shelter",
            description: "Comprehensive food and shelter program ensuring nutritious meals and safe accommodation for all children in our care. Basic needs are met so children can focus on learning and growth.",
            imageUrl: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=400&h=300&fit=crop&crop=center",
            icon: "fas fa-utensils",
            isActive: true
          },
          {
            id: 4,
            title: "Free Karate Coaching",
            description: "Empowering girls with self-defense skills through professional karate training. Building confidence, physical fitness, and personal safety awareness in a supportive environment.",
            imageUrl: "https://images.unsplash.com/photo-1555597673-b21d5c935865?w=400&h=300&fit=crop&crop=center",
            icon: "fas fa-fist-raised",
            isActive: true
          }
        ]);
      } else {
        res.json(programs);
      }
    } catch (error) {
      console.error("Error fetching programs:", error);
      res.status(500).json({ message: "Failed to fetch programs" });
    }
  });

  app.get('/api/testimonials', async (req, res) => {
    try {
      const testimonials = await storage.getActiveTestimonials();
      if (testimonials.length === 0) {
        // Return default testimonials if none exist
        res.json([
          {
            id: 1,
            name: "Priya, Grade 8",
            role: "Program Beneficiary",
            quote: "Thanks to Samruddhi, I can focus on my studies without worrying about food or shelter. The teachers here care about us like family.",
            imageUrl: null,
            isActive: true
          },
          {
            id: 2,
            name: "Sunita Devi",
            role: "Parent",
            quote: "My daughter has blossomed at Samruddhi. The education and care she receives here gives her opportunities I never had.",
            imageUrl: null,
            isActive: true
          },
          {
            id: 3,
            name: "Rahul",
            role: "IDC Program",
            quote: "The special attention and adapted learning methods help me learn at my own pace. I feel valued and supported here.",
            imageUrl: null,
            isActive: true
          }
        ]);
      } else {
        res.json(testimonials);
      }
    } catch (error) {
      console.error("Error fetching testimonials:", error);
      res.status(500).json({ message: "Failed to fetch testimonials" });
    }
  });

  app.get('/api/contact', async (req, res) => {
    try {
      const contact = await storage.getContactInfo();
      res.json(contact || {
        address: "Samruddhi Service Society\nVillage Name, District\nState, PIN Code",
        phone: "+91 12345 67890",
        email: "info@samruddhisociety.org",
        facebook: null,
        twitter: null,
        instagram: null
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
        description: "Covers complete support for one child",
        taxBenefits: "80G Tax Benefits",
        razorpayKeyId: null
      });
    } catch (error) {
      console.error("Error fetching donation config:", error);
      res.status(500).json({ message: "Failed to fetch donation config" });
    }
  });

  // Contact form submission
  app.post('/api/contact/submit', async (req, res) => {
    try {
      const validatedData = insertContactSubmissionSchema.parse(req.body);
      const submission = await storage.createContactSubmission(validatedData);
      res.json({ message: "Message sent successfully", id: submission.id });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid form data", errors: error.errors });
      }
      console.error("Error submitting contact form:", error);
      res.status(500).json({ message: "Failed to submit message" });
    }
  });

  // Web scraping endpoint
  app.post('/api/scrape-ngo', async (req, res) => {
    try {
      const { url } = req.body;
      
      if (!url) {
        return res.status(400).json({ message: "URL is required" });
      }
      
      // Validate URL format
      try {
        new URL(url);
      } catch {
        return res.status(400).json({ message: "Invalid URL format" });
      }
      
      const scraper = new NGOWebScraper();
      const scrapedData = await scraper.scrapeNGOWebsite(url);
      
      res.json({
        message: "Website scraped successfully",
        data: scrapedData,
        url: url
      });
      
    } catch (error) {
      console.error("Error scraping website:", error);
      res.status(500).json({ 
        message: "Failed to scrape website", 
        error: error instanceof Error ? error.message : "Unknown error" 
      });
    }
  });

  // Volunteer applications endpoint
  app.post('/api/volunteers/apply', async (req, res) => {
    try {
      const volunteerData = req.body;
      // Store volunteer application as a structured contact submission
      const submissionData = {
        name: volunteerData.name,
        email: volunteerData.email,
        phone: volunteerData.phone || '',
        subject: "Volunteer Application",
        message: `
Age: ${volunteerData.age || 'Not provided'}
Address: ${volunteerData.address || 'Not provided'}
Occupation: ${volunteerData.occupation || 'Not provided'}
Skills: ${volunteerData.skills || 'Not provided'}
Availability: ${volunteerData.availability || 'Not provided'}
Preferred Program: ${volunteerData.preferredProgram || 'Any'}
Previous Experience: ${volunteerData.experience || 'None provided'}
Motivation: ${volunteerData.motivation || 'Not provided'}
Emergency Contact: ${volunteerData.emergencyContact || 'Not provided'}
        `.trim(),
        organization: 'Volunteer Application',
        inquiryType: 'volunteer',
        preferredContact: 'email'
      };
      
      const validatedData = insertContactSubmissionSchema.parse(submissionData);
      const submission = await storage.createContactSubmission(validatedData);
      res.json({ message: "Volunteer application submitted successfully", id: submission.id });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid form data", errors: error.errors });
      }
      console.error("Error creating volunteer application:", error);
      res.status(500).json({ message: "Failed to submit volunteer application" });
    }
  });

  // Protected admin routes
  app.get('/api/admin/hero', isAuthenticated, async (req, res) => {
    try {
      const content = await storage.getHeroContent();
      res.json(content);
    } catch (error) {
      console.error("Error fetching hero content:", error);
      res.status(500).json({ message: "Failed to fetch hero content" });
    }
  });

  app.put('/api/admin/hero', isAuthenticated, async (req, res) => {
    try {
      const validatedData = insertHeroContentSchema.parse(req.body);
      const updated = await storage.updateHeroContent(validatedData);
      res.json(updated);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid data", errors: error.errors });
      }
      console.error("Error updating hero content:", error);
      res.status(500).json({ message: "Failed to update hero content" });
    }
  });

  app.get('/api/admin/about', isAuthenticated, async (req, res) => {
    try {
      const content = await storage.getAboutContent();
      res.json(content);
    } catch (error) {
      console.error("Error fetching about content:", error);
      res.status(500).json({ message: "Failed to fetch about content" });
    }
  });

  app.put('/api/admin/about', isAuthenticated, async (req, res) => {
    try {
      const validatedData = insertAboutContentSchema.parse(req.body);
      const updated = await storage.updateAboutContent(validatedData);
      res.json(updated);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid data", errors: error.errors });
      }
      console.error("Error updating about content:", error);
      res.status(500).json({ message: "Failed to update about content" });
    }
  });

  app.get('/api/admin/programs', isAuthenticated, async (req, res) => {
    try {
      const programs = await storage.getPrograms();
      res.json(programs);
    } catch (error) {
      console.error("Error fetching programs:", error);
      res.status(500).json({ message: "Failed to fetch programs" });
    }
  });

  app.post('/api/admin/programs', isAuthenticated, async (req, res) => {
    try {
      const validatedData = insertProgramSchema.parse(req.body);
      const created = await storage.createProgram(validatedData);
      res.json(created);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid data", errors: error.errors });
      }
      console.error("Error creating program:", error);
      res.status(500).json({ message: "Failed to create program" });
    }
  });

  app.put('/api/admin/programs/:id', isAuthenticated, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const validatedData = insertProgramSchema.partial().parse(req.body);
      const updated = await storage.updateProgram(id, validatedData);
      res.json(updated);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid data", errors: error.errors });
      }
      console.error("Error updating program:", error);
      res.status(500).json({ message: "Failed to update program" });
    }
  });

  app.delete('/api/admin/programs/:id', isAuthenticated, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      await storage.deleteProgram(id);
      res.json({ message: "Program deleted successfully" });
    } catch (error) {
      console.error("Error deleting program:", error);
      res.status(500).json({ message: "Failed to delete program" });
    }
  });

  app.get('/api/admin/testimonials', isAuthenticated, async (req, res) => {
    try {
      const testimonials = await storage.getTestimonials();
      res.json(testimonials);
    } catch (error) {
      console.error("Error fetching testimonials:", error);
      res.status(500).json({ message: "Failed to fetch testimonials" });
    }
  });

  app.post('/api/admin/testimonials', isAuthenticated, async (req, res) => {
    try {
      const validatedData = insertTestimonialSchema.parse(req.body);
      const created = await storage.createTestimonial(validatedData);
      res.json(created);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid data", errors: error.errors });
      }
      console.error("Error creating testimonial:", error);
      res.status(500).json({ message: "Failed to create testimonial" });
    }
  });

  app.put('/api/admin/testimonials/:id', isAuthenticated, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const validatedData = insertTestimonialSchema.partial().parse(req.body);
      const updated = await storage.updateTestimonial(id, validatedData);
      res.json(updated);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid data", errors: error.errors });
      }
      console.error("Error updating testimonial:", error);
      res.status(500).json({ message: "Failed to update testimonial" });
    }
  });

  app.delete('/api/admin/testimonials/:id', isAuthenticated, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      await storage.deleteTestimonial(id);
      res.json({ message: "Testimonial deleted successfully" });
    } catch (error) {
      console.error("Error deleting testimonial:", error);
      res.status(500).json({ message: "Failed to delete testimonial" });
    }
  });

  app.get('/api/admin/contact', isAuthenticated, async (req, res) => {
    try {
      const contact = await storage.getContactInfo();
      res.json(contact);
    } catch (error) {
      console.error("Error fetching contact info:", error);
      res.status(500).json({ message: "Failed to fetch contact info" });
    }
  });

  app.put('/api/admin/contact', isAuthenticated, async (req, res) => {
    try {
      const validatedData = insertContactInfoSchema.parse(req.body);
      const updated = await storage.updateContactInfo(validatedData);
      res.json(updated);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid data", errors: error.errors });
      }
      console.error("Error updating contact info:", error);
      res.status(500).json({ message: "Failed to update contact info" });
    }
  });

  app.get('/api/admin/contact/submissions', isAuthenticated, async (req, res) => {
    try {
      const submissions = await storage.getContactSubmissions();
      res.json(submissions);
    } catch (error) {
      console.error("Error fetching contact submissions:", error);
      res.status(500).json({ message: "Failed to fetch contact submissions" });
    }
  });

  app.put('/api/admin/contact/submissions/:id/read', isAuthenticated, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      await storage.markContactSubmissionAsRead(id);
      res.json({ message: "Marked as read" });
    } catch (error) {
      console.error("Error marking submission as read:", error);
      res.status(500).json({ message: "Failed to mark as read" });
    }
  });

  app.get('/api/admin/donation-config', isAuthenticated, async (req, res) => {
    try {
      const config = await storage.getDonationConfig();
      res.json(config);
    } catch (error) {
      console.error("Error fetching donation config:", error);
      res.status(500).json({ message: "Failed to fetch donation config" });
    }
  });

  app.put('/api/admin/donation-config', isAuthenticated, async (req, res) => {
    try {
      const validatedData = insertDonationConfigSchema.parse(req.body);
      const updated = await storage.updateDonationConfig(validatedData);
      res.json(updated);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid data", errors: error.errors });
      }
      console.error("Error updating donation config:", error);
      res.status(500).json({ message: "Failed to update donation config" });
    }
  });

  // Leadership routes
  app.get('/api/leadership', async (req, res) => {
    try {
      const leadership = await storage.getActiveLeadership();
      res.json(leadership.length > 0 ? leadership : [
        {
          id: 1,
          name: "Dr. Rajesh Kumar",
          role: "Founder & Chairman",
          bio: "Dr. Kumar founded Samruddhi Service Society in 1995 with a vision to empower underprivileged children through education.",
          qualification: "Ph.D. in Social Work, 30+ years in NGO sector",
          experience: "Led numerous rural development projects across India",
          imageUrl: null
        },
        {
          id: 2,
          name: "Mrs. Priya Sharma",
          role: "Executive Director",
          bio: "Leading our educational programs with passion and dedication for over 15 years.",
          qualification: "M.Ed., B.Ed., Certified in Child Psychology",
          experience: "15+ years in educational administration and child welfare",
          imageUrl: null
        }
      ]);
    } catch (error) {
      console.error("Error fetching leadership:", error);
      res.status(500).json({ message: "Failed to fetch leadership" });
    }
  });

  app.get('/api/admin/leadership', isAuthenticated, async (req, res) => {
    try {
      const leadership = await storage.getLeadership();
      res.json(leadership);
    } catch (error) {
      console.error("Error fetching leadership:", error);
      res.status(500).json({ message: "Failed to fetch leadership" });
    }
  });

  app.post('/api/admin/leadership', isAuthenticated, async (req, res) => {
    try {
      const validatedData = insertLeadershipSchema.parse(req.body);
      const created = await storage.createLeadership(validatedData);
      res.json(created);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid data", errors: error.errors });
      }
      console.error("Error creating leadership:", error);
      res.status(500).json({ message: "Failed to create leadership" });
    }
  });

  // Annual Reports routes
  app.get('/api/annual-reports', async (req, res) => {
    try {
      const reports = await storage.getPublishedAnnualReports();
      res.json(reports.length > 0 ? reports : [
        {
          id: 1,
          title: "Annual Report 2023-24",
          year: 2024,
          description: "Comprehensive overview of our impact and achievements in 2023-24",
          fileUrl: "/api/placeholder/document/annual-report-2024.pdf",
          fileSize: "2.5 MB",
          downloadCount: 245
        },
        {
          id: 2,
          title: "Annual Report 2022-23",
          year: 2023,
          description: "Detailed report of programs and beneficiaries served in 2022-23",
          fileUrl: "/api/placeholder/document/annual-report-2023.pdf",
          fileSize: "3.1 MB",
          downloadCount: 189
        }
      ]);
    } catch (error) {
      console.error("Error fetching annual reports:", error);
      res.status(500).json({ message: "Failed to fetch annual reports" });
    }
  });

  // Photo Gallery routes
  app.get('/api/photo-gallery', async (req, res) => {
    try {
      const { category } = req.query;
      let photos;
      if (category && typeof category === 'string') {
        photos = await storage.getPhotosByCategory(category);
      } else {
        photos = await storage.getActivePhotoGallery();
      }
      
      res.json(photos.length > 0 ? photos : [
        {
          id: 1,
          title: "Girls Hostel Daily Activities",
          description: "Students engaged in their daily study routine",
          imageUrl: "/api/placeholder/400/300",
          category: "education",
          event: "Daily Life",
          date: new Date('2024-01-15')
        },
        {
          id: 2,
          title: "Annual Sports Day",
          description: "Children participating in various sports activities",
          imageUrl: "/api/placeholder/400/300",
          category: "events",
          event: "Sports Day 2024",
          date: new Date('2024-02-20')
        },
        {
          id: 3,
          title: "Skill Development Workshop",
          description: "Vocational training session for older students",
          imageUrl: "/api/placeholder/400/300",
          category: "programs",
          event: "Skill Training",
          date: new Date('2024-01-30')
        }
      ]);
    } catch (error) {
      console.error("Error fetching photo gallery:", error);
      res.status(500).json({ message: "Failed to fetch photo gallery" });
    }
  });

  // News & Blog routes
  app.get('/api/news', async (req, res) => {
    try {
      const { category } = req.query;
      let news;
      if (category && typeof category === 'string') {
        news = await storage.getNewsByCategory(category);
      } else {
        news = await storage.getPublishedNews();
      }
      
      res.json(news.length > 0 ? news : [
        {
          id: 1,
          title: "New Educational Initiative Launched",
          slug: "new-educational-initiative-launched",
          excerpt: "We are excited to announce our new digital literacy program for rural girls.",
          content: "Our organization has launched a comprehensive digital literacy program...",
          authorName: "Dr. Rajesh Kumar",
          category: "news",
          tags: ["education", "digital literacy", "rural development"],
          featuredImageUrl: "/api/placeholder/600/400",
          publishedAt: new Date('2024-01-10'),
          createdAt: new Date('2024-01-08')
        },
        {
          id: 2,
          title: "Impact Story: Priya's Journey to Success",
          slug: "impact-story-priyas-journey-to-success",
          excerpt: "Read about how our programs transformed Priya's life and opened new opportunities.",
          content: "Priya joined our girls' hostel program five years ago...",
          authorName: "Mrs. Priya Sharma",
          category: "blog",
          tags: ["success story", "impact", "education"],
          featuredImageUrl: "/api/placeholder/600/400",
          publishedAt: new Date('2024-01-05'),
          createdAt: new Date('2024-01-03')
        }
      ]);
    } catch (error) {
      console.error("Error fetching news:", error);
      res.status(500).json({ message: "Failed to fetch news" });
    }
  });

  app.get('/api/news/:slug', async (req, res) => {
    try {
      const { slug } = req.params;
      const newsItem = await storage.getNewsBySlug(slug);
      if (!newsItem) {
        return res.status(404).json({ message: "News article not found" });
      }
      res.json(newsItem);
    } catch (error) {
      console.error("Error fetching news article:", error);
      res.status(500).json({ message: "Failed to fetch news article" });
    }
  });

  // Certifications routes
  app.get('/api/certifications', async (req, res) => {
    try {
      const { category } = req.query;
      let certifications;
      if (category && typeof category === 'string') {
        certifications = await storage.getCertificationsByCategory(category);
      } else {
        certifications = await storage.getActiveCertifications();
      }
      
      res.json(certifications.length > 0 ? certifications : [
        {
          id: 1,
          title: "80G Tax Exemption Certificate",
          issuingAuthority: "Income Tax Department, Government of India",
          certificateNumber: "AAATS9999K20241",
          issueDate: new Date('2024-01-01'),
          description: "Certificate for tax exemption under Section 80G",
          category: "tax-exemption",
          certificateUrl: "/api/placeholder/document/80g-certificate.pdf"
        },
        {
          id: 2,
          title: "NGO Registration Certificate",
          issuingAuthority: "Registrar of Societies",
          certificateNumber: "REG/NGO/2024/001",
          issueDate: new Date('1995-03-15'),
          description: "Official registration certificate for the organization",
          category: "registration",
          certificateUrl: "/api/placeholder/document/registration-certificate.pdf"
        }
      ]);
    } catch (error) {
      console.error("Error fetching certifications:", error);
      res.status(500).json({ message: "Failed to fetch certifications" });
    }
  });

  // Impact Stats routes
  app.get('/api/impact-stats', async (req, res) => {
    try {
      const { category } = req.query;
      let stats;
      if (category && typeof category === 'string') {
        stats = await storage.getImpactStatsByCategory(category);
      } else {
        stats = await storage.getActiveImpactStats();
      }
      
      res.json(stats.length > 0 ? stats : [
        {
          id: 1,
          metric: "Years of Service",
          value: "29+",
          description: "Serving communities since 1995",
          icon: "calendar",
          category: "organization"
        },
        {
          id: 2,
          metric: "Children Supported",
          value: "2,500+",
          description: "Direct beneficiaries over the years",
          icon: "users",
          category: "education"
        },
        {
          id: 3,
          metric: "Villages Reached",
          value: "50+",
          description: "Rural communities impacted",
          icon: "map",
          category: "outreach"
        },
        {
          id: 4,
          metric: "Success Rate",
          value: "95%",
          description: "Students completing education",
          icon: "star",
          category: "education"
        }
      ]);
    } catch (error) {
      console.error("Error fetching impact stats:", error);
      res.status(500).json({ message: "Failed to fetch impact stats" });
    }
  });

  // Publications routes
  app.get('/api/publications', async (req, res) => {
    try {
      const { type } = req.query;
      let publications;
      if (type && typeof type === 'string') {
        publications = await storage.getPublicationsByType(type);
      } else {
        publications = await storage.getPublishedPublications();
      }
      
      res.json(publications.length > 0 ? publications : [
        {
          id: 1,
          title: "Impact Assessment Report: Girls Education in Rural Areas",
          type: "research",
          authors: ["Dr. Rajesh Kumar", "Dr. Meera Patel"],
          abstract: "A comprehensive study on the impact of residential education programs for rural girls...",
          publishedDate: new Date('2023-12-01'),
          journal: "Journal of Rural Development",
          fileUrl: "/api/placeholder/document/impact-assessment-2023.pdf",
          tags: ["education", "rural development", "girls education"]
        },
        {
          id: 2,
          title: "Best Practices in Community Engagement",
          type: "case-study",
          authors: ["Mrs. Priya Sharma"],
          abstract: "This case study documents successful strategies for engaging rural communities...",
          publishedDate: new Date('2023-11-15'),
          fileUrl: "/api/placeholder/document/best-practices-2023.pdf",
          tags: ["community engagement", "best practices", "rural"]
        }
      ]);
    } catch (error) {
      console.error("Error fetching publications:", error);
      res.status(500).json({ message: "Failed to fetch publications" });
    }
  });

  // Newsletter subscription route
  app.post('/api/newsletter/subscribe', async (req, res) => {
    try {
      const { email, name, interests, source } = req.body;
      
      if (!email) {
        return res.status(400).json({ message: "Email is required" });
      }
      
      const subscription = await storage.subscribeToNewsletter({
        email,
        name: name || null,
        interests: interests || [],
        source: source || 'website'
      });
      
      res.json({ message: "Successfully subscribed to newsletter", id: subscription.id });
    } catch (error) {
      console.error("Error subscribing to newsletter:", error);
      res.status(500).json({ message: "Failed to subscribe to newsletter" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}

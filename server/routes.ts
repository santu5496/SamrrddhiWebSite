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
            imageUrl: null,
            icon: "fas fa-home",
            isActive: true
          },
          {
            id: 2,
            title: "IDC - Integrated Education",
            description: "Integrated Education for Disabled Children (IDC) program provides specialized education and support for differently-abled children, promoting inclusive learning with state and central government support.",
            imageUrl: null,
            icon: "fas fa-graduation-cap",
            isActive: true
          },
          {
            id: 3,
            title: "Food & Shelter",
            description: "Comprehensive food and shelter program ensuring nutritious meals and safe accommodation for all children in our care. Basic needs are met so children can focus on learning and growth.",
            imageUrl: null,
            icon: "fas fa-utensils",
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
        error: error.message 
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

  const httpServer = createServer(app);
  return httpServer;
}

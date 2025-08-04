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
import {
  users,
  heroContent,
  aboutContent,
  programs,
  events,
  contactInfo,
  donationConfig,
  type HeroContent,
  type InsertHeroContent,
  type AboutContent,
  type InsertAboutContent,
  type Program,
  type InsertProgram,
  type Event,
  type InsertEvent,
  type ContactInfo,
  type InsertContactInfo,
  type DonationConfig,
  type InsertDonationConfig,
} from "@shared/schema";
import { db } from "./db";
import { eq, desc, asc } from "drizzle-orm";

export interface IStorage {
  // Hero content operations
  getHeroContent(): Promise<HeroContent | undefined>;
  updateHeroContent(content: InsertHeroContent): Promise<HeroContent>;

  // About content operations
  getAboutContent(): Promise<AboutContent | undefined>;
  updateAboutContent(content: InsertAboutContent): Promise<AboutContent>;

  // Programs operations
  getPrograms(): Promise<Program[]>;
  getActivePrograms(): Promise<Program[]>;
  createProgram(program: InsertProgram): Promise<Program>;
  updateProgram(id: number, program: Partial<InsertProgram>): Promise<Program>;
  deleteProgram(id: number): Promise<void>;

  // Events operations
  getEvents(): Promise<Event[]>;
  getActiveEvents(): Promise<Event[]>;
  getUpcomingEvents(): Promise<Event[]>;
  getPastEvents(): Promise<Event[]>;
  getEventById(id: number): Promise<Event | undefined>;
  createEvent(event: InsertEvent): Promise<Event>;
  updateEvent(id: number, event: Partial<InsertEvent>): Promise<Event>;
  deleteEvent(id: number): Promise<void>;

  // Contact operations
  getContactInfo(): Promise<ContactInfo | undefined>;
  updateContactInfo(info: InsertContactInfo): Promise<ContactInfo>;

  // Donation config operations
  getDonationConfig(): Promise<DonationConfig | undefined>;
  updateDonationConfig(config: InsertDonationConfig): Promise<DonationConfig>;
}

export class PostgreSQLStorage implements IStorage {
  // Hero content operations
  async getHeroContent(): Promise<HeroContent | undefined> {
    const result = await db.select().from(heroContent).limit(1);
    return result[0];
  }

  async updateHeroContent(content: InsertHeroContent): Promise<HeroContent> {
    const existing = await this.getHeroContent();
    if (existing) {
      const result = await db
        .update(heroContent)
        .set({ ...content, updatedAt: Date.now() })
        .where(eq(heroContent.id, existing.id))
        .returning();
      return result[0];
    } else {
      const result = await db.insert(heroContent).values(content).returning();
      return result[0];
    }
  }

  // About content operations
  async getAboutContent(): Promise<AboutContent | undefined> {
    const result = await db.select().from(aboutContent).limit(1);
    return result[0];
  }

  async updateAboutContent(content: InsertAboutContent): Promise<AboutContent> {
    const existing = await this.getAboutContent();
    if (existing) {
      const result = await db
        .update(aboutContent)
        .set({ ...content, updatedAt: Date.now() })
        .where(eq(aboutContent.id, existing.id))
        .returning();
      return result[0];
    } else {
      const result = await db.insert(aboutContent).values(content).returning();
      return result[0];
    }
  }

  // Programs operations
  async getPrograms(): Promise<Program[]> {
    return await db.select().from(programs).orderBy(asc(programs.orderIndex));
  }

  async getActivePrograms(): Promise<Program[]> {
    return await db
      .select()
      .from(programs)
      .where(eq(programs.isActive, true))
      .orderBy(asc(programs.orderIndex));
  }

  async createProgram(program: InsertProgram): Promise<Program> {
    const result = await db.insert(programs).values(program).returning();
    return result[0];
  }

  async updateProgram(id: number, program: Partial<InsertProgram>): Promise<Program> {
    const result = await db
      .update(programs)
      .set({ ...program, updatedAt: Date.now() })
      .where(eq(programs.id, id))
      .returning();
    return result[0];
  }

  async deleteProgram(id: number): Promise<void> {
    await db.delete(programs).where(eq(programs.id, id));
  }

  // Events operations
  async getEvents(): Promise<Event[]> {
    return await db.select().from(events).orderBy(desc(events.eventDate));
  }

  async getActiveEvents(): Promise<Event[]> {
    return await db
      .select()
      .from(events)
      .where(eq(events.isActive, true))
      .orderBy(desc(events.eventDate));
  }

  async getUpcomingEvents(): Promise<Event[]> {
    const now = new Date();
    return await db
      .select()
      .from(events)
      .where(eq(events.isActive, true))
      .orderBy(asc(events.eventDate));
  }

  async getPastEvents(): Promise<Event[]> {
    const now = new Date();
    return await db
      .select()
      .from(events)
      .where(eq(events.isActive, true))
      .orderBy(desc(events.eventDate));
  }

  async getEventById(id: number): Promise<Event | undefined> {
    const result = await db.select().from(events).where(eq(events.id, id)).limit(1);
    return result[0];
  }

  async createEvent(event: InsertEvent): Promise<Event> {
    const result = await db.insert(events).values(event).returning();
    return result[0];
  }

  async updateEvent(id: number, event: Partial<InsertEvent>): Promise<Event> {
    const result = await db
      .update(events)
      .set({ ...event, updatedAt: Date.now() })
      .where(eq(events.id, id))
      .returning();
    return result[0];
  }

  async deleteEvent(id: number): Promise<void> {
    await db.delete(events).where(eq(events.id, id));
  }

  // Contact operations
  async getContactInfo(): Promise<ContactInfo | undefined> {
    const result = await db.select().from(contactInfo).limit(1);
    return result[0];
  }

  async updateContactInfo(info: InsertContactInfo): Promise<ContactInfo> {
    const existing = await this.getContactInfo();
    if (existing) {
      const result = await db
        .update(contactInfo)
        .set({ ...info, updatedAt: Date.now() })
        .where(eq(contactInfo.id, existing.id))
        .returning();
      return result[0];
    } else {
      const result = await db.insert(contactInfo).values(info).returning();
      return result[0];
    }
  }

  // Donation config operations
  async getDonationConfig(): Promise<DonationConfig | undefined> {
    const result = await db.select().from(donationConfig).limit(1);
    return result[0];
  }

  async updateDonationConfig(config: InsertDonationConfig): Promise<DonationConfig> {
    const existing = await this.getDonationConfig();
    if (existing) {
      const result = await db
        .update(donationConfig)
        .set({ ...config, updatedAt: Date.now() })
        .where(eq(donationConfig.id, existing.id))
        .returning();
      return result[0];
    } else {
      const result = await db.insert(donationConfig).values(config).returning();
      return result[0];
    }
  }
}

export const storage = new PostgreSQLStorage();
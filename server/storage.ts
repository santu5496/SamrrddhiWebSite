import {
  users,
  heroContent,
  aboutContent,
  programs,
  testimonials,
  contactInfo,
  contactSubmissions,
  donationConfig,
  type User,
  type UpsertUser,
  type HeroContent,
  type InsertHeroContent,
  type AboutContent,
  type InsertAboutContent,
  type Program,
  type InsertProgram,
  type Testimonial,
  type InsertTestimonial,
  type ContactInfo,
  type InsertContactInfo,
  type ContactSubmission,
  type InsertContactSubmission,
  type DonationConfig,
  type InsertDonationConfig,
} from "@shared/schema";
import { db } from "./db";
import { eq, desc, asc } from "drizzle-orm";

export interface IStorage {
  // User operations (mandatory for Replit Auth)
  getUser(id: string): Promise<User | undefined>;
  upsertUser(user: UpsertUser): Promise<User>;

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

  // Testimonials operations
  getTestimonials(): Promise<Testimonial[]>;
  getActiveTestimonials(): Promise<Testimonial[]>;
  createTestimonial(testimonial: InsertTestimonial): Promise<Testimonial>;
  updateTestimonial(id: number, testimonial: Partial<InsertTestimonial>): Promise<Testimonial>;
  deleteTestimonial(id: number): Promise<void>;

  // Contact operations
  getContactInfo(): Promise<ContactInfo | undefined>;
  updateContactInfo(info: InsertContactInfo): Promise<ContactInfo>;
  createContactSubmission(submission: InsertContactSubmission): Promise<ContactSubmission>;
  getContactSubmissions(): Promise<ContactSubmission[]>;
  markContactSubmissionAsRead(id: number): Promise<void>;

  // Donation config operations
  getDonationConfig(): Promise<DonationConfig | undefined>;
  updateDonationConfig(config: InsertDonationConfig): Promise<DonationConfig>;
}

export class DatabaseStorage implements IStorage {
  // User operations
  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async upsertUser(userData: UpsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(userData)
      .onConflictDoUpdate({
        target: users.id,
        set: {
          ...userData,
          updatedAt: new Date(),
        },
      })
      .returning();
    return user;
  }

  // Hero content operations
  async getHeroContent(): Promise<HeroContent | undefined> {
    const [content] = await db.select().from(heroContent).limit(1);
    return content;
  }

  async updateHeroContent(content: InsertHeroContent): Promise<HeroContent> {
    const existing = await this.getHeroContent();
    
    if (existing) {
      const [updated] = await db
        .update(heroContent)
        .set({ ...content, updatedAt: new Date() })
        .where(eq(heroContent.id, existing.id))
        .returning();
      return updated;
    } else {
      const [created] = await db
        .insert(heroContent)
        .values(content)
        .returning();
      return created;
    }
  }

  // About content operations
  async getAboutContent(): Promise<AboutContent | undefined> {
    const [content] = await db.select().from(aboutContent).limit(1);
    return content;
  }

  async updateAboutContent(content: InsertAboutContent): Promise<AboutContent> {
    const existing = await this.getAboutContent();
    
    if (existing) {
      const [updated] = await db
        .update(aboutContent)
        .set({ ...content, updatedAt: new Date() })
        .where(eq(aboutContent.id, existing.id))
        .returning();
      return updated;
    } else {
      const [created] = await db
        .insert(aboutContent)
        .values(content)
        .returning();
      return created;
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
    const [created] = await db
      .insert(programs)
      .values(program)
      .returning();
    return created;
  }

  async updateProgram(id: number, program: Partial<InsertProgram>): Promise<Program> {
    const [updated] = await db
      .update(programs)
      .set({ ...program, updatedAt: new Date() })
      .where(eq(programs.id, id))
      .returning();
    return updated;
  }

  async deleteProgram(id: number): Promise<void> {
    await db.delete(programs).where(eq(programs.id, id));
  }

  // Testimonials operations
  async getTestimonials(): Promise<Testimonial[]> {
    return await db.select().from(testimonials).orderBy(asc(testimonials.orderIndex));
  }

  async getActiveTestimonials(): Promise<Testimonial[]> {
    return await db
      .select()
      .from(testimonials)
      .where(eq(testimonials.isActive, true))
      .orderBy(asc(testimonials.orderIndex));
  }

  async createTestimonial(testimonial: InsertTestimonial): Promise<Testimonial> {
    const [created] = await db
      .insert(testimonials)
      .values(testimonial)
      .returning();
    return created;
  }

  async updateTestimonial(id: number, testimonial: Partial<InsertTestimonial>): Promise<Testimonial> {
    const [updated] = await db
      .update(testimonials)
      .set({ ...testimonial, updatedAt: new Date() })
      .where(eq(testimonials.id, id))
      .returning();
    return updated;
  }

  async deleteTestimonial(id: number): Promise<void> {
    await db.delete(testimonials).where(eq(testimonials.id, id));
  }

  // Contact operations
  async getContactInfo(): Promise<ContactInfo | undefined> {
    const [info] = await db.select().from(contactInfo).limit(1);
    return info;
  }

  async updateContactInfo(info: InsertContactInfo): Promise<ContactInfo> {
    const existing = await this.getContactInfo();
    
    if (existing) {
      const [updated] = await db
        .update(contactInfo)
        .set({ ...info, updatedAt: new Date() })
        .where(eq(contactInfo.id, existing.id))
        .returning();
      return updated;
    } else {
      const [created] = await db
        .insert(contactInfo)
        .values(info)
        .returning();
      return created;
    }
  }

  async createContactSubmission(submission: InsertContactSubmission): Promise<ContactSubmission> {
    const [created] = await db
      .insert(contactSubmissions)
      .values(submission)
      .returning();
    return created;
  }

  async getContactSubmissions(): Promise<ContactSubmission[]> {
    return await db
      .select()
      .from(contactSubmissions)
      .orderBy(desc(contactSubmissions.createdAt));
  }

  async markContactSubmissionAsRead(id: number): Promise<void> {
    await db
      .update(contactSubmissions)
      .set({ isRead: true })
      .where(eq(contactSubmissions.id, id));
  }

  // Donation config operations
  async getDonationConfig(): Promise<DonationConfig | undefined> {
    const [config] = await db.select().from(donationConfig).limit(1);
    return config;
  }

  async updateDonationConfig(config: InsertDonationConfig): Promise<DonationConfig> {
    const existing = await this.getDonationConfig();
    
    if (existing) {
      const [updated] = await db
        .update(donationConfig)
        .set({ ...config, updatedAt: new Date() })
        .where(eq(donationConfig.id, existing.id))
        .returning();
      return updated;
    } else {
      const [created] = await db
        .insert(donationConfig)
        .values(config)
        .returning();
      return created;
    }
  }
}

export const storage = new DatabaseStorage();

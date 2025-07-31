import {
  users,
  heroContent,
  aboutContent,
  programs,
  testimonials,
  contactInfo,
  contactSubmissions,
  donationConfig,
  leadership,
  annualReports,
  photoGallery,
  news,
  certifications,
  impactStats,
  publications,
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
  type Leadership,
  type InsertLeadership,
  type AnnualReport,
  type InsertAnnualReport,
  type PhotoGallery,
  type InsertPhotoGallery,
  type News,
  type InsertNews,
  type Certification,
  type InsertCertification,
  type ImpactStats,
  type InsertImpactStats,
  type Publication,
  type InsertPublication,
  volunteerApplications,
  newsletterSubscriptions,
  events,
  eventRegistrations,
  type VolunteerApplication,
  type InsertVolunteerApplication,
  type NewsletterSubscription,
  type InsertNewsletterSubscription,
  type Event,
  type InsertEvent,
  type EventRegistration,
  type InsertEventRegistration,
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
  
  // Leadership operations
  getLeadership(): Promise<Leadership[]>;
  getActiveLeadership(): Promise<Leadership[]>;
  createLeadership(leader: InsertLeadership): Promise<Leadership>;
  updateLeadership(id: number, leader: Partial<InsertLeadership>): Promise<Leadership>;
  deleteLeadership(id: number): Promise<void>;

  // Annual reports operations
  getAnnualReports(): Promise<AnnualReport[]>;
  getPublishedAnnualReports(): Promise<AnnualReport[]>;
  createAnnualReport(report: InsertAnnualReport): Promise<AnnualReport>;
  updateAnnualReport(id: number, report: Partial<InsertAnnualReport>): Promise<AnnualReport>;
  deleteAnnualReport(id: number): Promise<void>;

  // Photo gallery operations
  getPhotoGallery(): Promise<PhotoGallery[]>;
  getActivePhotoGallery(): Promise<PhotoGallery[]>;
  getPhotosByCategory(category: string): Promise<PhotoGallery[]>;
  createPhoto(photo: InsertPhotoGallery): Promise<PhotoGallery>;
  updatePhoto(id: number, photo: Partial<InsertPhotoGallery>): Promise<PhotoGallery>;
  deletePhoto(id: number): Promise<void>;

  // News operations
  getNews(): Promise<News[]>;
  getPublishedNews(): Promise<News[]>;
  getNewsByCategory(category: string): Promise<News[]>;
  getNewsById(id: number): Promise<News | undefined>;
  getNewsBySlug(slug: string): Promise<News | undefined>;
  createNews(news: InsertNews): Promise<News>;
  updateNews(id: number, news: Partial<InsertNews>): Promise<News>;
  deleteNews(id: number): Promise<void>;

  // Certifications operations
  getCertifications(): Promise<Certification[]>;
  getActiveCertifications(): Promise<Certification[]>;
  getCertificationsByCategory(category: string): Promise<Certification[]>;
  createCertification(certification: InsertCertification): Promise<Certification>;
  updateCertification(id: number, certification: Partial<InsertCertification>): Promise<Certification>;
  deleteCertification(id: number): Promise<void>;

  // Impact stats operations
  getImpactStats(): Promise<ImpactStats[]>;
  getActiveImpactStats(): Promise<ImpactStats[]>;
  getImpactStatsByCategory(category: string): Promise<ImpactStats[]>;
  createImpactStat(stat: InsertImpactStats): Promise<ImpactStats>;
  updateImpactStat(id: number, stat: Partial<InsertImpactStats>): Promise<ImpactStats>;
  deleteImpactStat(id: number): Promise<void>;

  // Publications operations
  getPublications(): Promise<Publication[]>;
  getPublishedPublications(): Promise<Publication[]>;
  getPublicationsByType(type: string): Promise<Publication[]>;
  createPublication(publication: InsertPublication): Promise<Publication>;
  updatePublication(id: number, publication: Partial<InsertPublication>): Promise<Publication>;
  deletePublication(id: number): Promise<void>;
  
  // Enhanced features operations
  createVolunteerApplication(application: InsertVolunteerApplication): Promise<VolunteerApplication>;
  getVolunteerApplications(): Promise<VolunteerApplication[]>;
  subscribeToNewsletter(subscription: InsertNewsletterSubscription): Promise<NewsletterSubscription>;
  getEvents(): Promise<Event[]>;
  createEvent(event: InsertEvent): Promise<Event>;
  registerForEvent(registration: InsertEventRegistration): Promise<EventRegistration>;
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

  // Leadership operations
  async getLeadership(): Promise<Leadership[]> {
    return await db
      .select()
      .from(leadership)
      .orderBy(asc(leadership.orderIndex));
  }

  async getActiveLeadership(): Promise<Leadership[]> {
    return await db
      .select()
      .from(leadership)
      .where(eq(leadership.isActive, true))
      .orderBy(asc(leadership.orderIndex));
  }

  async createLeadership(leader: InsertLeadership): Promise<Leadership> {
    const [created] = await db
      .insert(leadership)
      .values(leader)
      .returning();
    return created;
  }

  async updateLeadership(id: number, leader: Partial<InsertLeadership>): Promise<Leadership> {
    const [updated] = await db
      .update(leadership)
      .set({ ...leader, updatedAt: new Date() })
      .where(eq(leadership.id, id))
      .returning();
    return updated;
  }

  async deleteLeadership(id: number): Promise<void> {
    await db.delete(leadership).where(eq(leadership.id, id));
  }

  // Annual reports operations
  async getAnnualReports(): Promise<AnnualReport[]> {
    return await db
      .select()
      .from(annualReports)
      .orderBy(desc(annualReports.year));
  }

  async getPublishedAnnualReports(): Promise<AnnualReport[]> {
    return await db
      .select()
      .from(annualReports)
      .where(eq(annualReports.isPublished, true))
      .orderBy(desc(annualReports.year));
  }

  async createAnnualReport(report: InsertAnnualReport): Promise<AnnualReport> {
    const [created] = await db
      .insert(annualReports)
      .values(report)
      .returning();
    return created;
  }

  async updateAnnualReport(id: number, report: Partial<InsertAnnualReport>): Promise<AnnualReport> {
    const [updated] = await db
      .update(annualReports)
      .set({ ...report, updatedAt: new Date() })
      .where(eq(annualReports.id, id))
      .returning();
    return updated;
  }

  async deleteAnnualReport(id: number): Promise<void> {
    await db.delete(annualReports).where(eq(annualReports.id, id));
  }

  // Photo gallery operations
  async getPhotoGallery(): Promise<PhotoGallery[]> {
    return await db
      .select()
      .from(photoGallery)
      .orderBy(desc(photoGallery.date));
  }

  async getActivePhotoGallery(): Promise<PhotoGallery[]> {
    return await db
      .select()
      .from(photoGallery)
      .where(eq(photoGallery.isActive, true))
      .orderBy(desc(photoGallery.date));
  }

  async getPhotosByCategory(category: string): Promise<PhotoGallery[]> {
    return await db
      .select()
      .from(photoGallery)
      .where(eq(photoGallery.category, category))
      .orderBy(desc(photoGallery.date));
  }

  async createPhoto(photo: InsertPhotoGallery): Promise<PhotoGallery> {
    const [created] = await db
      .insert(photoGallery)
      .values(photo)
      .returning();
    return created;
  }

  async updatePhoto(id: number, photo: Partial<InsertPhotoGallery>): Promise<PhotoGallery> {
    const [updated] = await db
      .update(photoGallery)
      .set(photo)
      .where(eq(photoGallery.id, id))
      .returning();
    return updated;
  }

  async deletePhoto(id: number): Promise<void> {
    await db.delete(photoGallery).where(eq(photoGallery.id, id));
  }

  // News operations
  async getNews(): Promise<News[]> {
    return await db
      .select()
      .from(news)
      .orderBy(desc(news.createdAt));
  }

  async getPublishedNews(): Promise<News[]> {
    return await db
      .select()
      .from(news)
      .where(eq(news.isPublished, true))
      .orderBy(desc(news.publishedAt));
  }

  async getNewsByCategory(category: string): Promise<News[]> {
    return await db
      .select()
      .from(news)
      .where(eq(news.category, category))
      .orderBy(desc(news.publishedAt));
  }

  async getNewsById(id: number): Promise<News | undefined> {
    const [newsItem] = await db
      .select()
      .from(news)
      .where(eq(news.id, id));
    return newsItem;
  }

  async getNewsBySlug(slug: string): Promise<News | undefined> {
    const [newsItem] = await db
      .select()
      .from(news)
      .where(eq(news.slug, slug));
    return newsItem;
  }

  async createNews(newsData: InsertNews): Promise<News> {
    const slug = newsData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    const [created] = await db
      .insert(news)
      .values({ ...newsData, slug })
      .returning();
    return created;
  }

  async updateNews(id: number, newsData: Partial<InsertNews>): Promise<News> {
    const updateData = { ...newsData, updatedAt: new Date() };
    if (newsData.title) {
      updateData.slug = newsData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    }
    const [updated] = await db
      .update(news)
      .set(updateData)
      .where(eq(news.id, id))
      .returning();
    return updated;
  }

  async deleteNews(id: number): Promise<void> {
    await db.delete(news).where(eq(news.id, id));
  }

  // Certifications operations
  async getCertifications(): Promise<Certification[]> {
    return await db
      .select()
      .from(certifications)
      .orderBy(desc(certifications.issueDate));
  }

  async getActiveCertifications(): Promise<Certification[]> {
    return await db
      .select()
      .from(certifications)
      .where(eq(certifications.isActive, true))
      .orderBy(desc(certifications.issueDate));
  }

  async getCertificationsByCategory(category: string): Promise<Certification[]> {
    return await db
      .select()
      .from(certifications)
      .where(eq(certifications.category, category))
      .orderBy(desc(certifications.issueDate));
  }

  async createCertification(certification: InsertCertification): Promise<Certification> {
    const [created] = await db
      .insert(certifications)
      .values(certification)
      .returning();
    return created;
  }

  async updateCertification(id: number, certification: Partial<InsertCertification>): Promise<Certification> {
    const [updated] = await db
      .update(certifications)
      .set(certification)
      .where(eq(certifications.id, id))
      .returning();
    return updated;
  }

  async deleteCertification(id: number): Promise<void> {
    await db.delete(certifications).where(eq(certifications.id, id));
  }

  // Impact stats operations
  async getImpactStats(): Promise<ImpactStats[]> {
    return await db
      .select()
      .from(impactStats)
      .orderBy(asc(impactStats.orderIndex));
  }

  async getActiveImpactStats(): Promise<ImpactStats[]> {
    return await db
      .select()
      .from(impactStats)
      .where(eq(impactStats.isActive, true))
      .orderBy(asc(impactStats.orderIndex));
  }

  async getImpactStatsByCategory(category: string): Promise<ImpactStats[]> {
    return await db
      .select()
      .from(impactStats)
      .where(eq(impactStats.category, category))
      .orderBy(asc(impactStats.orderIndex));
  }

  async createImpactStat(stat: InsertImpactStats): Promise<ImpactStats> {
    const [created] = await db
      .insert(impactStats)
      .values(stat)
      .returning();
    return created;
  }

  async updateImpactStat(id: number, stat: Partial<InsertImpactStats>): Promise<ImpactStats> {
    const [updated] = await db
      .update(impactStats)
      .set({ ...stat, updatedAt: new Date() })
      .where(eq(impactStats.id, id))
      .returning();
    return updated;
  }

  async deleteImpactStat(id: number): Promise<void> {
    await db.delete(impactStats).where(eq(impactStats.id, id));
  }

  // Publications operations
  async getPublications(): Promise<Publication[]> {
    return await db
      .select()
      .from(publications)
      .orderBy(desc(publications.publishedDate));
  }

  async getPublishedPublications(): Promise<Publication[]> {
    return await db
      .select()
      .from(publications)
      .where(eq(publications.isPublished, true))
      .orderBy(desc(publications.publishedDate));
  }

  async getPublicationsByType(type: string): Promise<Publication[]> {
    return await db
      .select()
      .from(publications)
      .where(eq(publications.type, type))
      .orderBy(desc(publications.publishedDate));
  }

  async createPublication(publication: InsertPublication): Promise<Publication> {
    const [created] = await db
      .insert(publications)
      .values(publication)
      .returning();
    return created;
  }

  async updatePublication(id: number, publication: Partial<InsertPublication>): Promise<Publication> {
    const [updated] = await db
      .update(publications)
      .set(publication)
      .where(eq(publications.id, id))
      .returning();
    return updated;
  }

  async deletePublication(id: number): Promise<void> {
    await db.delete(publications).where(eq(publications.id, id));
  }

  // Enhanced features operations
  async createVolunteerApplication(application: InsertVolunteerApplication): Promise<VolunteerApplication> {
    const [created] = await db
      .insert(volunteerApplications)
      .values(application)
      .returning();
    return created;
  }

  async getVolunteerApplications(): Promise<VolunteerApplication[]> {
    return await db
      .select()
      .from(volunteerApplications)
      .orderBy(desc(volunteerApplications.createdAt));
  }

  async subscribeToNewsletter(subscription: InsertNewsletterSubscription): Promise<NewsletterSubscription> {
    const [created] = await db
      .insert(newsletterSubscriptions)
      .values(subscription)
      .onConflictDoUpdate({
        target: newsletterSubscriptions.email,
        set: {
          subscribed: true,
          ...subscription
        }
      })
      .returning();
    return created;
  }

  async getEvents(): Promise<Event[]> {
    return await db
      .select()
      .from(events)
      .where(eq(events.isActive, true))
      .orderBy(asc(events.eventDate));
  }

  async createEvent(event: InsertEvent): Promise<Event> {
    const [created] = await db
      .insert(events)
      .values(event)
      .returning();
    return created;
  }

  async registerForEvent(registration: InsertEventRegistration): Promise<EventRegistration> {
    const [created] = await db
      .insert(eventRegistrations)
      .values(registration)
      .returning();
    return created;
  }
}

export const storage = new DatabaseStorage();

import {
  pgTable,
  text,
  varchar,
  timestamp,
  jsonb,
  index,
  serial,
  boolean,
  integer,
  decimal,
} from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Session storage table for Replit Auth
export const sessions = pgTable(
  "sessions",
  {
    sid: varchar("sid").primaryKey(),
    sess: jsonb("sess").notNull(),
    expire: timestamp("expire").notNull(),
  },
  (table) => [index("IDX_session_expire").on(table.expire)],
);

// User storage table for Replit Auth
export const users = pgTable("users", {
  id: varchar("id").primaryKey().notNull(),
  email: varchar("email").unique(),
  firstName: varchar("first_name"),
  lastName: varchar("last_name"),
  profileImageUrl: varchar("profile_image_url"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Hero section content
export const heroContent = pgTable("hero_content", {
  id: serial("id").primaryKey(),
  headline: text("headline").notNull(),
  subheading: text("subheading").notNull(),
  backgroundImageUrl: text("background_image_url"),
  yearsOfService: text("years_of_service").default("29"),
  childrenSupported: text("children_supported").default("50+"),
  corePrograms: text("core_programs").default("3"),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// About section content
export const aboutContent = pgTable("about_content", {
  id: serial("id").primaryKey(),
  missionTitle: text("mission_title").notNull(),
  missionDescription: text("mission_description").notNull(),
  journeyTitle: text("journey_title").notNull(),
  journeyDescription: text("journey_description").notNull(),
  imageUrl: text("image_url"),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Programs
export const programs = pgTable("programs", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  imageUrl: text("image_url"),
  icon: text("icon").notNull(),
  orderIndex: serial("order_index"),
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Testimonials
export const testimonials = pgTable("testimonials", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  role: text("role").notNull(),
  quote: text("quote").notNull(),
  imageUrl: text("image_url"),
  isActive: boolean("is_active").default(true),
  orderIndex: serial("order_index"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Contact information
export const contactInfo = pgTable("contact_info", {
  id: serial("id").primaryKey(),
  address: text("address").notNull(),
  phone: text("phone").notNull(),
  email: text("email").notNull(),
  facebook: text("facebook"),
  twitter: text("twitter"),
  instagram: text("instagram"),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Contact form submissions
export const contactSubmissions = pgTable("contact_submissions", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: varchar("phone", { length: 20 }),
  subject: text("subject").notNull(),
  message: text("message").notNull(),
  organization: varchar("organization", { length: 255 }),
  inquiryType: varchar("inquiry_type", { length: 100 }),
  preferredContact: varchar("preferred_contact", { length: 50 }),
  isRead: boolean("is_read").default(false),
  status: varchar("status", { length: 50 }).default("pending"),
  createdAt: timestamp("created_at").defaultNow(),
});

// Volunteer applications
export const volunteerApplications = pgTable("volunteer_applications", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull(),
  phone: varchar("phone", { length: 20 }).notNull(),
  age: integer("age"),
  address: text("address"),
  occupation: varchar("occupation", { length: 255 }),
  skills: text("skills"),
  availability: varchar("availability", { length: 255 }),
  experience: text("experience"),
  motivation: text("motivation"),
  preferredProgram: varchar("preferred_program", { length: 255 }),
  emergencyContact: varchar("emergency_contact", { length: 255 }),
  backgroundCheck: boolean("background_check").default(false),
  status: varchar("status", { length: 50 }).default("pending"),
  createdAt: timestamp("created_at").defaultNow(),
});

// Newsletter subscriptions
export const newsletterSubscriptions = pgTable("newsletter_subscriptions", {
  id: serial("id").primaryKey(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  name: varchar("name", { length: 255 }),
  interests: text("interests").array(),
  subscribed: boolean("subscribed").default(true),
  source: varchar("source", { length: 100 }),
  createdAt: timestamp("created_at").defaultNow(),
});

// Events
export const events = pgTable("events", {
  id: serial("id").primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description"),
  eventDate: timestamp("event_date").notNull(),
  location: varchar("location", { length: 255 }),
  eventType: varchar("event_type", { length: 100 }),
  maxParticipants: integer("max_participants"),
  registrationDeadline: timestamp("registration_deadline"),
  isActive: boolean("is_active").default(true),
  imageUrl: varchar("image_url", { length: 500 }),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Event registrations
export const eventRegistrations = pgTable("event_registrations", {
  id: serial("id").primaryKey(),
  eventId: integer("event_id").references(() => events.id),
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull(),
  phone: varchar("phone", { length: 20 }),
  specialRequirements: text("special_requirements"),
  status: varchar("status", { length: 50 }).default("registered"),
  createdAt: timestamp("created_at").defaultNow(),
});

// Donation records
export const donations = pgTable("donations", {
  id: serial("id").primaryKey(),
  donorName: varchar("donor_name", { length: 255 }).notNull(),
  donorEmail: varchar("donor_email", { length: 255 }).notNull(),
  donorPhone: varchar("donor_phone", { length: 20 }),
  amount: decimal("amount", { precision: 10, scale: 2 }).notNull(),
  currency: varchar("currency", { length: 10 }).default("INR"),
  donationType: varchar("donation_type", { length: 50 }).notNull(), // monthly, one-time
  program: varchar("program", { length: 255 }), // which program to support
  paymentMethod: varchar("payment_method", { length: 50 }),
  transactionId: varchar("transaction_id", { length: 255 }).unique(),
  status: varchar("status", { length: 50 }).default("pending"),
  message: text("message"),
  isAnonymous: boolean("is_anonymous").default(false),
  taxReceiptSent: boolean("tax_receipt_sent").default(false),
  createdAt: timestamp("created_at").defaultNow(),
});

// Donation configuration
export const donationConfig = pgTable("donation_config", {
  id: serial("id").primaryKey(),
  monthlyAmount: text("monthly_amount").default("₹1,500"),
  description: text("description").notNull(),
  taxBenefits: text("tax_benefits").default("80G Tax Benefits"),
  razorpayKeyId: text("razorpay_key_id"),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Create insert schemas
export const insertHeroContentSchema = createInsertSchema(heroContent).omit({
  id: true,
  updatedAt: true,
});

export const insertAboutContentSchema = createInsertSchema(aboutContent).omit({
  id: true,
  updatedAt: true,
});

export const insertProgramSchema = createInsertSchema(programs).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  orderIndex: true,
});

export const insertTestimonialSchema = createInsertSchema(testimonials).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  orderIndex: true,
});

export const insertContactInfoSchema = createInsertSchema(contactInfo).omit({
  id: true,
  updatedAt: true,
});

export const insertContactSubmissionSchema = createInsertSchema(contactSubmissions).omit({
  id: true,
  isRead: true,
  status: true,
  createdAt: true,
});

export const insertVolunteerApplicationSchema = createInsertSchema(volunteerApplications).omit({
  id: true,
  status: true,
  backgroundCheck: true,
  createdAt: true,
});

export const insertNewsletterSubscriptionSchema = createInsertSchema(newsletterSubscriptions).omit({
  id: true,
  subscribed: true,
  createdAt: true,
});

export const insertEventSchema = createInsertSchema(events).omit({
  id: true,
  isActive: true,
  createdAt: true,
  updatedAt: true,
});

export const insertEventRegistrationSchema = createInsertSchema(eventRegistrations).omit({
  id: true,
  status: true,
  createdAt: true,
});

export const insertDonationSchema = createInsertSchema(donations).omit({
  id: true,
  status: true,
  isAnonymous: true,
  taxReceiptSent: true,
  createdAt: true,
});

export const insertDonationConfigSchema = createInsertSchema(donationConfig).omit({
  id: true,
  updatedAt: true,
});

// Export types
export type UpsertUser = typeof users.$inferInsert;
export type User = typeof users.$inferSelect;
export type HeroContent = typeof heroContent.$inferSelect;
export type InsertHeroContent = z.infer<typeof insertHeroContentSchema>;
export type AboutContent = typeof aboutContent.$inferSelect;
export type InsertAboutContent = z.infer<typeof insertAboutContentSchema>;
export type Program = typeof programs.$inferSelect;
export type InsertProgram = z.infer<typeof insertProgramSchema>;
export type Testimonial = typeof testimonials.$inferSelect;
export type InsertTestimonial = z.infer<typeof insertTestimonialSchema>;
export type ContactInfo = typeof contactInfo.$inferSelect;
export type InsertContactInfo = z.infer<typeof insertContactInfoSchema>;
export type ContactSubmission = typeof contactSubmissions.$inferSelect;
export type InsertContactSubmission = z.infer<typeof insertContactSubmissionSchema>;
export type VolunteerApplication = typeof volunteerApplications.$inferSelect;
export type InsertVolunteerApplication = z.infer<typeof insertVolunteerApplicationSchema>;
export type NewsletterSubscription = typeof newsletterSubscriptions.$inferSelect;
export type InsertNewsletterSubscription = z.infer<typeof insertNewsletterSubscriptionSchema>;
export type Event = typeof events.$inferSelect;
export type InsertEvent = z.infer<typeof insertEventSchema>;
export type EventRegistration = typeof eventRegistrations.$inferSelect;
export type InsertEventRegistration = z.infer<typeof insertEventRegistrationSchema>;
export type Donation = typeof donations.$inferSelect;
export type InsertDonation = z.infer<typeof insertDonationSchema>;
export type DonationConfig = typeof donationConfig.$inferSelect;
export type InsertDonationConfig = z.infer<typeof insertDonationConfigSchema>;

// Leadership team
export const leadership = pgTable("leadership", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  role: varchar("role", { length: 255 }).notNull(),
  bio: text("bio"),
  imageUrl: varchar("image_url", { length: 500 }),
  qualification: text("qualification"),
  experience: text("experience"),
  email: varchar("email", { length: 255 }),
  linkedIn: varchar("linkedin", { length: 255 }),
  orderIndex: integer("order_index").default(0),
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Annual reports
export const annualReports = pgTable("annual_reports", {
  id: serial("id").primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  year: integer("year").notNull(),
  description: text("description"),
  fileUrl: varchar("file_url", { length: 500 }).notNull(),
  fileSize: varchar("file_size", { length: 50 }),
  downloadCount: integer("download_count").default(0),
  isPublished: boolean("is_published").default(true),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Photo gallery
export const photoGallery = pgTable("photo_gallery", {
  id: serial("id").primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description"),
  imageUrl: varchar("image_url", { length: 500 }).notNull(),
  category: varchar("category", { length: 100 }), // education, events, programs, etc.
  event: varchar("event", { length: 255 }),
  date: timestamp("date").defaultNow(),
  photographer: varchar("photographer", { length: 255 }),
  isActive: boolean("is_active").default(true),
  orderIndex: integer("order_index").default(0),
  createdAt: timestamp("created_at").defaultNow(),
});

// News and blog posts
export const news = pgTable("news", {
  id: serial("id").primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  slug: varchar("slug", { length: 255 }).notNull().unique(),
  excerpt: text("excerpt"),
  content: text("content").notNull(),
  authorName: varchar("author_name", { length: 255 }),
  category: varchar("category", { length: 100 }), // news, blog, press-release
  tags: text("tags").array(),
  featuredImageUrl: varchar("featured_image_url", { length: 500 }),
  isPublished: boolean("is_published").default(false),
  publishedAt: timestamp("published_at"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Certifications and registrations
export const certifications = pgTable("certifications", {
  id: serial("id").primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  issuingAuthority: varchar("issuing_authority", { length: 255 }).notNull(),
  certificateNumber: varchar("certificate_number", { length: 255 }),
  issueDate: timestamp("issue_date"),
  expiryDate: timestamp("expiry_date"),
  description: text("description"),
  certificateUrl: varchar("certificate_url", { length: 500 }),
  category: varchar("category", { length: 100 }), // registration, tax-exemption, iso, etc.
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow(),
});

// Success metrics and impact stats
export const impactStats = pgTable("impact_stats", {
  id: serial("id").primaryKey(),
  metric: varchar("metric", { length: 255 }).notNull(),
  value: varchar("value", { length: 100 }).notNull(),
  description: text("description"),
  icon: varchar("icon", { length: 100 }),
  category: varchar("category", { length: 100 }), // education, health, community, etc.
  orderIndex: integer("order_index").default(0),
  isActive: boolean("is_active").default(true),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Research papers and publications
export const publications = pgTable("publications", {
  id: serial("id").primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  type: varchar("type", { length: 100 }).notNull(), // research, report, case-study, etc.
  authors: text("authors").array(),
  abstract: text("abstract"),
  publishedDate: timestamp("published_date"),
  journal: varchar("journal", { length: 255 }),
  fileUrl: varchar("file_url", { length: 500 }),
  tags: text("tags").array(),
  isPublished: boolean("is_published").default(true),
  downloadCount: integer("download_count").default(0),
  createdAt: timestamp("created_at").defaultNow(),
});

// Create insert schemas for new tables
export const insertLeadershipSchema = createInsertSchema(leadership).omit({
  id: true,
  orderIndex: true,
  isActive: true,
  createdAt: true,
  updatedAt: true,
});

export const insertAnnualReportSchema = createInsertSchema(annualReports).omit({
  id: true,
  downloadCount: true,
  isPublished: true,
  createdAt: true,
  updatedAt: true,
});

export const insertPhotoGallerySchema = createInsertSchema(photoGallery).omit({
  id: true,
  isActive: true,
  orderIndex: true,
  createdAt: true,
});

export const insertNewsSchema = createInsertSchema(news).omit({
  id: true,
  slug: true,
  isPublished: true,
  publishedAt: true,
  createdAt: true,
  updatedAt: true,
});

export const insertCertificationSchema = createInsertSchema(certifications).omit({
  id: true,
  isActive: true,
  createdAt: true,
});

export const insertImpactStatsSchema = createInsertSchema(impactStats).omit({
  id: true,
  orderIndex: true,
  isActive: true,
  updatedAt: true,
});

export const insertPublicationSchema = createInsertSchema(publications).omit({
  id: true,
  isPublished: true,
  downloadCount: true,
  createdAt: true,
});

// Export new types
export type Leadership = typeof leadership.$inferSelect;
export type InsertLeadership = z.infer<typeof insertLeadershipSchema>;
export type AnnualReport = typeof annualReports.$inferSelect;
export type InsertAnnualReport = z.infer<typeof insertAnnualReportSchema>;
export type PhotoGallery = typeof photoGallery.$inferSelect;
export type InsertPhotoGallery = z.infer<typeof insertPhotoGallerySchema>;
export type News = typeof news.$inferSelect;
export type InsertNews = z.infer<typeof insertNewsSchema>;
export type Certification = typeof certifications.$inferSelect;
export type InsertCertification = z.infer<typeof insertCertificationSchema>;
export type ImpactStats = typeof impactStats.$inferSelect;
export type InsertImpactStats = z.infer<typeof insertImpactStatsSchema>;
export type Publication = typeof publications.$inferSelect;
export type InsertPublication = z.infer<typeof insertPublicationSchema>;

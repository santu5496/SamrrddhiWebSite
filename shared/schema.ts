import {
  sqliteTable,
  text,
  integer,
  blob,
  index,
  real,
} from "drizzle-orm/sqlite-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Session storage table for Replit Auth
export const sessions = sqliteTable(
  "sessions",
  {
    sid: text("sid").primaryKey(),
    sess: text("sess").notNull(),
    expire: integer("expire").notNull(),
  },
  (table) => ({
    expireIdx: index("IDX_session_expire").on(table.expire),
  }),
);

// User storage table for Replit Auth
export const users = sqliteTable("users", {
  id: text("id").primaryKey().notNull(),
  email: text("email").unique(),
  firstName: text("first_name"),
  lastName: text("last_name"),
  profileImageUrl: text("profile_image_url"),
  createdAt: integer("created_at").$defaultFn(() => Date.now()),
  updatedAt: integer("updated_at").$defaultFn(() => Date.now()),
});

// Hero section content
export const heroContent = sqliteTable("hero_content", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  headline: text("headline").notNull(),
  subheading: text("subheading").notNull(),
  backgroundImageUrl: text("background_image_url"),
  yearsOfService: text("years_of_service").default("29"),
  childrenSupported: text("children_supported").default("50+"),
  corePrograms: text("core_programs").default("8"),
  updatedAt: integer("updated_at").$defaultFn(() => Date.now()),
});

// About section content
export const aboutContent = sqliteTable("about_content", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  missionTitle: text("mission_title").notNull(),
  missionDescription: text("mission_description").notNull(),
  journeyTitle: text("journey_title").notNull(),
  journeyDescription: text("journey_description").notNull(),
  imageUrl: text("image_url"),
  updatedAt: integer("updated_at").$defaultFn(() => Date.now()),
});

// Programs - Enhanced with Vidyaranya-style categories
export const programs = sqliteTable("programs", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  title: text("title").notNull(),
  description: text("description").notNull(),
  detailedDescription: text("detailed_description"),
  imageUrl: text("image_url"),
  icon: text("icon").notNull(),
  category: text("category").notNull(), // education-childcare, women-empowerment, senior-care, skill-development, health, community-development, environment
  objectives: text("objectives"),
  targetGroup: text("target_group"),
  howWeWork: text("how_we_work"),
  components: text("components"),
  futureInitiatives: text("future_initiatives"),
  orderIndex: integer("order_index").default(0),
  isActive: integer("is_active", { mode: "boolean" }).default(true),
  createdAt: integer("created_at").$defaultFn(() => Date.now()),
  updatedAt: integer("updated_at").$defaultFn(() => Date.now()),
});

// Testimonials
export const testimonials = sqliteTable("testimonials", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  role: text("role").notNull(),
  quote: text("quote").notNull(),
  imageUrl: text("image_url"),
  isActive: integer("is_active", { mode: "boolean" }).default(true),
  orderIndex: integer("order_index").default(0),
  createdAt: integer("created_at").$defaultFn(() => Date.now()),
  updatedAt: integer("updated_at").$defaultFn(() => Date.now()),
});

// Contact information
export const contactInfo = sqliteTable("contact_info", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  address: text("address").notNull(),
  phone: text("phone").notNull(),
  email: text("email").notNull(),
  facebook: text("facebook"),
  twitter: text("twitter"),
  instagram: text("instagram"),
  updatedAt: integer("updated_at").$defaultFn(() => Date.now()),
});

// Contact form submissions
export const contactSubmissions = sqliteTable("contact_submissions", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone"),
  subject: text("subject").notNull(),
  message: text("message").notNull(),
  organization: text("organization"),
  inquiryType: text("inquiry_type"),
  preferredContact: text("preferred_contact"),
  isRead: integer("is_read", { mode: "boolean" }).default(false),
  status: text("status").default("pending"),
  createdAt: integer("created_at").$defaultFn(() => Date.now()),
});

// Volunteer applications
export const volunteerApplications = sqliteTable("volunteer_applications", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  age: integer("age"),
  address: text("address"),
  occupation: text("occupation"),
  skills: text("skills"),
  availability: text("availability"),
  experience: text("experience"),
  motivation: text("motivation"),
  preferredProgram: text("preferred_program"),
  emergencyContact: text("emergency_contact"),
  backgroundCheck: integer("background_check", { mode: "boolean" }).default(false),
  status: text("status").default("pending"),
  createdAt: integer("created_at").$defaultFn(() => Date.now()),
});

// Newsletter subscriptions
export const newsletterSubscriptions = sqliteTable("newsletter_subscriptions", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  email: text("email").notNull().unique(),
  name: text("name"),
  interests: text("interests"),
  subscribed: integer("subscribed", { mode: "boolean" }).default(true),
  source: text("source"),
  createdAt: integer("created_at").$defaultFn(() => Date.now()),
});

// Events
export const events = sqliteTable("events", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  title: text("title").notNull(),
  description: text("description"),
  eventDate: integer("event_date").notNull(),
  location: text("location"),
  eventType: text("event_type"),
  maxParticipants: integer("max_participants"),
  registrationDeadline: integer("registration_deadline"),
  isActive: integer("is_active", { mode: "boolean" }).default(true),
  imageUrl: text("image_url"),
  createdAt: integer("created_at").$defaultFn(() => Date.now()),
  updatedAt: integer("updated_at").$defaultFn(() => Date.now()),
});

// Event registrations
export const eventRegistrations = sqliteTable("event_registrations", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  eventId: integer("event_id").references(() => events.id),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone"),
  specialRequirements: text("special_requirements"),
  status: text("status").default("registered"),
  createdAt: integer("created_at").$defaultFn(() => Date.now()),
});

// Donation records
export const donations = sqliteTable("donations", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  donorName: text("donor_name").notNull(),
  donorEmail: text("donor_email").notNull(),
  donorPhone: text("donor_phone"),
  amount: real("amount").notNull(),
  currency: text("currency").default("INR"),
  donationType: text("donation_type").notNull(), // monthly, one-time
  program: text("program"), // which program to support
  paymentMethod: text("payment_method"),
  transactionId: text("transaction_id").unique(),
  status: text("status").default("pending"),
  message: text("message"),
  isAnonymous: integer("is_anonymous", { mode: "boolean" }).default(false),
  taxReceiptSent: integer("tax_receipt_sent", { mode: "boolean" }).default(false),
  createdAt: integer("created_at").$defaultFn(() => Date.now()),
});

// Donation configuration
export const donationConfig = sqliteTable("donation_config", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  monthlyAmount: text("monthly_amount").default("₹1,500"),
  description: text("description").notNull(),
  taxBenefits: text("tax_benefits").default("80G Tax Benefits"),
  razorpayKeyId: text("razorpay_key_id"),
  updatedAt: integer("updated_at").$defaultFn(() => Date.now()),
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
export const leadership = sqliteTable("leadership", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  role: text("role").notNull(),
  bio: text("bio"),
  imageUrl: text("image_url"),
  qualification: text("qualification"),
  experience: text("experience"),
  email: text("email"),
  linkedIn: text("linkedin"),
  orderIndex: integer("order_index").default(0),
  isActive: integer("is_active", { mode: "boolean" }).default(true),
  createdAt: integer("created_at").$defaultFn(() => Date.now()),
  updatedAt: integer("updated_at").$defaultFn(() => Date.now()),
});

// Annual reports
export const annualReports = sqliteTable("annual_reports", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  title: text("title").notNull(),
  year: integer("year").notNull(),
  description: text("description"),
  fileUrl: text("file_url").notNull(),
  fileSize: text("file_size"),
  downloadCount: integer("download_count").default(0),
  isPublished: integer("is_published", { mode: "boolean" }).default(true),
  createdAt: integer("created_at").$defaultFn(() => Date.now()),
  updatedAt: integer("updated_at").$defaultFn(() => Date.now()),
});

// Photo gallery
export const photoGallery = sqliteTable("photo_gallery", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  title: text("title").notNull(),
  description: text("description"),
  imageUrl: text("image_url").notNull(),
  category: text("category"), // education, events, programs, etc.
  event: text("event"),
  date: integer("date").$defaultFn(() => Date.now()),
  photographer: text("photographer"),
  isActive: integer("is_active", { mode: "boolean" }).default(true),
  orderIndex: integer("order_index").default(0),
  createdAt: integer("created_at").$defaultFn(() => Date.now()),
});

// News and blog posts
export const news = sqliteTable("news", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  title: text("title").notNull(),
  slug: text("slug").notNull().unique(),
  excerpt: text("excerpt"),
  content: text("content").notNull(),
  authorName: text("author_name"),
  category: text("category"), // news, blog, press-release
  tags: text("tags"),
  featuredImageUrl: text("featured_image_url"),
  isPublished: integer("is_published", { mode: "boolean" }).default(false),
  publishedAt: integer("published_at"),
  createdAt: integer("created_at").$defaultFn(() => Date.now()),
  updatedAt: integer("updated_at").$defaultFn(() => Date.now()),
});

// Certifications and registrations
export const certifications = sqliteTable("certifications", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  title: text("title").notNull(),
  issuingAuthority: text("issuing_authority").notNull(),
  certificateNumber: text("certificate_number"),
  issueDate: integer("issue_date"),
  expiryDate: integer("expiry_date"),
  description: text("description"),
  certificateUrl: text("certificate_url"),
  category: text("category"), // registration, tax-exemption, iso, etc.
  isActive: integer("is_active", { mode: "boolean" }).default(true),
  createdAt: integer("created_at").$defaultFn(() => Date.now()),
});

// Success metrics and impact stats
export const impactStats = sqliteTable("impact_stats", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  metric: text("metric").notNull(),
  value: text("value").notNull(),
  description: text("description"),
  icon: text("icon"),
  category: text("category"), // education, health, community, etc.
  orderIndex: integer("order_index").default(0),
  isActive: integer("is_active", { mode: "boolean" }).default(true),
  updatedAt: integer("updated_at").$defaultFn(() => Date.now()),
});

// Research papers and publications
export const publications = sqliteTable("publications", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  title: text("title").notNull(),
  type: text("type").notNull(), // research, report, case-study, etc.
  authors: text("authors"),
  abstract: text("abstract"),
  publishedDate: integer("published_date"),
  journal: text("journal"),
  fileUrl: text("file_url"),
  tags: text("tags"),
  isPublished: integer("is_published", { mode: "boolean" }).default(true),
  downloadCount: integer("download_count").default(0),
  createdAt: integer("created_at").$defaultFn(() => Date.now()),
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

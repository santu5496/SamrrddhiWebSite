import {
  pgTable,
  text,
  varchar,
  timestamp,
  jsonb,
  index,
  serial,
  boolean,
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
  subject: text("subject").notNull(),
  message: text("message").notNull(),
  isRead: boolean("is_read").default(false),
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
export type DonationConfig = typeof donationConfig.$inferSelect;
export type InsertDonationConfig = z.infer<typeof insertDonationConfigSchema>;

import {
  sqliteTable,
  text,
  integer,
  real,
  index,
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

// Programs
export const programs = sqliteTable("programs", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  title: text("title").notNull(),
  description: text("description").notNull(),
  detailedDescription: text("detailed_description"),
  imageUrl: text("image_url"),
  icon: text("icon").notNull(),
  category: text("category").notNull(),
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

// Events - Enhanced for better functionality
export const events = sqliteTable("events", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  title: text("title").notNull(),
  description: text("description"),
  eventDate: integer("event_date").notNull(),
  startTime: text("start_time"),
  endTime: text("end_time"),
  location: text("location"),
  eventType: text("event_type").notNull(),
  maxParticipants: integer("max_participants"),
  currentParticipants: integer("current_participants").default(0),
  registrationDeadline: integer("registration_deadline"),
  isRegistrationOpen: integer("is_registration_open", { mode: "boolean" }).default(true),
  organizer: text("organizer"),
  isActive: integer("is_active", { mode: "boolean" }).default(true),
  imageUrl: text("image_url"),
  createdAt: integer("created_at").$defaultFn(() => Date.now()),
  updatedAt: integer("updated_at").$defaultFn(() => Date.now()),
});

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
  linkedIn: text("linked_in"),
  orderIndex: integer("order_index").default(0),
  isActive: integer("is_active", { mode: "boolean" }).default(true),
  createdAt: integer("created_at").$defaultFn(() => Date.now()),
  updatedAt: integer("updated_at").$defaultFn(() => Date.now()),
});

// Contact Information
export const contactInfo = sqliteTable("contact_info", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  address: text("address").notNull(),
  phone: text("phone").notNull(),
  email: text("email").notNull(),
  website: text("website"),
  socialMedia: text("social_media"),
  updatedAt: integer("updated_at").$defaultFn(() => Date.now()),
});

// Donation Configuration
export const donationConfig = sqliteTable("donation_config", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  monthlyAmount: text("monthly_amount").notNull(),
  description: text("description").notNull(),
  bankDetails: text("bank_details"),
  paymentMethods: text("payment_methods"),
  taxBenefits: text("tax_benefits"),
  updatedAt: integer("updated_at").$defaultFn(() => Date.now()),
});

// News & Updates
export const news = sqliteTable("news", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  title: text("title").notNull(),
  content: text("content").notNull(),
  excerpt: text("excerpt").notNull(),
  imageUrl: text("image_url"),
  programId: integer("program_id").references(() => programs.id),
  category: text("category").notNull(),
  tags: text("tags"), // JSON string
  publishedDate: integer("published_date").$defaultFn(() => Date.now()),
  isPublished: integer("is_published", { mode: "boolean" }).default(true),
  isActive: integer("is_active", { mode: "boolean" }).default(true),
  createdAt: integer("created_at").$defaultFn(() => Date.now()),
  updatedAt: integer("updated_at").$defaultFn(() => Date.now()),
});

// Schema exports for validation
export const insertHeroContentSchema = createInsertSchema(heroContent);
export const insertAboutContentSchema = createInsertSchema(aboutContent);
export const insertProgramSchema = createInsertSchema(programs);
export const insertEventSchema = createInsertSchema(events);
export const insertLeadershipSchema = createInsertSchema(leadership);
export const insertContactInfoSchema = createInsertSchema(contactInfo);
export const insertDonationConfigSchema = createInsertSchema(donationConfig);
export const insertNewsSchema = createInsertSchema(news);

// Type exports
export type InsertHeroContent = z.infer<typeof insertHeroContentSchema>;
export type InsertAboutContent = z.infer<typeof insertAboutContentSchema>;
export type InsertProgram = z.infer<typeof insertProgramSchema>;
export type InsertEvent = z.infer<typeof insertEventSchema>;
export type InsertLeadership = z.infer<typeof insertLeadershipSchema>;
export type InsertContactInfo = z.infer<typeof insertContactInfoSchema>;
export type InsertDonationConfig = z.infer<typeof insertDonationConfigSchema>;
export type InsertNews = z.infer<typeof insertNewsSchema>;

export type HeroContent = typeof heroContent.$inferSelect;
export type AboutContent = typeof aboutContent.$inferSelect;
export type Program = typeof programs.$inferSelect;
export type Event = typeof events.$inferSelect;
export type Leadership = typeof leadership.$inferSelect;
export type ContactInfo = typeof contactInfo.$inferSelect;
export type DonationConfig = typeof donationConfig.$inferSelect;
export type News = typeof news.$inferSelect;
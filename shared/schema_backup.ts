import {
  pgTable,
  text,
  integer,
  boolean,
  serial,
  timestamp,
  real,
  index,
  varchar,
  uuid,
} from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Session storage table for Replit Auth
export const sessions = pgTable(
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
export const users = pgTable("users", {
  id: text("id").primaryKey().notNull(),
  email: text("email").unique(),
  firstName: text("first_name"),
  lastName: text("last_name"),
  profileImageUrl: text("profile_image_url"),
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
  corePrograms: text("core_programs").default("8"),
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
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Events - Enhanced for better functionality
export const events = pgTable("events", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description"),
  eventDate: timestamp("event_date").notNull(),
  startTime: text("start_time"),
  endTime: text("end_time"),
  location: text("location"),
  eventType: text("event_type").notNull(),
  maxParticipants: integer("max_participants"),
  currentParticipants: integer("current_participants").default(0),
  registrationDeadline: timestamp("registration_deadline"),
  isRegistrationOpen: boolean("is_registration_open").default(true),
  organizer: text("organizer"),
  isActive: boolean("is_active").default(true),
  imageUrl: text("image_url"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Contact Information
export const contactInfo = pgTable("contact_info", {
  id: serial("id").primaryKey(),
  address: text("address").notNull(),
  phone: text("phone").notNull(),
  email: text("email").notNull(),
  website: text("website"),
  socialMedia: text("social_media"),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Donation Configuration
export const donationConfig = pgTable("donation_config", {
  id: serial("id").primaryKey(),
  monthlyAmount: text("monthly_amount").notNull(),
  description: text("description").notNull(),
  bankDetails: text("bank_details"),
  paymentMethods: text("payment_methods"),
  taxBenefits: text("tax_benefits"),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Schema exports for validation
export const insertHeroContentSchema = createInsertSchema(heroContent);
export const insertAboutContentSchema = createInsertSchema(aboutContent);
export const insertProgramSchema = createInsertSchema(programs);
export const insertEventSchema = createInsertSchema(events);
export const insertContactInfoSchema = createInsertSchema(contactInfo);
export const insertDonationConfigSchema = createInsertSchema(donationConfig);

// Type exports
export type InsertHeroContent = z.infer<typeof insertHeroContentSchema>;
export type InsertAboutContent = z.infer<typeof insertAboutContentSchema>;
export type InsertProgram = z.infer<typeof insertProgramSchema>;
export type InsertEvent = z.infer<typeof insertEventSchema>;
export type InsertContactInfo = z.infer<typeof insertContactInfoSchema>;
export type InsertDonationConfig = z.infer<typeof insertDonationConfigSchema>;

export type HeroContent = typeof heroContent.$inferSelect;
export type AboutContent = typeof aboutContent.$inferSelect;
export type Program = typeof programs.$inferSelect;
export type Event = typeof events.$inferSelect;
export type ContactInfo = typeof contactInfo.$inferSelect;
export type DonationConfig = typeof donationConfig.$inferSelect;
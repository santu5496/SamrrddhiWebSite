CREATE TABLE `about_content` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`mission_title` text NOT NULL,
	`mission_description` text NOT NULL,
	`journey_title` text NOT NULL,
	`journey_description` text NOT NULL,
	`image_url` text,
	`updated_at` integer
);
--> statement-breakpoint
CREATE TABLE `contact_info` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`address` text NOT NULL,
	`phone` text NOT NULL,
	`email` text NOT NULL,
	`website` text,
	`social_media` text,
	`updated_at` integer
);
--> statement-breakpoint
CREATE TABLE `donation_config` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`monthly_amount` text NOT NULL,
	`description` text NOT NULL,
	`bank_details` text,
	`payment_methods` text,
	`tax_benefits` text,
	`updated_at` integer
);
--> statement-breakpoint
CREATE TABLE `events` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`title` text NOT NULL,
	`description` text,
	`event_date` integer NOT NULL,
	`start_time` text,
	`end_time` text,
	`location` text,
	`event_type` text NOT NULL,
	`max_participants` integer,
	`current_participants` integer DEFAULT 0,
	`registration_deadline` integer,
	`is_registration_open` integer DEFAULT true,
	`organizer` text,
	`is_active` integer DEFAULT true,
	`image_url` text,
	`created_at` integer,
	`updated_at` integer
);
--> statement-breakpoint
CREATE TABLE `hero_content` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`headline` text NOT NULL,
	`subheading` text NOT NULL,
	`background_image_url` text,
	`years_of_service` text DEFAULT '29',
	`children_supported` text DEFAULT '50+',
	`core_programs` text DEFAULT '8',
	`updated_at` integer
);
--> statement-breakpoint
CREATE TABLE `leadership` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`role` text NOT NULL,
	`bio` text,
	`image_url` text,
	`qualification` text,
	`experience` text,
	`email` text,
	`linked_in` text,
	`order_index` integer DEFAULT 0,
	`is_active` integer DEFAULT true,
	`created_at` integer,
	`updated_at` integer
);
--> statement-breakpoint
CREATE TABLE `media_coverage` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`type` text NOT NULL,
	`title` text NOT NULL,
	`description` text,
	`thumbnail_url` text NOT NULL,
	`media_url` text,
	`published_date` integer,
	`source` text,
	`author` text,
	`is_active` integer DEFAULT true,
	`created_at` integer,
	`updated_at` integer
);
--> statement-breakpoint
CREATE TABLE `news` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`title` text NOT NULL,
	`content` text NOT NULL,
	`excerpt` text NOT NULL,
	`image_url` text,
	`program_id` integer,
	`category` text NOT NULL,
	`tags` text,
	`published_date` integer,
	`is_published` integer DEFAULT true,
	`is_active` integer DEFAULT true,
	`created_at` integer,
	`updated_at` integer,
	FOREIGN KEY (`program_id`) REFERENCES `programs`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `photo_gallery` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`title` text NOT NULL,
	`description` text,
	`image_url` text NOT NULL,
	`category` text NOT NULL,
	`event` text,
	`date` text,
	`photographer` text,
	`is_active` integer DEFAULT true,
	`created_at` integer,
	`updated_at` integer
);
--> statement-breakpoint
CREATE TABLE `programs` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`title` text NOT NULL,
	`description` text NOT NULL,
	`detailed_description` text,
	`image_url` text,
	`icon` text NOT NULL,
	`category` text NOT NULL,
	`objectives` text,
	`target_group` text,
	`how_we_work` text,
	`components` text,
	`future_initiatives` text,
	`order_index` integer DEFAULT 0,
	`is_active` integer DEFAULT true,
	`created_at` integer,
	`updated_at` integer
);
--> statement-breakpoint
CREATE TABLE `sessions` (
	`sid` text PRIMARY KEY NOT NULL,
	`sess` text NOT NULL,
	`expire` integer NOT NULL
);
--> statement-breakpoint
CREATE INDEX `IDX_session_expire` ON `sessions` (`expire`);--> statement-breakpoint
CREATE TABLE `users` (
	`id` text PRIMARY KEY NOT NULL,
	`email` text,
	`first_name` text,
	`last_name` text,
	`profile_image_url` text,
	`created_at` integer,
	`updated_at` integer
);
--> statement-breakpoint
CREATE UNIQUE INDEX `users_email_unique` ON `users` (`email`);
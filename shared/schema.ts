import { pgTable, text, integer, serial, varchar, timestamp, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// ─── Properties ───────────────────────────────────────────────────────────────

export const properties = pgTable("properties", {
  id: serial("id").primaryKey(),
  title: varchar({ length: 255 }).notNull(),
  description: text().notNull(),
  price: varchar({ length: 50 }).notNull(),
  priceValue: integer("price_value"),
  location: varchar({ length: 255 }).notNull(),
  community: varchar({ length: 255 }),
  beds: integer().notNull(),
  baths: integer().notNull(),
  area: varchar({ length: 50 }).notNull(),
  type: varchar({ length: 50 }).notNull(),
  listingType: varchar("listing_type", { length: 50 }).notNull().default("buy"),
  status: varchar({ length: 50 }).notNull().default("available"),
  featured: boolean().notNull().default(false),
  yearBuilt: integer("year_built").notNull(),
  images: text().array().notNull(),
  features: text().array().notNull(),
  amenities: text().notNull(),
  agentName: varchar("agent_name", { length: 255 }).notNull().default(""),
  agentTitle: varchar("agent_title", { length: 255 }).notNull().default(""),
  agentPhone: varchar("agent_phone", { length: 50 }).notNull().default(""),
  agentEmail: varchar("agent_email", { length: 255 }).notNull().default(""),
  createdAt: timestamp("created_at").defaultNow(),
});

export const propertyInsertSchema = createInsertSchema(properties).omit({ id: true, createdAt: true });
export type Property = typeof properties.$inferSelect;
export type PropertyInsert = z.infer<typeof propertyInsertSchema>;

// ─── Favorites ────────────────────────────────────────────────────────────────

export const favorites = pgTable("favorites", {
  id: serial("id").primaryKey(),
  propertyId: integer("property_id").references(() => properties.id, { onDelete: "cascade" }).notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const favoriteInsertSchema = createInsertSchema(favorites).omit({ id: true, createdAt: true });
export type Favorite = typeof favorites.$inferSelect;
export type FavoriteInsert = z.infer<typeof favoriteInsertSchema>;

// ─── Blog Posts ───────────────────────────────────────────────────────────────

export const blogPosts = pgTable("blog_posts", {
  id: serial("id").primaryKey(),
  slug: varchar({ length: 255 }).notNull().unique(),
  title: varchar({ length: 500 }).notNull(),
  subtitle: text(),
  category: varchar({ length: 100 }).notNull(),
  authorName: varchar("author_name", { length: 255 }).notNull(),
  authorRole: varchar("author_role", { length: 255 }),
  authorImage: text("author_image"),
  heroImage: text("hero_image"),
  excerpt: text().notNull(),
  content: text().notNull(),
  featured: boolean().notNull().default(false),
  views: integer().notNull().default(0),
  readTime: varchar("read_time", { length: 50 }),
  publishedAt: timestamp("published_at").defaultNow(),
});

export const blogPostInsertSchema = createInsertSchema(blogPosts).omit({ id: true, publishedAt: true, views: true });
export type BlogPost = typeof blogPosts.$inferSelect;
export type BlogPostInsert = z.infer<typeof blogPostInsertSchema>;

// ─── Inquiries ────────────────────────────────────────────────────────────────

export const inquiries = pgTable("inquiries", {
  id: serial("id").primaryKey(),
  name: varchar({ length: 255 }).notNull(),
  email: varchar({ length: 255 }).notNull(),
  phone: varchar({ length: 50 }),
  type: varchar({ length: 50 }).notNull().default("general"),
  message: text().notNull(),
  propertyId: integer("property_id"),
  status: varchar({ length: 50 }).notNull().default("new"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const inquiryInsertSchema = createInsertSchema(inquiries).omit({ id: true, createdAt: true, status: true });
export type Inquiry = typeof inquiries.$inferSelect;
export type InquiryInsert = z.infer<typeof inquiryInsertSchema>;

// ─── Newsletter Subscribers ───────────────────────────────────────────────────

export const newsletterSubscribers = pgTable("newsletter_subscribers", {
  id: serial("id").primaryKey(),
  email: varchar({ length: 255 }).notNull().unique(),
  name: varchar({ length: 255 }),
  createdAt: timestamp("created_at").defaultNow(),
});

export const newsletterInsertSchema = createInsertSchema(newsletterSubscribers).omit({ id: true, createdAt: true });
export type NewsletterSubscriber = typeof newsletterSubscribers.$inferSelect;
export type NewsletterInsert = z.infer<typeof newsletterInsertSchema>;

// ─── Agents ───────────────────────────────────────────────────────────────────

export const agents = pgTable("agents", {
  id: serial("id").primaryKey(),
  name: varchar({ length: 255 }).notNull(),
  role: varchar({ length: 255 }).notNull(),
  phone: varchar({ length: 50 }),
  email: varchar({ length: 255 }),
  image: text(),
  bio: text(),
  specialties: text().array(),
  languages: text().array(),
  transactions: integer().default(0),
  yearsExperience: integer("years_experience").default(0),
  sortOrder: integer("sort_order").default(0),
});

export const agentInsertSchema = createInsertSchema(agents).omit({ id: true });
export type Agent = typeof agents.$inferSelect;
export type AgentInsert = z.infer<typeof agentInsertSchema>;

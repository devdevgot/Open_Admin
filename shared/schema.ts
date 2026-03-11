import { pgTable, text, integer, varchar, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const properties = pgTable("properties", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  title: varchar({ length: 255 }).notNull(),
  description: text().notNull(),
  price: varchar({ length: 50 }).notNull(),
  location: varchar({ length: 255 }).notNull(),
  beds: integer().notNull(),
  baths: integer().notNull(),
  area: varchar({ length: 50 }).notNull(),
  type: varchar({ length: 50 }).notNull(),
  yearBuilt: integer("year_built").notNull(),
  images: text().array().notNull(),
  features: text().array().notNull(),
  amenities: text().notNull(),
  agentName: varchar("agent_name", { length: 255 }).notNull().default("Marcus Thorne"),
  agentTitle: varchar("agent_title", { length: 255 }).notNull().default("Director of Private Office"),
  agentPhone: varchar("agent_phone", { length: 50 }).notNull().default("+971 4 000 0000"),
  agentEmail: varchar("agent_email", { length: 255 }).notNull().default("marcus@avieraliving.com"),
});

export const propertyInsertSchema = createInsertSchema(properties).omit({ id: true });

export type Property = typeof properties.$inferSelect;
export type PropertyInsert = z.infer<typeof propertyInsertSchema>;

export const favorites = pgTable("favorites", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  propertyId: integer("property_id").references(() => properties.id, { onDelete: "cascade" }).notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const favoriteInsertSchema = createInsertSchema(favorites).omit({ id: true, createdAt: true });

export type Favorite = typeof favorites.$inferSelect;
export type FavoriteInsert = z.infer<typeof favoriteInsertSchema>;

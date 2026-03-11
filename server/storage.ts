import { drizzle } from "drizzle-orm/node-postgres";
import { eq } from "drizzle-orm";
import {
  properties,
  favorites,
  type Property,
  type PropertyInsert,
  type Favorite,
  type FavoriteInsert,
} from "@shared/schema";

export interface IStorage {
  getProperties(): Promise<Property[]>;
  getPropertyById(id: number): Promise<Property | undefined>;
  getPropertiesByType(type: string): Promise<Property[]>;
  createProperty(property: PropertyInsert): Promise<Property>;
  getFavorites(): Promise<Favorite[]>;
  addFavorite(favorite: FavoriteInsert): Promise<Favorite>;
  removeFavorite(propertyId: number): Promise<void>;
  isFavorited(propertyId: number): Promise<boolean>;
}

const db = drizzle(process.env.DATABASE_URL!);

export class DatabaseStorage implements IStorage {
  async getProperties(): Promise<Property[]> {
    return db.select().from(properties);
  }

  async getPropertyById(id: number): Promise<Property | undefined> {
    const [property] = await db.select().from(properties).where(eq(properties.id, id));
    return property;
  }

  async getPropertiesByType(type: string): Promise<Property[]> {
    return db.select().from(properties).where(eq(properties.type, type));
  }

  async createProperty(property: PropertyInsert): Promise<Property> {
    const [created] = await db.insert(properties).values(property).returning();
    return created;
  }

  async getFavorites(): Promise<Favorite[]> {
    return db.select().from(favorites);
  }

  async addFavorite(favorite: FavoriteInsert): Promise<Favorite> {
    const [created] = await db.insert(favorites).values(favorite).returning();
    return created;
  }

  async removeFavorite(propertyId: number): Promise<void> {
    await db.delete(favorites).where(eq(favorites.propertyId, propertyId));
  }

  async isFavorited(propertyId: number): Promise<boolean> {
    const [fav] = await db.select().from(favorites).where(eq(favorites.propertyId, propertyId));
    return !!fav;
  }
}

export const storage = new DatabaseStorage();

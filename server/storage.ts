import { drizzle } from "drizzle-orm/node-postgres";
import { eq, and, gte, lte, sql, count } from "drizzle-orm";
import {
  properties, favorites, blogPosts, inquiries, newsletterSubscribers, agents,
  type Property, type PropertyInsert,
  type Favorite, type FavoriteInsert,
  type BlogPost, type BlogPostInsert,
  type Inquiry, type InquiryInsert,
  type NewsletterSubscriber, type NewsletterInsert,
  type Agent, type AgentInsert,
} from "@shared/schema";

const db = drizzle(process.env.DATABASE_URL!);

interface PropertyFilters {
  type?: string;
  listingType?: string;
  beds?: number;
  priceMin?: number;
  priceMax?: number;
  community?: string;
  status?: string;
}

interface BlogFilters {
  category?: string;
  featured?: boolean;
  limit?: number;
  offset?: number;
}

interface InquiryFilters {
  status?: string;
  type?: string;
}

export interface IStorage {
  // Properties
  getProperties(filters?: PropertyFilters): Promise<Property[]>;
  getPropertyById(id: number): Promise<Property | undefined>;
  createProperty(property: PropertyInsert): Promise<Property>;
  updateProperty(id: number, property: Partial<PropertyInsert>): Promise<Property | undefined>;
  deleteProperty(id: number): Promise<void>;

  // Favorites
  getFavorites(): Promise<Favorite[]>;
  addFavorite(favorite: FavoriteInsert): Promise<Favorite>;
  removeFavorite(propertyId: number): Promise<void>;
  isFavorited(propertyId: number): Promise<boolean>;

  // Blog
  getBlogPosts(filters?: BlogFilters): Promise<BlogPost[]>;
  getBlogPostById(id: number): Promise<BlogPost | undefined>;
  getBlogPostBySlug(slug: string): Promise<BlogPost | undefined>;
  createBlogPost(post: BlogPostInsert): Promise<BlogPost>;
  updateBlogPost(id: number, post: Partial<BlogPostInsert>): Promise<BlogPost | undefined>;
  deleteBlogPost(id: number): Promise<void>;
  incrementBlogViews(id: number): Promise<void>;

  // Inquiries
  getInquiries(filters?: InquiryFilters): Promise<Inquiry[]>;
  createInquiry(inquiry: InquiryInsert): Promise<Inquiry>;
  updateInquiryStatus(id: number, status: string): Promise<Inquiry | undefined>;
  deleteInquiry(id: number): Promise<void>;

  // Newsletter
  getSubscriberByEmail(email: string): Promise<NewsletterSubscriber | undefined>;
  getSubscribers(): Promise<NewsletterSubscriber[]>;
  createSubscriber(subscriber: NewsletterInsert): Promise<NewsletterSubscriber>;
  removeSubscriber(email: string): Promise<void>;

  // Agents
  getAgents(): Promise<Agent[]>;
  getAgentById(id: number): Promise<Agent | undefined>;
  createAgent(agent: AgentInsert): Promise<Agent>;
  updateAgent(id: number, agent: Partial<AgentInsert>): Promise<Agent | undefined>;
  deleteAgent(id: number): Promise<void>;

  // Admin stats
  getAdminStats(): Promise<{ properties: number; blogPosts: number; inquiries: number; subscribers: number; agents: number; newInquiries: number }>;
}

export class DatabaseStorage implements IStorage {

  // ─── Properties ─────────────────────────────────────────────────────────────

  async getProperties(filters: PropertyFilters = {}): Promise<Property[]> {
    const conditions = [];
    if (filters.type && filters.type !== "All") conditions.push(eq(properties.type, filters.type));
    if (filters.listingType && filters.listingType !== "All") conditions.push(eq(properties.listingType, filters.listingType));
    if (filters.beds) conditions.push(eq(properties.beds, filters.beds));
    if (filters.community) conditions.push(eq(properties.community, filters.community));
    if (filters.status) conditions.push(eq(properties.status, filters.status));
    if (filters.priceMin !== undefined) conditions.push(gte(properties.priceValue, filters.priceMin));
    if (filters.priceMax !== undefined) conditions.push(lte(properties.priceValue, filters.priceMax));

    if (conditions.length === 0) return db.select().from(properties);
    return db.select().from(properties).where(and(...conditions));
  }

  async getPropertyById(id: number): Promise<Property | undefined> {
    const [p] = await db.select().from(properties).where(eq(properties.id, id));
    return p;
  }

  async createProperty(property: PropertyInsert): Promise<Property> {
    const [created] = await db.insert(properties).values(property).returning();
    return created;
  }

  async updateProperty(id: number, property: Partial<PropertyInsert>): Promise<Property | undefined> {
    const [updated] = await db.update(properties).set(property).where(eq(properties.id, id)).returning();
    return updated;
  }

  async deleteProperty(id: number): Promise<void> {
    await db.delete(favorites).where(eq(favorites.propertyId, id));
    await db.delete(properties).where(eq(properties.id, id));
  }

  // ─── Favorites ──────────────────────────────────────────────────────────────

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

  // ─── Blog ────────────────────────────────────────────────────────────────────

  async getBlogPosts(filters: BlogFilters = {}): Promise<BlogPost[]> {
    const conditions = [];
    if (filters.category && filters.category !== "All") conditions.push(eq(blogPosts.category, filters.category));
    if (filters.featured !== undefined) conditions.push(eq(blogPosts.featured, filters.featured));

    const query = db.select().from(blogPosts);
    if (conditions.length > 0) query.where(and(...conditions));
    if (filters.limit) query.limit(filters.limit);
    if (filters.offset) query.offset(filters.offset);
    return query;
  }

  async getBlogPostById(id: number): Promise<BlogPost | undefined> {
    const [post] = await db.select().from(blogPosts).where(eq(blogPosts.id, id));
    return post;
  }

  async getBlogPostBySlug(slug: string): Promise<BlogPost | undefined> {
    const [post] = await db.select().from(blogPosts).where(eq(blogPosts.slug, slug));
    return post;
  }

  async createBlogPost(post: BlogPostInsert): Promise<BlogPost> {
    const [created] = await db.insert(blogPosts).values(post).returning();
    return created;
  }

  async updateBlogPost(id: number, post: Partial<BlogPostInsert>): Promise<BlogPost | undefined> {
    const [updated] = await db.update(blogPosts).set(post).where(eq(blogPosts.id, id)).returning();
    return updated;
  }

  async deleteBlogPost(id: number): Promise<void> {
    await db.delete(blogPosts).where(eq(blogPosts.id, id));
  }

  async incrementBlogViews(id: number): Promise<void> {
    await db.update(blogPosts).set({ views: sql`${blogPosts.views} + 1` }).where(eq(blogPosts.id, id));
  }

  // ─── Inquiries ──────────────────────────────────────────────────────────────

  async getInquiries(filters: InquiryFilters = {}): Promise<Inquiry[]> {
    const conditions = [];
    if (filters.status) conditions.push(eq(inquiries.status, filters.status));
    if (filters.type) conditions.push(eq(inquiries.type, filters.type));
    if (conditions.length === 0) return db.select().from(inquiries);
    return db.select().from(inquiries).where(and(...conditions));
  }

  async createInquiry(inquiry: InquiryInsert): Promise<Inquiry> {
    const [created] = await db.insert(inquiries).values(inquiry).returning();
    return created;
  }

  async updateInquiryStatus(id: number, status: string): Promise<Inquiry | undefined> {
    const [updated] = await db.update(inquiries).set({ status }).where(eq(inquiries.id, id)).returning();
    return updated;
  }

  async deleteInquiry(id: number): Promise<void> {
    await db.delete(inquiries).where(eq(inquiries.id, id));
  }

  // ─── Newsletter ─────────────────────────────────────────────────────────────

  async getSubscriberByEmail(email: string): Promise<NewsletterSubscriber | undefined> {
    const [s] = await db.select().from(newsletterSubscribers).where(eq(newsletterSubscribers.email, email));
    return s;
  }

  async getSubscribers(): Promise<NewsletterSubscriber[]> {
    return db.select().from(newsletterSubscribers);
  }

  async createSubscriber(subscriber: NewsletterInsert): Promise<NewsletterSubscriber> {
    const [created] = await db.insert(newsletterSubscribers).values(subscriber).returning();
    return created;
  }

  async removeSubscriber(email: string): Promise<void> {
    await db.delete(newsletterSubscribers).where(eq(newsletterSubscribers.email, email));
  }

  // ─── Agents ─────────────────────────────────────────────────────────────────

  async getAgents(): Promise<Agent[]> {
    return db.select().from(agents).orderBy(agents.sortOrder);
  }

  async getAgentById(id: number): Promise<Agent | undefined> {
    const [agent] = await db.select().from(agents).where(eq(agents.id, id));
    return agent;
  }

  async createAgent(agent: AgentInsert): Promise<Agent> {
    const [created] = await db.insert(agents).values(agent).returning();
    return created;
  }

  async updateAgent(id: number, agent: Partial<AgentInsert>): Promise<Agent | undefined> {
    const [updated] = await db.update(agents).set(agent).where(eq(agents.id, id)).returning();
    return updated;
  }

  async deleteAgent(id: number): Promise<void> {
    await db.delete(agents).where(eq(agents.id, id));
  }

  // ─── Admin stats ─────────────────────────────────────────────────────────────

  async getAdminStats() {
    const [[propsCount], [postsCount], [inqCount], [subsCount], [agentsCount], [newInqCount]] = await Promise.all([
      db.select({ c: count() }).from(properties),
      db.select({ c: count() }).from(blogPosts),
      db.select({ c: count() }).from(inquiries),
      db.select({ c: count() }).from(newsletterSubscribers),
      db.select({ c: count() }).from(agents),
      db.select({ c: count() }).from(inquiries).where(eq(inquiries.status, "new")),
    ]);
    return {
      properties: propsCount.c,
      blogPosts: postsCount.c,
      inquiries: inqCount.c,
      subscribers: subsCount.c,
      agents: agentsCount.c,
      newInquiries: newInqCount.c,
    };
  }
}

export const storage = new DatabaseStorage();

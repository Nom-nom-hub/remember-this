import { pgTable, text, timestamp, uuid, varchar, boolean } from 'drizzle-orm/pg-core';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { z } from 'zod';

// Users table - stores additional user info beyond what Clerk provides
export const users = pgTable('users', {
  id: uuid('id').primaryKey().defaultRandom(),
  clerkId: varchar('clerk_id', { length: 256 }).notNull().unique(),
  email: varchar('email', { length: 256 }).notNull(),
  firstName: varchar('first_name', { length: 100 }),
  lastName: varchar('last_name', { length: 100 }),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// Memories table - stores user memories
export const memories = pgTable('memories', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  clerkUserId: varchar('clerk_user_id', { length: 256 }).notNull(), // For easier queries
  title: varchar('title', { length: 200 }).notNull(),
  description: text('description').notNull(),
  category: varchar('category', { length: 50 }).notNull(),
  timeframe: varchar('timeframe', { length: 100 }),
  tags: text('tags'), // JSON array of tags
  imageUrl: varchar('image_url', { length: 500 }),
  isPublic: boolean('is_public').default(true).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// Memory connections - when users relate to each other's memories
export const memoryConnections = pgTable('memory_connections', {
  id: uuid('id').primaryKey().defaultRandom(),
  memoryId: uuid('memory_id').notNull().references(() => memories.id, { onDelete: 'cascade' }),
  userId: uuid('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  clerkUserId: varchar('clerk_user_id', { length: 256 }).notNull(),
  connectionType: varchar('connection_type', { length: 50 }).notNull(), // 'remember', 'relate', 'experienced'
  note: text('note'), // Optional note about the connection
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// Zod schemas for validation
export const insertUserSchema = createInsertSchema(users);
export const selectUserSchema = createSelectSchema(users);

export const insertMemorySchema = createInsertSchema(memories, {
  tags: z.string().optional(), // Will be parsed as JSON
});
export const selectMemorySchema = createSelectSchema(memories);

export const insertMemoryConnectionSchema = createInsertSchema(memoryConnections);
export const selectMemoryConnectionSchema = createSelectSchema(memoryConnections);

// Types
export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;
export type Memory = typeof memories.$inferSelect;
export type NewMemory = typeof memories.$inferInsert;
export type MemoryConnection = typeof memoryConnections.$inferSelect;
export type NewMemoryConnection = typeof memoryConnections.$inferInsert;

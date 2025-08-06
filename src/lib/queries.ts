import { getDb } from './db';
import { users, memories, memoryConnections, type NewUser, type NewMemory, type User, type Memory } from './schema';
import { eq, and, desc, ilike, or } from 'drizzle-orm';

// User operations
export async function createUser(userData: NewUser): Promise<User> {
  const db = getDb();
  const [user] = await db.insert(users).values(userData).returning();
  return user;
}

export async function getUserByClerkId(clerkId: string): Promise<User | null> {
  const db = getDb();
  const [user] = await db.select().from(users).where(eq(users.clerkId, clerkId));
  return user || null;
}

export async function updateUser(clerkId: string, userData: Partial<NewUser>): Promise<User> {
  const db = getDb();
  const [user] = await db
    .update(users)
    .set({ ...userData, updatedAt: new Date() })
    .where(eq(users.clerkId, clerkId))
    .returning();
  return user;
}

// Memory operations
export async function createMemory(memoryData: NewMemory): Promise<Memory> {
  const db = getDb();
  const [memory] = await db.insert(memories).values(memoryData).returning();
  return memory;
}

export async function getMemoriesByUserId(userId: string, limit = 20): Promise<Memory[]> {
  const db = getDb();
  return db
    .select()
    .from(memories)
    .where(eq(memories.userId, userId))
    .orderBy(desc(memories.createdAt))
    .limit(limit);
}

export async function getPublicMemories(limit = 50): Promise<Memory[]> {
  const db = getDb();
  return db
    .select()
    .from(memories)
    .where(eq(memories.isPublic, true))
    .orderBy(desc(memories.createdAt))
    .limit(limit);
}

export async function getMemoryById(id: string): Promise<Memory | null> {
  const db = getDb();
  const [memory] = await db.select().from(memories).where(eq(memories.id, id));
  return memory || null;
}

export async function searchMemories(query: string, limit = 20): Promise<Memory[]> {
  const db = getDb();
  return db
    .select()
    .from(memories)
    .where(
      and(
        eq(memories.isPublic, true),
        or(
          ilike(memories.title, `%${query}%`),
          ilike(memories.description, `%${query}%`),
          ilike(memories.tags, `%${query}%`)
        )
      )
    )
    .orderBy(desc(memories.createdAt))
    .limit(limit);
}

export async function updateMemory(id: string, memoryData: Partial<NewMemory>): Promise<Memory> {
  const db = getDb();
  const [memory] = await db
    .update(memories)
    .set({ ...memoryData, updatedAt: new Date() })
    .where(eq(memories.id, id))
    .returning();
  return memory;
}

export async function deleteMemory(id: string): Promise<void> {
  const db = getDb();
  await db.delete(memories).where(eq(memories.id, id));
}

// Memory connection operations
export async function createMemoryConnection(
  memoryId: string,
  userId: string,
  clerkUserId: string,
  connectionType: string,
  note?: string
): Promise<void> {
  const db = getDb();
  await db.insert(memoryConnections).values({
    memoryId,
    userId,
    clerkUserId,
    connectionType,
    note,
  });
}

export async function getMemoryConnections(memoryId: string) {
  const db = getDb();
  return db
    .select()
    .from(memoryConnections)
    .where(eq(memoryConnections.memoryId, memoryId))
    .orderBy(desc(memoryConnections.createdAt));
}

export async function getUserConnections(userId: string) {
  const db = getDb();
  return db
    .select()
    .from(memoryConnections)
    .where(eq(memoryConnections.userId, userId))
    .orderBy(desc(memoryConnections.createdAt));
}

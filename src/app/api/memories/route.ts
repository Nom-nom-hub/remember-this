import { auth } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';
import { createMemory, getUserByClerkId } from '@/lib/queries';
import { insertMemorySchema } from '@/lib/schema';

export async function POST(req: Request) {
  try {
    const { userId } = await auth();
    
    if (!userId) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const body = await req.json();
    
    // Validate the input
    const validatedData = insertMemorySchema.parse(body);
    
    // Get the user from our database
    const user = await getUserByClerkId(userId);
    if (!user) {
      return new NextResponse('User not found', { status: 404 });
    }

    // Create the memory
    const memory = await createMemory({
      ...validatedData,
      userId: user.id,
      clerkUserId: userId,
      tags: validatedData.tags ? JSON.stringify(validatedData.tags) : null,
    });

    return NextResponse.json(memory);
  } catch (error) {
    console.error('Error creating memory:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const limit = parseInt(searchParams.get('limit') || '20');
    
    // For now, we'll implement getting public memories
    // You can extend this to get user-specific memories when authenticated
    const { getPublicMemories } = await import('@/lib/queries');
    const memories = await getPublicMemories(limit);
    
    return NextResponse.json(memories);
  } catch (error) {
    console.error('Error fetching memories:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}

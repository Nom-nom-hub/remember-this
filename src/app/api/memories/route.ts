import { auth, currentUser } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';
import { createMemory, getUserByClerkId, createUser } from '@/lib/queries';
import { insertMemorySchema } from '@/lib/schema';

export async function POST(req: Request) {
  try {
    console.log('Memory API: Starting request processing');
    
    const { userId } = await auth();
    console.log('Memory API: User ID from auth:', userId);
    
    if (!userId) {
      console.log('Memory API: No user ID found - unauthorized');
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const body = await req.json();
    console.log('Memory API: Request body:', body);
    
    // Validate the input
    const validatedData = insertMemorySchema.parse(body);
    console.log('Memory API: Validated data:', validatedData);
    
    // Get the user from our database
    console.log('Memory API: Looking up user by Clerk ID:', userId);
    let user = await getUserByClerkId(userId);
    console.log('Memory API: User found:', user ? 'Yes' : 'No', user?.id);
    
    if (!user) {
      console.log('Memory API: User not found in database - creating user first');
      
      // Try to create the user if they don't exist (fallback for webhook issues)
      try {
        const clerkUser = await currentUser();
        if (clerkUser && clerkUser.emailAddresses && clerkUser.emailAddresses[0]) {
          const newUser = await createUser({
            clerkId: userId,
            email: clerkUser.emailAddresses[0].emailAddress,
            firstName: clerkUser.firstName || '',
            lastName: clerkUser.lastName || '',
          });
          console.log('Memory API: Created new user:', newUser.id);
          user = newUser; // Use the newly created user
        } else {
          console.log('Memory API: Could not get user details from Clerk');
          return new NextResponse('User not found and could not create', { status: 404 });
        }
      } catch (createError) {
        console.error('Memory API: Error creating user:', createError);
        return new NextResponse('User not found and could not create', { status: 404 });
      }
      
      if (!user) {
        console.log('Memory API: Still no user after creation attempt');
        return new NextResponse('User creation failed', { status: 404 });
      }
    }

    console.log('Memory API: Creating memory with user ID:', user.id);
    
    // Create the memory
    const memory = await createMemory({
      ...validatedData,
      userId: user.id,
      clerkUserId: userId,
      tags: validatedData.tags ? JSON.stringify(validatedData.tags) : null,
    });

    console.log('Memory API: Memory created successfully:', memory.id);
    return NextResponse.json(memory);
    
  } catch (error) {
    console.error('Memory API: Detailed error:', error);
    console.error('Memory API: Error stack:', error instanceof Error ? error.stack : 'No stack');
    
    // Return more specific error information
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return new NextResponse(JSON.stringify({ 
      error: 'Internal Server Error', 
      details: errorMessage,
      timestamp: new Date().toISOString()
    }), { 
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
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

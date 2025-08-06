import { NextResponse } from 'next/server';
import { auth, currentUser } from '@clerk/nextjs/server';

export async function GET() {
  try {
    console.log('Test Auth: Starting auth test');
    
    const { userId } = await auth();
    console.log('Test Auth: User ID from auth():', userId);
    
    if (!userId) {
      return NextResponse.json({
        status: 'not_authenticated',
        message: 'No user authenticated',
        timestamp: new Date().toISOString()
      });
    }
    
    const user = await currentUser();
    console.log('Test Auth: Current user:', user?.id, user?.emailAddresses?.[0]?.emailAddress);
    
    return NextResponse.json({
      status: 'success',
      message: 'Auth working',
      userId: userId,
      userEmail: user?.emailAddresses?.[0]?.emailAddress,
      userName: `${user?.firstName} ${user?.lastName}`.trim(),
      timestamp: new Date().toISOString()
    });
    
  } catch (error) {
    console.error('Test Auth: Auth test failed:', error);
    return NextResponse.json({
      status: 'error',
      message: 'Auth test failed',
      error: error instanceof Error ? error.message : 'Unknown error',
      timestamp: new Date().toISOString()
    }, { status: 500 });
  }
}

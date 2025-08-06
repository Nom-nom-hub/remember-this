import { NextResponse } from 'next/server';
import { getDb } from '@/lib/db';

export async function GET() {
  try {
    console.log('Test DB: Starting database connection test');
    
    // Test basic database connection
    const db = getDb();
    console.log('Test DB: Database connection established');
    
    // Try a simple query
    const result = await db.execute('SELECT NOW() as current_time');
    console.log('Test DB: Query executed successfully:', result);
    
    return NextResponse.json({
      status: 'success',
      message: 'Database connection working',
      timestamp: new Date().toISOString(),
      result: result.rows[0]
    });
    
  } catch (error) {
    console.error('Test DB: Database test failed:', error);
    return NextResponse.json({
      status: 'error',
      message: 'Database connection failed',
      error: error instanceof Error ? error.message : 'Unknown error',
      timestamp: new Date().toISOString()
    }, { status: 500 });
  }
}

import { headers } from 'next/headers';
import { NextResponse } from 'next/server';
import { Webhook } from 'svix';
import { createUser, getUserByClerkId, updateUser } from '@/lib/queries';

const webhookSecret = process.env.CLERK_WEBHOOK_SECRET;

if (!webhookSecret) {
  throw new Error('Please add CLERK_WEBHOOK_SECRET to your environment variables');
}

export async function POST(req: Request) {
  const headersList = await headers();
  const svixId = headersList.get('svix-id');
  const svixTimestamp = headersList.get('svix-timestamp');
  const svixSignature = headersList.get('svix-signature');

  if (!svixId || !svixTimestamp || !svixSignature) {
    return new NextResponse('Missing required headers', { status: 400 });
  }

  const payload = await req.text();
  const body = JSON.parse(payload);

  const wh = new Webhook(webhookSecret);

  let evt;
  try {
    evt = wh.verify(payload, {
      'svix-id': svixId,
      'svix-timestamp': svixTimestamp,
      'svix-signature': svixSignature,
    }) as any;
  } catch (err) {
    console.error('Error verifying webhook:', err);
    return new NextResponse('Error occurred', { status: 400 });
  }

  const { id } = evt.data;
  const eventType = evt.type;

  if (eventType === 'user.created') {
    try {
      const { email_addresses, first_name, last_name } = evt.data;
      
      await createUser({
        clerkId: id,
        email: email_addresses[0]?.email_address || '',
        firstName: first_name || '',
        lastName: last_name || '',
      });

      console.log(`User created: ${id}`);
    } catch (error) {
      console.error('Error creating user:', error);
      return new NextResponse('Error creating user', { status: 500 });
    }
  }

  if (eventType === 'user.updated') {
    try {
      const { email_addresses, first_name, last_name } = evt.data;
      
      const existingUser = await getUserByClerkId(id);
      if (existingUser) {
        await updateUser(id, {
          email: email_addresses[0]?.email_address || existingUser.email,
          firstName: first_name || existingUser.firstName,
          lastName: last_name || existingUser.lastName,
        });
      }

      console.log(`User updated: ${id}`);
    } catch (error) {
      console.error('Error updating user:', error);
      return new NextResponse('Error updating user', { status: 500 });
    }
  }

  return new NextResponse('', { status: 200 });
}

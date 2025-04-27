// /api/chamas/[id]/join/route.ts
import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

export const dynamic = 'force-dynamic';

interface JoinRequest {
  acceptedRules?: boolean;
  paymentMethod?: string;
}

export async function POST(req: Request, { params }: { params: { id: string } }) {
  try {
    // 1. Authenticate user
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      return NextResponse.json(
        { error: 'Authorization header required' },
        { status: 401 }
      );
    }

    const { data: { user }, error: authError } = await supabase.auth.getUser(authHeader);
    if (authError || !user) {
      return NextResponse.json(
        { error: 'Invalid or expired token' },
        { status: 401 }
      );
    }

    // 2. Validate request body
    const body: JoinRequest = await req.json();
    if (!body.acceptedRules) {
      return NextResponse.json(
        { error: 'You must accept the group rules' },
        { status: 400 }
      );
    }

    const chamaId = params.id;
    if (!chamaId) {
      return NextResponse.json(
        { error: 'Chama ID is required' },
        { status: 400 }
      );
    }

    // 3. Check if chama exists
    const { data: chama, error: chamaError } = await supabase
      .from('chamas')
      .select('*')
      .eq('id', chamaId)
      .single();

    if (chamaError || !chama) {
      return NextResponse.json(
        { error: 'Chama not found' },
        { status: 404 }
      );
    }

    // 4. Check if user is already a member
    const { data: existingMember, error: memberError } = await supabase
      .from('chama_members')
      .select('*')
      .eq('chama_id', chamaId)
      .eq('user_id', user.id)
      .maybeSingle();

    if (memberError) throw memberError;
    if (existingMember) {
      return NextResponse.json(
        { error: 'You are already a member of this chama' },
        { status: 409 }
      );
    }

    // 5. Create membership record
    const { error: joinError } = await supabase
      .from('chama_members')
      .insert({
        chama_id: chamaId,
        user_id: user.id,
        role: 'member',
        status: 'active',
        joined_at: new Date().toISOString(),
        payment_method: body.paymentMethod || 'manual'
      });

    if (joinError) throw joinError;

    // 6. Return success response
    return NextResponse.json(
      { success: true, chama: { name: chama.name } },
      { status: 200 }
    );

  } catch (error) {
    console.error('Error joining chama:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
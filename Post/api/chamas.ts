// /api/chamas/route.ts
import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

export const dynamic = 'force-dynamic';

interface ChamaCreationRequest {
  name: string;
  description?: string;
  contributionAmount: number;
  frequency: 'weekly' | 'monthly' | 'quarterly';
  rules: string[];
  isPublic?: boolean;
  targetAmount?: number;
}

export async function POST(req: Request) {
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
    const body: ChamaCreationRequest = await req.json();
    
    if (!body.name || !body.contributionAmount || !body.frequency) {
      return NextResponse.json(
        { error: 'Name, contribution amount and frequency are required' },
        { status: 400 }
      );
    }

    if (body.contributionAmount <= 0) {
      return NextResponse.json(
        { error: 'Contribution amount must be positive' },
        { status: 400 }
      );
    }

    if (!['weekly', 'monthly', 'quarterly'].includes(body.frequency)) {
      return NextResponse.json(
        { error: 'Invalid frequency. Must be weekly, monthly, or quarterly' },
        { status: 400 }
      );
    }

    // 3. Create chama in a transaction
    const invitationCode = crypto.randomUUID();
    
    const { data: chama, error: createError } = await supabase
      .from('chamas')
      .insert({
        name: body.name,
        description: body.description,
        contribution_amount: body.contributionAmount,
        frequency: body.frequency,
        owner_id: user.id,
        invitation_code: invitationCode,
        is_public: body.isPublic ?? false,
        target_amount: body.targetAmount,
        current_cycle: 1,
        total_contributions: 0,
        current_cycle_start: new Date().toISOString()
      })
      .select()
      .single();

    if (createError || !chama) {
      console.error('Failed to create chama:', createError);
      throw createError || new Error('Chama creation failed');
    }

    // 4. Add creator as admin
    const { error: memberError } = await supabase
      .from('chama_members')
      .insert({
        chama_id: chama.id,
        user_id: user.id,
        role: 'admin',
        status: 'active',
        joined_at: new Date().toISOString()
      });

    if (memberError) throw memberError;

    // 5. Create rules if provided
    if (body.rules && body.rules.length > 0) {
      const { error: rulesError } = await supabase
        .from('chama_rules')
        .insert(body.rules.map(rule => ({
          chama_id: chama.id,
          rule_text: rule,
          created_by: user.id
        })));

      if (rulesError) throw rulesError;
    }

    // 6. Return created chama
    return NextResponse.json(
      { 
        success: true, 
        chama: {
          id: chama.id,
          name: chama.name,
          invitationCode,
          rules: body.rules || []
        } 
      },
      { status: 201 }
    );

  } catch (error) {
    console.error('Error creating chama:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
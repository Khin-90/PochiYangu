import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'; // ✅ Force API to be dynamic, skips static build crash

export async function POST(
  req: Request, 
  { params }: { params: { id: string } }
) {
  const { createClient } = await import('@supabase/supabase-js'); // ✅ Lazy import inside function
  
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_KEY!
  );

  const { userId, rulesAccepted } = await req.json();
  
  // Verify rules acceptance
  const { data: rules } = await supabase
    .from('chama_rules')
    .select('id')
    .eq('chama_id', params.id)
    .eq('requires_acknowledgement', true);

  if (rules?.length !== rulesAccepted?.length) {
    return NextResponse.json(
      { error: 'All required rules must be accepted' },
      { status: 400 }
    );
  }

  // Create membership
  const { data, error } = await supabase
    .from('chama_members')
    .insert({
      chama_id: params.id,
      user_id: userId,
      status: 'pending'
    })
    .select()
    .single();

  if (error) return NextResponse.json({ error }, { status: 500 });

  return NextResponse.json(data);
}

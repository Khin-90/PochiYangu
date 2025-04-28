import { createClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_KEY!
)

export async function GET() {
  const { data, error } = await supabase
    .from('chamas')
    .select(`
      *,
      members:chama_members(count),
      contributions:contributions(status)
    `)
    .order('created_at', { ascending: false })

  if (error) return NextResponse.json({ error }, { status: 500 })
  return NextResponse.json(data)
}

export async function POST(req: Request) {
  const { 
    name,
    description,
    contributionAmount,
    frequency,
    rules,
    userId 
  } = await req.json()

  // Create chama
  const { data: chama, error } = await supabase
    .from('chamas')
    .insert({
      name,
      description,
      contribution_amount: contributionAmount,
      contribution_frequency: frequency,
      creator_id: userId,
      rules
    })
    .select()
    .single()

  if (error) return NextResponse.json({ error }, { status: 500 })

  // Add creator as admin
  await supabase
    .from('chama_members')
    .insert({
      chama_id: chama.id,
      user_id: userId,
      role: 'admin',
      status: 'active'
    })

  return NextResponse.json(chama)
}
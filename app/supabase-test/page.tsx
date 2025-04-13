import { SupabaseStatus } from "@/components/supabase-status"

export default function SupabaseTestPage() {
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold mb-6 text-center">Supabase Integration Test</h1>
      <SupabaseStatus />
    </div>
  )
}

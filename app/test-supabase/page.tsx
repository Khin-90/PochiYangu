import { SupabaseConnectionTest } from "@/components/supabase-connection-test"

export default function TestSupabasePage() {
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold mb-6 text-center">Supabase Integration Test</h1>
      <p className="text-center mb-8 text-muted-foreground">
        This page verifies that your Supabase environment variables are correctly set up.
      </p>
      <SupabaseConnectionTest />
    </div>
  )
}

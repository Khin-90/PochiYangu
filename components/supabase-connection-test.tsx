"use client"

import { useState, useEffect } from "react"
import { supabase } from "@/lib/supabase"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { CheckCircle, XCircle, AlertCircle } from "lucide-react"

export function SupabaseConnectionTest() {
  const [status, setStatus] = useState<"loading" | "connected" | "error">("loading")
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [envVars, setEnvVars] = useState({
    url: process.env.NEXT_PUBLIC_SUPABASE_URL ? "✓ Set" : "✗ Not set",
    key: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? "✓ Set" : "✗ Not set",
  })

  const testConnection = async () => {
    setStatus("loading")
    setErrorMessage(null)

    try {
      // A simple query to check if we can connect to Supabase
      const { error } = await supabase.from("_dummy_query_for_testing").select("*").limit(1)

      // If we get a "relation does not exist" error, that's actually good - it means we connected
      if (error && error.code === "PGRST116") {
        setStatus("connected")
        return
      }

      // If we get here with no error, we're also connected
      if (!error) {
        setStatus("connected")
        return
      }

      // Any other error means there's a connection issue
      throw error
    } catch (error: any) {
      console.error("Supabase connection error:", error)
      setStatus("error")
      setErrorMessage(error.message || "Failed to connect to Supabase")
    }
  }

  useEffect(() => {
    testConnection()
  }, [])

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Supabase Connection Test</CardTitle>
        <CardDescription>Verifying your Supabase integration</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <h3 className="text-sm font-medium">Environment Variables:</h3>
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div>NEXT_PUBLIC_SUPABASE_URL:</div>
            <div>{envVars.url}</div>
            <div>NEXT_PUBLIC_SUPABASE_ANON_KEY:</div>
            <div>{envVars.key}</div>
          </div>
        </div>

        <div className="flex flex-col items-center py-4">
          {status === "loading" && (
            <div className="flex flex-col items-center">
              <div className="h-8 w-8 rounded-full border-2 border-primary border-t-transparent animate-spin"></div>
              <p className="mt-2 text-sm text-muted-foreground">Testing connection...</p>
            </div>
          )}

          {status === "connected" && (
            <div className="flex flex-col items-center text-green-500">
              <CheckCircle className="h-12 w-12" />
              <p className="mt-2 font-medium">Connected to Supabase!</p>
              <p className="text-sm text-muted-foreground">Your environment variables are working correctly.</p>
            </div>
          )}

          {status === "error" && (
            <div className="flex flex-col items-center">
              <XCircle className="h-12 w-12 text-red-500" />
              <p className="mt-2 font-medium text-red-500">Connection failed</p>
              {errorMessage && (
                <Alert variant="destructive" className="mt-2">
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Error</AlertTitle>
                  <AlertDescription>{errorMessage}</AlertDescription>
                </Alert>
              )}
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={testConnection} className="w-full">
          Test Connection Again
        </Button>
      </CardFooter>
    </Card>
  )
}

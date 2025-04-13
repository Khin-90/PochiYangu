"use client"

import { useState, useEffect } from "react"
import { supabase } from "@/lib/supabase"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, XCircle } from "lucide-react"

export function SupabaseStatus() {
  const [status, setStatus] = useState<"loading" | "connected" | "error">("loading")
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const checkConnection = async () => {
    setStatus("loading")
    setErrorMessage(null)

    try {
      // A simple query to check if we can connect to Supabase
      const { data, error } = await supabase.from("_dummy_query").select("*").limit(1)

      if (error && error.code !== "PGRST116") {
        // If we get an error other than "relation does not exist", there's a connection issue
        throw error
      }

      // If we get here, the connection is working (even if the table doesn't exist)
      setStatus("connected")
    } catch (error: any) {
      console.error("Supabase connection error:", error)
      setStatus("error")
      setErrorMessage(error.message || "Failed to connect to Supabase")
    }
  }

  useEffect(() => {
    checkConnection()
  }, [])

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Supabase Connection Status</CardTitle>
        <CardDescription>Checking connection to your Supabase project</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-center py-4">
          {status === "loading" && (
            <div className="flex flex-col items-center">
              <div className="h-8 w-8 rounded-full border-2 border-primary border-t-transparent animate-spin"></div>
              <p className="mt-2 text-sm text-muted-foreground">Checking connection...</p>
            </div>
          )}

          {status === "connected" && (
            <div className="flex flex-col items-center text-green-500">
              <CheckCircle className="h-12 w-12" />
              <p className="mt-2 font-medium">Connected to Supabase!</p>
            </div>
          )}

          {status === "error" && (
            <div className="flex flex-col items-center text-red-500">
              <XCircle className="h-12 w-12" />
              <p className="mt-2 font-medium">Connection failed</p>
              {errorMessage && <p className="mt-1 text-sm text-muted-foreground">{errorMessage}</p>}
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter className="flex justify-center">
        <Button onClick={checkConnection} variant="outline">
          Test Connection Again
        </Button>
      </CardFooter>
    </Card>
  )
}

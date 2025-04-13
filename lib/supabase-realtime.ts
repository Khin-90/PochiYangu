import { supabase } from "./supabase"

// Subscribe to real-time transaction updates
export const subscribeToTransactions = (userId: string, callback: (transaction: any) => void) => {
  const channel = supabase
    .channel("transactions-channel")
    .on(
      "postgres_changes",
      {
        event: "*",
        schema: "public",
        table: "transactions",
        filter: `user_id=eq.${userId}`,
      },
      (payload) => {
        callback(payload.new)
      },
    )
    .subscribe()

  // Return unsubscribe function
  return () => {
    supabase.removeChannel(channel)
  }
}

// Subscribe to real-time Chama contribution updates
export const subscribeToChamaContributions = (chamaId: string, callback: (contribution: any) => void) => {
  const channel = supabase
    .channel("chama-contributions-channel")
    .on(
      "postgres_changes",
      {
        event: "*",
        schema: "public",
        table: "chama_contributions",
        filter: `chama_id=eq.${chamaId}`,
      },
      (payload) => {
        callback(payload.new)
      },
    )
    .subscribe()

  // Return unsubscribe function
  return () => {
    supabase.removeChannel(channel)
  }
}

// Subscribe to real-time Chama messages
export const subscribeToChamaMessages = (chamaId: string, callback: (message: any) => void) => {
  const channel = supabase
    .channel("chama-messages-channel")
    .on(
      "postgres_changes",
      {
        event: "INSERT",
        schema: "public",
        table: "chama_messages",
        filter: `chama_id=eq.${chamaId}`,
      },
      (payload) => {
        callback(payload.new)
      },
    )
    .subscribe()

  // Return unsubscribe function
  return () => {
    supabase.removeChannel(channel)
  }
}

// Subscribe to real-time notifications
export const subscribeToNotifications = (userId: string, callback: (notification: any) => void) => {
  const channel = supabase
    .channel("notifications-channel")
    .on(
      "postgres_changes",
      {
        event: "INSERT",
        schema: "public",
        table: "notifications",
        filter: `user_id=eq.${userId}`,
      },
      (payload) => {
        callback(payload.new)
      },
    )
    .subscribe()

  // Return unsubscribe function
  return () => {
    supabase.removeChannel(channel)
  }
}

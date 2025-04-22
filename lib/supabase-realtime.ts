import { supabase } from "./supabase"

// Define types for transactions, contributions, messages, and notifications to improve type safety
interface Transaction {
  user_id: string;
  amount: number;
  description: string;
  created_at: string;
}

interface ChamaContribution {
  chama_id: string;
  user_id: string;
  amount: number;
  due_date: string;
}

interface ChamaMessage {
  chama_id: string;
  user_id: string;
  message: string;
  created_at: string;
}

interface Notification {
  user_id: string;
  message: string;
  is_read: boolean;
  created_at: string;
}

// Subscribe to real-time transaction updates
export const subscribeToTransactions = (userId: string, callback: (transaction: Transaction) => void) => {
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
        if (payload.new) {
          callback(payload.new as Transaction)
        }
      }
    )
    .subscribe()

  // Return unsubscribe function
  return () => {
    supabase.removeChannel(channel)
  }
}

// Subscribe to real-time Chama contribution updates
export const subscribeToChamaContributions = (chamaId: string, callback: (contribution: ChamaContribution) => void) => {
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
        if (payload.new) {
          callback(payload.new as ChamaContribution)
        }
      }
    )
    .subscribe()

  // Return unsubscribe function
  return () => {
    supabase.removeChannel(channel)
  }
}

// Subscribe to real-time Chama messages
export const subscribeToChamaMessages = (chamaId: string, callback: (message: ChamaMessage) => void) => {
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
        if (payload.new) {
          callback(payload.new as ChamaMessage)
        }
      }
    )
    .subscribe()

  // Return unsubscribe function
  return () => {
    supabase.removeChannel(channel)
  }
}

// Subscribe to real-time notifications
export const subscribeToNotifications = (userId: string, callback: (notification: Notification) => void) => {
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
        if (payload.new) {
          callback(payload.new as Notification)
        }
      }
    )
    .subscribe()

  // Return unsubscribe function
  return () => {
    supabase.removeChannel(channel)
  }
}

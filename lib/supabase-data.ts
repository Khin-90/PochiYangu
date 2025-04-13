import { supabase } from "./supabase"

// Transaction functions
export const getTransactions = async (userId: string, limit = 20) => {
  const { data, error } = await supabase
    .from("transactions")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false })
    .limit(limit)

  if (error) throw error
  return data
}

export const createTransaction = async (transactionData: any) => {
  const { data, error } = await supabase.from("transactions").insert(transactionData).select().single()

  if (error) throw error
  return data
}

// Chama contribution functions
export const getChamaContributions = async (chamaId: string) => {
  const { data, error } = await supabase
    .from("chama_contributions")
    .select("*")
    .eq("chama_id", chamaId)
    .order("due_date", { ascending: true })

  if (error) throw error
  return data
}

export const createChamaContribution = async (contributionData: any) => {
  const { data, error } = await supabase.from("chama_contributions").insert(contributionData).select().single()

  if (error) throw error
  return data
}

// Chama message functions
export const getChamaMessages = async (chamaId: string, limit = 50) => {
  const { data, error } = await supabase
    .from("chama_messages")
    .select("*")
    .eq("chama_id", chamaId)
    .order("created_at", { ascending: false })
    .limit(limit)

  if (error) throw error
  return data
}

export const sendChamaMessage = async (chamaId: string, userId: string, message: string) => {
  const { data, error } = await supabase
    .from("chama_messages")
    .insert({
      chama_id: chamaId,
      user_id: userId,
      message,
    })
    .select()
    .single()

  if (error) throw error
  return data
}

// Notification functions
export const getNotifications = async (userId: string, limit = 20) => {
  const { data, error } = await supabase
    .from("notifications")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false })
    .limit(limit)

  if (error) throw error
  return data
}

export const markNotificationAsRead = async (notificationId: string) => {
  const { data, error } = await supabase
    .from("notifications")
    .update({ is_read: true })
    .eq("id", notificationId)
    .select()
    .single()

  if (error) throw error
  return data
}

export const createNotification = async (notificationData: any) => {
  const { data, error } = await supabase.from("notifications").insert(notificationData).select().single()

  if (error) throw error
  return data
}

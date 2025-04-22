import { supabase } from "./supabase"

// Define types for transactions and contributions to improve type safety
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

// Transaction functions
export const getTransactions = async (userId: string, limit = 20): Promise<Transaction[]> => {
  const { data, error } = await supabase
    .from("transactions")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false })
    .limit(limit);

  if (error) throw new Error(`Error fetching transactions: ${error.message}`);
  return data as Transaction[];
}

export const createTransaction = async (transactionData: Transaction): Promise<Transaction> => {
  const { data, error } = await supabase.from("transactions").insert(transactionData).select().single();

  if (error) throw new Error(`Error creating transaction: ${error.message}`);
  return data as Transaction;
}

// Chama contribution functions
export const getChamaContributions = async (chamaId: string): Promise<ChamaContribution[]> => {
  const { data, error } = await supabase
    .from("chama_contributions")
    .select("*")
    .eq("chama_id", chamaId)
    .order("due_date", { ascending: true });

  if (error) throw new Error(`Error fetching chama contributions: ${error.message}`);
  return data as ChamaContribution[];
}

export const createChamaContribution = async (contributionData: ChamaContribution): Promise<ChamaContribution> => {
  const { data, error } = await supabase.from("chama_contributions").insert(contributionData).select().single();

  if (error) throw new Error(`Error creating chama contribution: ${error.message}`);
  return data as ChamaContribution;
}

// Chama message functions
export const getChamaMessages = async (chamaId: string, limit = 50): Promise<ChamaMessage[]> => {
  const { data, error } = await supabase
    .from("chama_messages")
    .select("*")
    .eq("chama_id", chamaId)
    .order("created_at", { ascending: false })
    .limit(limit);

  if (error) throw new Error(`Error fetching chama messages: ${error.message}`);
  return data as ChamaMessage[];
}

export const sendChamaMessage = async (chamaId: string, userId: string, message: string): Promise<ChamaMessage> => {
  const { data, error } = await supabase
    .from("chama_messages")
    .insert({
      chama_id: chamaId,
      user_id: userId,
      message,
    })
    .select()
    .single();

  if (error) throw new Error(`Error sending chama message: ${error.message}`);
  return data as ChamaMessage;
}

// Notification functions
export const getNotifications = async (userId: string, limit = 20): Promise<Notification[]> => {
  const { data, error } = await supabase
    .from("notifications")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false })
    .limit(limit);

  if (error) throw new Error(`Error fetching notifications: ${error.message}`);
  return data as Notification[];
}

export const markNotificationAsRead = async (notificationId: string): Promise<Notification> => {
  const { data, error } = await supabase
    .from("notifications")
    .update({ is_read: true })
    .eq("id", notificationId)
    .select()
    .single();

  if (error) throw new Error(`Error marking notification as read: ${error.message}`);
  return data as Notification;
}

export const createNotification = async (notificationData: Notification): Promise<Notification> => {
  const { data, error } = await supabase.from("notifications").insert(notificationData).select().single();

  if (error) throw new Error(`Error creating notification: ${error.message}`);
  return data as Notification;
}

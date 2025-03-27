import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = process.env.REACT_APP_SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.REACT_APP_SUPABASE_ANON_KEY;

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Signup with email and password
export const signUp = async (email, password) => {
  const { user, error } = await supabase.auth.signUp({ email, password });
  return { user, error };
};

// Login with email and password
export const signIn = async (email, password) => {
  const { user, error } = await supabase.auth.signInWithPassword({ email, password });
  return { user, error };
};

// Login with Google
export const signInWithGoogle = async () => {
  const { user, error } = await supabase.auth.signInWithOAuth({ provider: 'google' });
  return { user, error };
};

// Logout
export const signOut = async () => {
  const { error } = await supabase.auth.signOut();
  return { error };
};

// Get current user session
export const getUser = async () => {
  const { data: { user } } = await supabase.auth.getUser();
  return user;
};

export default supabase;

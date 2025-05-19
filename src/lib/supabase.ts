import { createClient } from '@supabase/supabase-js';
import { Database } from '../types/supabase';

const supabaseUrl = 'https://necvenxqlkkpflhbhcbf.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5lY3ZlbnhxbGtrcGZsaGJoY2JmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzY1MDAxMTksImV4cCI6MjA1MjA3NjExOX0.v7_ejdfWLLpKUiL2COpw9iKUaF7z1OngS08RIRpepVc';

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);
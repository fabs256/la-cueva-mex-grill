// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://ivirihiouynqvzmydrwt.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml2aXJpaGlvdXlucXZ6bXlkcnd0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDExMzk2ODQsImV4cCI6MjA1NjcxNTY4NH0.PvLSyHZkz64NRYUOAInlWxqB87pQnp9_PYExQzNP6Zo";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);
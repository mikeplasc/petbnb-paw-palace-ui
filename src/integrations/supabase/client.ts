// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://dcfhncdeurerzzvmlxuf.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRjZmhuY2RldXJlcnp6dm1seHVmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDg2NTgwNDcsImV4cCI6MjA2NDIzNDA0N30.6Cx1snV2MNP4bAQIG21LLw4vaNNGlaZymlX2MExfY5k";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);
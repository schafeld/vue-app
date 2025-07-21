import { createClient } from '@supabase/supabase-js'
import type { Database } from '../../database/types'

// Create a single supabase client for interacting with your database
// Environment variables are loaded from .env file outside the repo via Vite's configuration
// https://supabase.com/dashboard/project/yuzzrmawywyywsjlnwff/settings/api

export const supabase = createClient<Database>(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
)

// console.log('Supabase URL:', import.meta.env.VITE_SUPABASE_URL)
// console.log('Supabase Anon Key:', import.meta.env.VITE_SUPABASE_ANON_KEY)

// TODO: Set up row level security for Supabase

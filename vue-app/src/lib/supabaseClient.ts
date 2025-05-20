import { createClient } from '@supabase/supabase-js'
import type { Database } from '../../database/types'

// Create a single supabase client for interacting with your database
// export const supabase = createClient('your Supabase URL goes here', 'your Supabase anon-public key goes here')
// SERVICE_ROLE_KEY is deliberately set in folder outside of the repo (see /database/seed.js), so Copilot never has access to it and it doesn't get pushed to repository by accident.
// https://supabase.com/dashboard/project/yuzzrmawywyywsjlnwff/settings/api

export const supabase = createClient<Database>(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
)

// console.log(import.meta.env.VITE_SUPABASE_URL)
// console.log(import.meta.env.VITE_SUPABASE_ANON_KEY)

// TODO: Set up row level security for Supabase

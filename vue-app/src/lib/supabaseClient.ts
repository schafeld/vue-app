import { createClient } from '@supabase/supabase-js'

// Create a single supabase client for interacting with your database
export const supabase = createClient('https://yuzzrmawywyywsjlnwff.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl1enpybWF3eXd5eXdzamxud2ZmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQ2NTI0NjMsImV4cCI6MjA2MDIyODQ2M30.09HN4td3EgBWQNcvJhXPme5pGzG0n3pYaWDTzFVjVm8')
// TODO: Set up row level security for Supabase

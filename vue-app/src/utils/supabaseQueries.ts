import { supabase } from '@/lib/supabaseClient';
import type { QueryData } from '@supabase/supabase-js';

export const tasksWithProjectsQuery = supabase
  .from('tasks')
  .select(`
    *,
    projects (
      id,
      name,
      slug
    )
  `) // fetching task-related project data
  .order('created_at', { ascending: false });

export type TasksWithProjects = QueryData<typeof tasksWithProjectsQuery>;

export const projectsQuery = supabase
  .from('projects')
  .select('*')
  .order('created_at', { ascending: false });

export type Projects = QueryData<typeof projectsQuery>;

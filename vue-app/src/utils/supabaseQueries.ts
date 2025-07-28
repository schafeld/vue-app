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


export const singleProjectQuery = (slug: string) => supabase
  .from('projects')
  .select(`
    *,
    tasks(
      id,
      name,
      status,
      due_date
      )`
    )
    .eq('slug', slug)
    .single()

export type SingleProject = QueryData<ReturnType<typeof singleProjectQuery>>;

export const updateProjectQuery = (updatedProject = {}, id: string ) => {
  return supabase
    .from('projects')
    .update(updatedProject)
    .eq('id', id);
};

export const singleTaskQuery = (id: number) => supabase
  .from('tasks')
  .select(`
    *,
    projects (
      id,
      name,
      slug
    )
  `)
  .eq('id', id)
  .single();

export type SingleTask = QueryData<ReturnType<typeof singleTaskQuery>>;

export const profileQuery = ({ column, value }: {column: string, value: string }) => {
  return supabase
    .from('profiles')
    .select('*')
    .eq(column, value)
    .single();
}

export const profilesQuery = supabase.from('profiles')
  .select('id, full_name');

export const groupedProfilesQuery = (userIds: string[]) => {
  return supabase
    .from('profiles')
    .select('username, avatar_url, id, full_name')
    .in('id', userIds);
}

export type Collabs = QueryData<ReturnType<typeof groupedProfilesQuery>>;

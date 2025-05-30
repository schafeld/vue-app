drop table if exists projects;
drop type if exists current_status;

create type current_status as enum (
  'in-progress',
  'completed'
);

create table 
  projects (
    id uuid default gen_random_uuid() primary key,
    created_at timestamp with time zone default now(),
    name text not null,
    slug text unique not null,
    description text,
    status current_status default 'in-progress',
    collaborators text[] default '{}'::text[] not null
  );

-- Commented out. This migration is for setting up the initial schema for the projects table only.
-- insert into projects (name, slug, status, collaborators) values
--   ('Project 1', 'project-1', 'in-progress', '{"user1","user2"}'),
--   ('Project 2', 'project-2', 'completed', '{"user1","user3"}'),
--   ('Project 3', 'project-3', 'in-progress', '{"user2","user4"}'),
--   ('Project 4', 'project-4', 'completed', '{"user1","user5"}'),
--   ('Project 5', 'project-5', 'in-progress', '{"user3","user4"}');
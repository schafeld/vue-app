-- Fix projects.status to be NOT NULL
-- This migration makes the status column required for projects table,
-- ensuring it's never null and matches the tasks table behavior

-- First, update any existing rows that might have null status to the default
UPDATE projects 
SET status = 'in-progress'::current_status 
WHERE status IS NULL;

-- Now alter the column to be NOT NULL
ALTER TABLE projects 
ALTER COLUMN status SET NOT NULL;

export interface CreateNewTask {
  taskName: string;
  description: string;
  project_id: string; // UUID in database
  profile_id: string; // This will be mapped to collaborators array
}
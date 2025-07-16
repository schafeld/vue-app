import { projectsQuery, singleProjectQuery, updateProjectQuery } from "@/utils/supabaseQueries";
import { useMemoize } from "@vueuse/core";
import type { Projects, SingleProject } from "@/utils/supabaseQueries";

export const useProjectsStore = defineStore("projects-store", () => {
  const projects = ref<Projects | null>(null);
  const singleProject = ref<SingleProject | null>(null);
  const loading = ref(true);
  const error = ref<string | null>(null);
  const loadProjects = useMemoize(async (key: string) => await projectsQuery);
  const loadProject = useMemoize(async (slug: string) => await singleProjectQuery(slug));

  interface ValidateCacheParams  {
    ref: typeof projects | typeof singleProject;
    query: typeof projectsQuery | typeof singleProjectQuery;
    key: string;
    loaderFn: typeof loadProjects | typeof loadProject;
  }
  const validateCache = ({
    ref,
    query,
    key,
    loaderFn
  }: ValidateCacheParams) => {

    if (ref.value) {
      const actualQuery = typeof query === 'function' ? query(key) : query;

      actualQuery.then(({ data, error }) => {
        if (JSON.stringify(ref.value) === JSON.stringify(data)) {
          return;
        } else {
          loaderFn.delete(key); // Clear the cache for 'projects' or 'tasks' to force a fresh fetch
          if (!error && data) {
            ref.value = data; // Update projects with fresh data
          }
        }
      });
    }
  }

  const getProjects = async () => {

    projects.value = null; // Reset projects before fetching

    const { data, error: fetchError, status } = await loadProjects('projects');

    if (fetchError) {
      console.error("Error fetching projects:", fetchError);
      error.value = "Failed to load projects.";
      useErrorStore().setError({
        error: fetchError, // this is the PostgrestError type
        customCode: status,
      });
    } else {
      projects.value = data;
    }
    loading.value = false;

    validateCache(
      {
        ref: projects,
        query: projectsQuery,
        key: 'projects',
        loaderFn: loadProjects
      }
    );
  };


  const getSingleProject = async (slug: string) => {

    singleProject.value = null; // Reset singleProject before fetching

    const { data, error, status } = await loadProject(slug);

    if (error) {
      console.error("Error fetching project:", error);
      useErrorStore().setError({
        error,
        customCode: status,
      });
    }

    if (data) {
      singleProject.value = data;
    }

    validateCache(
      {
        ref: singleProject,
        query: singleProjectQuery,
        key: slug,
        loaderFn: loadProject
      }
    );
  };

  const updateProject = async () => {
    if (!singleProject.value) {
      console.error("No project to update");
      return;
    }

    const { tasks, id, slug, ...projectProperties } = singleProject.value; // Exclude tasks, id, and extract slug from the update

    try {
      const { data, error } = await updateProjectQuery(projectProperties, id);
      
      if (error) {
        console.error("Error updating project:", error);
        useErrorStore().setError({
          error,
          customCode: 500, // Generic error code for update failures
        });
        return;
      }

      console.log("Project updated successfully:", data);
      
      // Optionally refresh the project data to ensure UI is in sync
      await getSingleProject(slug);
    } catch (err) {
      console.error("Unexpected error updating project:", err);
    }
  }

    return {
      projects,
      getProjects,
      singleProject,
      getSingleProject,
      updateProject,
    };
  })

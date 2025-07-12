import { projectsQuery, singleProjectQuery } from "@/utils/supabaseQueries";
import { useMemoize } from "@vueuse/core";
import type { Projects, SingleProject } from "@/utils/supabaseQueries";
// import type { Tables } from "../../../database/types";

export const useProjectsStore = defineStore("projects-store", () => {
  const projects = ref<Projects>([]);
  const singleProject = ref<SingleProject>();
  const loading = ref(true);
  const error = ref<string | null>(null);
  const loadProjects = useMemoize(async (key: string) => await projectsQuery);
  const loadProject = useMemoize(async (slug: string) => await singleProjectQuery(slug));

  const validateCache = () => {
    if (projects.value?.length) {
      projectsQuery.then(({ data, error }) => {
        if (JSON.stringify(projects.value) === JSON.stringify(data)) {
          return;
        } else {
          loadProjects.delete('projects'); // Clear the cache for 'projects' to force a fresh fetch
          if (!error && data) {
            projects.value = data; // Update projects with fresh data
          }
        }
      });
    }
  }

  const getProjects = async () => {

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

    validateCache();
  };


  const getSingleProject = async (slug: string) => {
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
  };

    return {
      projects,
      getProjects,
      singleProject,
      getSingleProject,
    };
  })

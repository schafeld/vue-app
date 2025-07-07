import { projectsQuery } from "@/utils/supabaseQueries";
import { useMemoize } from "@vueuse/core";
import type { Projects } from "@/utils/supabaseQueries";
import type { Tables } from "../../../database/types";

export const useProjectsStore = defineStore("projects-store", () => {
  const projects = ref<Projects | null>(null);
  const loading = ref(true);
  const error = ref<string | null>(null);
  const loadProjects = useMemoize(async (key: string) => await projectsQuery);

  const validateCache = () => {
    if (projects.value?.length) {
      projectsQuery.then(({ data }) => {
        if (JSON.stringify(projects.value) === JSON.stringify(data)) {
          console.log("Cached and fresh projects data matched, skipping fetch.");
          return;
        } else {
          console.log("Cached projects data did not match fresh data, updating.");
          loadProjects.delete('projects'); // Clear the cache for 'projects' to force a fresh fetch
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
      projects.value = data as Tables<"projects">[];
    }
    loading.value = false;
  };

  validateCache();

  return {
    projects,
    // loading,
    // error,
    getProjects,
  };
})

import { projectsQuery } from "@/utils/supabaseQueries";
import { useMemoize } from "@vueuse/core";
import type { Projects } from "@/utils/supabaseQueries";
import type { Tables } from "../../../database/types";

export const useProjectsStore = defineStore("projects-store", () => {
  const projects = ref<Projects | null>(null);
  const loading = ref(true);
  const error = ref<string | null>(null);
  const loadProjects = useMemoize(async (key: string) => await projectsQuery);

  const getProjects = async () => {

    // if(projects.value?.length) {
    //   // If projects are already loaded, no need to fetch again
    //   return;
    // }

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

  return {
    projects,
    // loading,
    // error,
    getProjects,
  };
})

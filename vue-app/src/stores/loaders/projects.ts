import { projectsQuery } from "@/utils/supabaseQueries";
import type { Projects } from "@/utils/supabaseQueries";
import type { Tables } from "../../../database/types";

export const useProjectsStore = defineStore("projects-store", () => {
  const projects = ref<Projects | null>(null);
  const loading = ref(true);
  const error = ref<string | null>(null);

  const getProjects = async () => {
    const { data, error: fetchError, status } = await projectsQuery;

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

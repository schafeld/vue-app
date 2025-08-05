<script setup lang="ts">
import { tasksWithProjectsQuery } from "@/utils/supabaseQueries";
import type { TasksWithProjects } from "@/utils/supabaseQueries";
import { columns } from "@/utils/tableColumns/tasksColumns";

usePageStore().setPageTitle("Tasks");

const tasks = ref<TasksWithProjects | null>(null);
const loading = ref(true);
const error = ref<string | null>(null);

const getTasks = async () => {
  const { data, error: fetchError, status } = await tasksWithProjectsQuery;

  if (fetchError) {
    useErrorStore().setError({
      // error: "Failed to fetch tasks",
      error: fetchError, // this is the PostgrestError type
      customCode: status,
    });

    console.error("Error fetching tasks:", fetchError);
    error.value = "Failed to load tasks.";
  } else {
    tasks.value = data || [];
    error.value = null;
  }
  loading.value = false;
};

await getTasks();

// Simulate a generic error
// useErrorStore().setError({
//   error: new Error("Very odd thing happened"),
//   // customCode: 666,
// });
</script>

<template>
  <DataTable v-if="tasks" :columns="columns" :data="tasks" />
</template>

<style></style>

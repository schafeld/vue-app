<script setup lang="ts">
  import { tasksWithProjectsQuery } from '@/utils/supabaseQueries';
  import type { TasksWithProjects } from '@/utils/supabaseQueries';
  import { columns } from '@/utils/tableColumns/tasksColumns';

  usePageStore().pageData.title = 'Tasks';

  const tasks = ref<TasksWithProjects | null>(null);
  const loading = ref(true);
  const error = ref<string | null>(null);

  const getTasks = async () => {
    const { data, error: fetchError } = await tasksWithProjectsQuery;

    if (fetchError) {
      console.error('Error fetching tasks:', fetchError);
      error.value = 'Failed to load tasks.';
    } else {
      tasks.value = data || [];
      error.value = null;
    }
    loading.value = false;
  }

  await getTasks();
</script>

<template>
  <DataTable v-if="tasks" :columns="columns" :data="tasks" />
</template>

<style>
</style>

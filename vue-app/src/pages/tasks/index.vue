<template>
  <div class="tasks-view">
    <h1>Tasks</h1>

    <div v-if="loading">Loading tasks...</div>
    <div v-else-if="error">{{ error }}</div>
    <ul v-else>
      <li v-for="task in tasks" :key="task.id">
        <h2>
          {{ task.name }}
        </h2>
        <p>Status: {{ task.status }}</p>
        <p>Created at: {{ new Date(String(task.created_at)).toLocaleDateString() }}</p>
      </li>
      <li v-if="tasks.length === 0">
        <p>No tasks found.</p>
      </li>
    </ul>

    <p>
      <RouterLink to="/">Back to Home</RouterLink>
    </p>
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue';
import { supabase } from '@/lib/supabaseClient';
import type { Tables } from '../../../database/types';


  const tasks = ref<Tables<'tasks'>[]>([]);
  const loading = ref(true);
  const error = ref<string | null>(null);

  (async () => {
    const { data, error: fetchError } = await supabase
      .from('tasks')
      .select('*')
      .order('created_at', { ascending: false });

    if (fetchError) {
      console.error('Error fetching tasks:', fetchError);
      error.value = 'Failed to load tasks.';
    } else {
      tasks.value = data as Tables<'tasks'>[];
    }
    loading.value = false;
  })()


</script>

<style>
.tasks-view {
  text-align: center;
}
</style>

<template>
  <div class="projects-view">
    <h1>Projects</h1>

    <div v-if="loading">Loading projects...</div>
    <div v-else-if="error">{{ error }}</div>
    <ul v-else>
      <li v-for="project in projects" :key="project.id">
        <h2>
          <RouterLink :to="`/projects/${project.slug}`">{{ project.name }}</RouterLink>
        </h2>
        <p>Status: {{ project.status }}</p>
        <p>Created at: {{ new Date(String(project.created_at)).toLocaleDateString() }}</p>
      </li>
      <li v-if="projects.length === 0">
        <p>No projects found.</p>
      </li>
    </ul>

  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue';
import { supabase } from '@/lib/supabaseClient';
import type { Tables } from '../../../database/types';

  const projects = ref<Tables<'projects'>[]>([]);
  const loading = ref(true);
  const error = ref<string | null>(null);

  (async () => {
    const { data, error: fetchError } = await supabase
      .from('projects')
      .select('*')
      .order('created_at', { ascending: false });

    if (fetchError) {
      console.error('Error fetching projects:', fetchError);
      error.value = 'Failed to load projects.';
    } else {
      projects.value = data as Tables<'projects'>[];
    }
    loading.value = false;
  })()


</script>

<style>
</style>

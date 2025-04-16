<template>
  <div class="projects-view">
    <h1>Projects</h1>

    <div v-if="loading">Loading projects...</div>
    <div v-else-if="error">{{ error }}</div>
    <ul v-else>
      <li v-for="project in projects" :key="project.id">
        <h2>{{ project.name }}</h2>
        <p>{{ project.description }}</p>
        <p>Created at: {{ new Date(project.created_at).toLocaleDateString() }}</p>
      </li>
      <li v-if="projects.length === 0">
        <p>No projects found.</p>
      </li>
    </ul>

    <p>
      <RouterLink to="/">Back to Home</RouterLink>
    </p>
  </div>
</template>

<script setup lang="ts">
  import { ref, onMounted } from 'vue';
  import { supabase } from '@/lib/supabaseClient';

  interface Project {
    id: number;
    name: string;
    description: string;
    created_at: string;
  }

  const projects = ref<Project[]>([]);
  const loading = ref(true);
  const error = ref<string | null>(null);

  const getProjects = async (): Promise<void> => {
    try {
      const { data, error: supabaseError } = await supabase
        .from('projects')
        .select('*');

      if (supabaseError) {
        throw supabaseError;
      }

      projects.value = data as Project[];

      if (projects.value.length === 0) {
        console.log('No projects found');
      } else {
        console.log('Projects:', projects.value);
      }
    } catch (err) {
      console.error('Error fetching projects:', err);
      error.value = 'Failed to load projects';
    } finally {
      loading.value = false;
    }
  };

  onMounted(() => {
    getProjects();
  });
</script>

<style>
.projects-view {
  text-align: center;
}
</style>

<script setup lang="ts">
  import { useRoute } from 'vue-router';
  const route = useRoute();
  const params = route.params as { id: string };
</script>

<template>
  <div class="single-project-view">
    <h1 class="text-2xl">Single Task View</h1>
    <RouterLink to="/tasks">Back to Tasks</RouterLink>
    <div class="project-details bg-gray-900 p-6 rounded-lg shadow-sm my-4">
      <h2 class="xl my-2">Project Details</h2>
      <!-- Add project details here -->
      <p>Task: {{ params.id }}</p>
    </div>
  </div>
</template>

<style>
</style>

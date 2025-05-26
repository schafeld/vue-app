<script setup lang="ts">
  const route = useRoute();
  const params = route.params as { slug: string };
</script>

<template>
  <div class="single-project-view">
    <h1 class="text-2xl">Single Project View</h1>
    <RouterLink to="/projects">Back to Projects</RouterLink>
    <div class="project-details bg-gray-900 p-6 rounded-lg shadow-sm my-4">
      <h2 class="xl my-2">Project Details</h2>
      <!-- Add project details here -->
      <p>Project: {{ params.slug }}</p>
    </div>
  </div>
</template>

<style>
</style>

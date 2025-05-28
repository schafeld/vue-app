<script setup lang="ts">
  const route = useRoute();
  const params = route.params as { id: string };

  usePageStore().pageData.title = 'Single Task View';
</script>

<template>
  <div class="single-project-view">
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

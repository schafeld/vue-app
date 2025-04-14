<template>
  <div class="single-project-view">
    <h1>Single Project View</h1>
    <RouterLink to="/projects">Back to Projects</RouterLink>
    <div class="project-details">
      <h2>Project Details</h2>
      <!-- Add project details here -->
      <p>Project ID: {{ route.params?.id }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { useRoute } from 'vue-router';
  const route = useRoute();
</script>

<style>
  .single-project-view {
    text-align: center;
  }
</style>

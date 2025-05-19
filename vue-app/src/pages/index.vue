<template>
  <div class="home-view">
    <h1>Welcome to HomeView</h1>
    <p>
      <RouterLink to="/projects">Go to Projects</RouterLink>
    </p>
    <p>
      <RouterLink to="/tasks">Go to Tasks</RouterLink>
    </p>
    <p>
      <RouterLink to="/builder">Go to Builder</RouterLink>
    </p>
  </div>
</template>

<script setup lang="ts">
</script>

<style scoped>
.home-view {
  text-align: center;
}
</style>

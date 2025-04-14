<template>
  <div class="projects-view">
    <h1>Projects</h1>
    <ul>
      <li>
        <RouterLink :to="{ name: '/projects/[id]', params: { id: 1 } }">Project 1</RouterLink>
      </li>
      <li>
        <RouterLink :to="{ name: '/projects/[id]', params: { id: 2 } }">Project 2</RouterLink>
      </li>
      <li>
        <RouterLink :to="{ name: '/projects/[id]', params: { id: 3 } }">Project 3</RouterLink>
      </li>
    </ul>
    <p>
      <RouterLink to="/">Back to Home</RouterLink>
    </p>

  </div>
</template>

<script setup lang="ts">
</script>

<style>
.projects-view {
  text-align: center;
}
</style>

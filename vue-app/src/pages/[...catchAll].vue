<template>
  <div class="not-found-view">
    <h1>404 Not Found</h1>
    <p>The page "{{ route.path }}" you are looking for does not exist.</p>

    <p>
      <RouterLink to="/">Back to Home</RouterLink>
    </p>
  </div>
</template>

<script setup lang="ts">
  const route = useRoute();
</script>

<style>
  .not-found-view {
    text-align: center;
  }
  .not-found-view h1 {
    color: red;
  }
  .not-found-view a {
    color: blue;
    text-decoration: underline;
  }
</style>

<script setup lang="ts">
  const route = useRoute();

  usePageStore().pageData.title = '404 Not Found';
</script>

<template>
  <div class="not-found-view">

    <p>The page "{{ route.path }}" you are looking for does not exist.</p>

    <p>
      Go <RouterLink to="/">
      back to Home
      </RouterLink>.
    </p>
  </div>
</template>



<style>
  .not-found-view h1 {
    color: red;
  }
  .not-found-view a {
    text-decoration: underline;
  }
</style>

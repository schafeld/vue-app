<script setup lang="ts">
// import AppErrorPage from "@/components/AppError/AppErrorPage.vue";
import { useErrorStore } from "@/stores/error";

usePageStore().setPageTitle("404 Not Found");
useErrorStore().setError({
  error: "Page not found",
  customCode: 404,
});
</script>

<template>
  <AppErrorPage />
</template>

<style scoped>
/* @reference "@/index.css"; */
</style>

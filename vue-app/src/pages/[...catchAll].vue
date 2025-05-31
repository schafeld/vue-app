<script setup lang="ts">
// import AppErrorPage from "@/components/AppError/AppErrorPage.vue";
import { useErrorStore } from "@/stores/error";

// usePageStore().pageData.title = "404 Not Found";
useErrorStore().setError();
</script>

<template>
  <AppErrorPage />
</template>

<style scoped>
/* @reference "@/index.css"; */
</style>

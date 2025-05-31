<script setup lang="ts">
import { useErrorStore } from "@/stores/error";
const { activeError } = storeToRefs(useErrorStore());
</script>

<template>
  <AuthLayout>
    <AppErrorPage v-if="activeError" />

    <RouterView v-else v-slot="{ Component, route }">
      <Suspense v-if="Component" :timeout="0">
        <Component :is="Component" :key="route.name" />
        <template #fallback>
          <div class="loading flex items-center justify-center">Loading...</div>
        </template>
      </Suspense>
    </RouterView>
  </AuthLayout>
</template>

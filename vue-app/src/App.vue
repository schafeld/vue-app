<script setup lang="ts">
import { useErrorStore } from "@/stores/error";
import { supabase } from "./lib/supabaseClient";
import { Component } from "lucide-vue-next";

const errorStore = useErrorStore();

onErrorCaptured((err, instance, info) => {
  errorStore.setError({
    error: err,
    // customCode: 500, // optional
  });
  console.error("Error captured:", err);
  console.warn("Error info: ", info);
  console.warn("Error instance: ", instance);
});

onMounted(() => {
  useAuthStore().trackAuthChanges();
});

const { user } = storeToRefs(useAuthStore());

const AuthLayout = defineAsyncComponent(() => import('./components/layout/main/AuthLayout.vue'));
const GuestLayout = defineAsyncComponent(() => import('./components/layout/main/GuestLayout.vue'));
</script>

<template>
  <Component :is="user ? AuthLayout : GuestLayout">
    <AppErrorPage v-if="errorStore.activeError" />

    <RouterView v-else v-slot="{ Component, route }">
      <Suspense v-if="Component" :timeout="0">
        <Component :is="Component" :key="route.name" />
        <template #fallback>
          <div class="loading flex items-center justify-center">Loading...</div>
        </template>
      </Suspense>
    </RouterView>
  </Component>
</template>

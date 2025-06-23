<script setup lang="ts">
import { useErrorStore } from "@/stores/error";
import { supabase } from "./lib/supabaseClient";

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
  supabase.auth.onAuthStateChange((event, session) => {
    setTimeout(async () => {
      await useAuthStore().setAuth(session);
    }, 0);
  });
});
</script>

<template>
  <AuthLayout>
    <AppErrorPage v-if="errorStore.activeError" />

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

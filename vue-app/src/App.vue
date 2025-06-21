<script setup lang="ts">
import { useErrorStore } from "@/stores/error";
import { useAuthStore } from "@/stores/auth";
import { supabase } from "./lib/supabaseClient";

const errorStore = useErrorStore();
const authStore = useAuthStore();

onErrorCaptured((err, instance, info) => {
  errorStore.setError({
    error: err,
    // customCode: 500, // optional
  });
  console.error("Error captured:", err);
  console.warn("Error info: ", info);
  console.warn("Error instance: ", instance);
});

onMounted(async () => {
  const { data } = await supabase.auth.getSession();
  if (data.session?.user) {
    await authStore.setAuth(data.session);
  }
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

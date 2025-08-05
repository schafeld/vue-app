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
  <Transition name="fade" mode="out-in">
    <Component :is="user ? AuthLayout : GuestLayout" :key="user?.id">
      <AppErrorPage v-if="errorStore.activeError" />
      <RouterView v-else v-slot="{ Component, route }">
        <Transition name="fade" mode="out-in">
          <div class="w-full suspense-transition-wrapper" :key="route.path">
            <Suspense v-if="Component" :timeout="0">
              <Component :is="Component" />
              <template #fallback>
                <div
                  class="absolute top-1/2 transform -translate-y-1/2 left-1/2 -translate-x-1/2 flex justify-center items-center w-full h-screen bg-background bg-opacity-90 z-50"
                >
                  <iconify-icon icon="lucide:loader-circle" class="text-6xl animate-spin" />
                </div>
              </template>
            </Suspense>
          </div>
        </Transition>
      </RouterView>
    </Component>
  </Transition>
</template>

<script setup lang="ts">
  import { useRoute } from 'vue-router';
  import { Button } from '@/components/ui/button'
  import TopNavbar from '@/components/Layout/TopNavbar.vue'
  import Sidebar from '@/components/Layout/Sidebar.vue';

  const route = useRoute();
</script>

<template>
  <Sidebar />
  <div class="content-area flex flex-col lg:ml-52 ml-16 transition-[margin]">
    <TopNavbar />
    <main class="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
      <div class="flex items-center">
        <h1 class="text-lg font-semibold md:text-2xl">
          <RouterLink :to="route.path" class="text-muted-foreground">
            {{ route.meta.title }}
          </RouterLink>
        </h1>
        </div>
      <slot />
    </main>

    <div v-if="route.path !== '/'" class="my-5 flex flex-col items-center">
      <RouterLink to="/">
      <Button>Back to home</Button>
      </RouterLink>
    </div>
  </div>
</template>




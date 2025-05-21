<script setup lang="ts">
  import { useRoute } from 'vue-router';
  import { Button } from '@/components/ui/button'
import TopNavbar from '@/components/layout/TopNavbar.vue'
  import Sidebar from './components/layout/Sidebar.vue';

  const route = useRoute();
</script>

<template>
  <Sidebar />
  <div class="flex flex-col lg:ml-52 ml-16 transition-[margin]">
    <TopNavbar />
    <main>
      <RouterView />
    </main>

    <div v-if="route.path !== '/'" class="my-5 flex flex-col items-center">
      <RouterLink to="/">
      <Button>Back to home</Button>
      </RouterLink>
    </div>
  </div>
</template>




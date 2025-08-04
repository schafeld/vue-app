<script setup lang="ts">
  import { menuKey } from '@/utils/injectionKeys';
  import { useRoute } from 'vue-router';

  const route = useRoute();

  const { pageData } = storeToRefs(usePageStore());

  const taskSheetOpen = ref(false); 

  const isMenuOpen = ref(false);
  const toggleMenu = () => {
    isMenuOpen.value = !isMenuOpen.value;
  };

  provide(menuKey, {
    isMenuOpen,
    toggleMenu,
  });
</script>

<template>
  <Sidebar @open-new-task="taskSheetOpen = true" />
  <AppNewTask v-model="taskSheetOpen" />

  <div 
    class="content-area flex flex-col transition-[margin]"
    :class="{ 'ml-52': isMenuOpen, 'ml-24': !isMenuOpen }"
  >
    <TopNavbar />
    <main class="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
      <div class="flex items-center">
        <h1 class="text-lg font-semibold md:text-2xl">
          {{ pageData.title }}
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




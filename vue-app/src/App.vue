<script setup lang="ts">
import { supabase } from '@/lib/supabaseClient';
import { Button } from '@/components/ui/button'
import { useRoute } from 'vue-router';

const route = useRoute();
console.log( supabase);
</script>

<template>
  <main>
    <RouterView />
    <div v-if="route.path !== '/'" class="mt-5 flex flex-col items-center">
      <RouterLink to="/">
      <Button>Back to home</Button>
      </RouterLink>
    </div>
  </main>
</template>

<style scoped>
</style>

<script setup lang="ts">
import { supabase } from '@/lib/supabaseClient';
import { Button } from '@/components/ui/button'

  console.log( supabase);
</script>

<template>
  <main>
    <RouterView />
    <Button>Click me</Button>
  </main>
</template>

<style scoped>
</style>

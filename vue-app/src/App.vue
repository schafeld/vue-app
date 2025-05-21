<script setup lang="ts">
import { supabase } from '@/lib/supabaseClient';
import { Button } from '@/components/ui/button'
import { useRoute } from 'vue-router';
import Input from './components/ui/input/Input.vue';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

const route = useRoute();
console.log( supabase);
</script>

<template>
  <main>
    <nav class="flex justify-between items-center p-4 border-b bg-muted/40 text-white">
      <h1 class="text-xl font-bold">Olli's Vue App</h1>
      <div>
        <RouterLink to="/" class="mr-4">Home</RouterLink>
        <RouterLink to="/projects" class="mr-4">Projects</RouterLink>
        <RouterLink to="/tasks" class="mr-4">Tasks</RouterLink>
        <RouterLink to="/builder" class="mr-4">Builder</RouterLink>
      </div>
      <form class="w-full max-w-96">
      <Input class="w-full pl-8 bg-background" type="text" placeholder="Search ..." />
    </form>

    <DropdownMenu>
    <DropdownMenuTrigger>
      <div class="avatar w-8 h-8 rounded-full bg-white"></div>
    </DropdownMenuTrigger>
    <DropdownMenuContent>
      <DropdownMenuLabel>My Account</DropdownMenuLabel>
      <DropdownMenuSeparator />
      <DropdownMenuItem>Profile</DropdownMenuItem>
      <DropdownMenuItem>Billing</DropdownMenuItem>
      <DropdownMenuItem>Team</DropdownMenuItem>
      <DropdownMenuItem>Subscription</DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
    </nav>
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

<script setup lang="ts">
import { useDark, useToggle } from '@vueuse/core';

const { profile } = storeToRefs(useAuthStore())

const isDark = useDark();
const toggleDark = useToggle(isDark);
</script>

<template>
  <nav class="h-16 bg-muted/40 flex gap-2 px-6 items-center">
    <form class="relative h-fit w-full max-w-96">
      <iconify-icon
        class="absolute top-[50%] translate-y-[-50%] left-2.5 text-muted-foreground"
        icon="lucide:search"
      ></iconify-icon>
      <Input class="w-full pl-8 bg-background" type="text" placeholder="Search ..." />
    </form>

    <div class="flex justify-center items-center gap-1 toggle-dark-mode ml-auto">
      <Button
        @click="toggleDark()"
        class="p-2 w-8 h-8"
        :style="{ backgroundColor: isDark ? 'var(--muted)' : '#f3f3f3', color: isDark ? '#f3f3f3' : 'var(--muted-foreground)' }"
      >
        <Transition name="scale" mode="out-in">
          <iconify-icon v-if="isDark" icon="lucide:sun"></iconify-icon>
          <iconify-icon v-else icon="lucide:moon"></iconify-icon>
        </Transition>
      </Button>
    </div>

    <div class="w-8 stabilizing-wrapper">
      <DropdownMenu v-if="profile">
        <DropdownMenuTrigger>
          <Avatar class="border border-gray-500">
            <AvatarImage src="https://avatars.githubusercontent.com/u/5053821?v=4" alt="Olli"/>
            <AvatarFallback>OS</AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <RouterLink 
              :to="{ 
                name: '/users/[username]',
                params: { username: profile.username }
              }"
              class="w-full h-full">
              Profile
            </RouterLink>
          </DropdownMenuItem>
          <DropdownMenuItem>Billing</DropdownMenuItem>
          <DropdownMenuItem>Team</DropdownMenuItem>
          <DropdownMenuItem>Subscription</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  </nav>
</template>

<style scoped>
.scale-enter-active, .scale-leave-active {
  transition: transform 0.2s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.2s;
}
.scale-enter-from, .scale-leave-to {
  transform: scale(0.8);
  opacity: 0;
}
.scale-enter-to, .scale-leave-from {
  transform: scale(1);
  opacity: 1;
}
</style>

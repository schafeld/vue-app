<script setup lang="ts">
interface LinkProp {
  title: string;
  to?: string;
  icon: string;
}

defineProps<{
  links: LinkProp[];
}>();

const emits = defineEmits<{
  (e: "link-click", title: string): void;
}>();

const emitLinkClicked = (title: string) => {
  emits("link-click", title);
};

const { isMenuOpen } = useMenu();
</script>

<template>
  <template v-for="link in links" :key="link.title">
    <RouterLink
      v-if="link.to"
      :key="link.title"
      :to="link.to"
      class="nav-link"
      :class="{ 'justify-center': !isMenuOpen, 'justify-normal': isMenuOpen }"
      active-class="bg-accent text-primary font-medium"
      exact-active-class="bg-accent text-primary font-medium"
      exact
    >
      <iconify-icon :icon="link.icon"></iconify-icon>
      <span 
        class="text-nowrap"
        :class="{ 'block': isMenuOpen, 'hidden': !isMenuOpen }"
      >{{ link.title }}</span>
    </RouterLink>
    <div 
      v-else 
      class="nav-link cursor-pointer"
      :class="{ 'justify-normal': !isMenuOpen, 'justify-center': isMenuOpen }" 
      @click="emitLinkClicked(link.title)"
    >
      <iconify-icon :icon="link.icon"></iconify-icon>
      <span 
        class="text-nowrap"
        :class="{ 'block': isMenuOpen, 'hidden': !isMenuOpen }"
      >{{ link.title }}</span>
    </div>
  </template>
</template>

<style scoped>
@reference "@/index.css";

.nav-link {
  @apply flex items-center gap-3 px-4 py-2 mx-2 transition-colors rounded-lg hover:text-primary text-muted-foreground;
}
</style>

<template>
  <div v-editable="blok" class="page">
    <StoryblokComponent
      v-for="blok in blok.body"
      :key="blok._uid"
      :blok="blok"
    />
  </div>
</template>

<script setup lang="ts">
interface Props {
  blok: {
    _uid: string
    component: string
    body: any[]
    _editable?: string
  }
}

const props = defineProps<Props>()

// Debug: Log when Page component is rendered
console.log('Page component rendered with:', props.blok)
</script>

<style scoped>
/* Add your page styles here if needed */
</style>

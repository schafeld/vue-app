<template>
  <div v-editable="blok" class="teaser bg-gray-50 p-6 rounded-lg shadow-md">
    <h2 v-if="blok.headline" class="text-2xl font-bold mb-4 text-gray-800">
      {{ blok.headline }}
    </h2>
    <p v-if="blok.First_Teaser" class="text-gray-600 leading-relaxed">
      {{ blok.First_Teaser }}
    </p>
  </div>
</template>

<script setup lang="ts">
interface Props {
  blok: {
    _uid: string
    component: string
    headline?: string
    First_Teaser?: string
    _editable?: string
  }
}

const props = defineProps<Props>()

// Debug: Log when Teaser component is rendered
console.log('Teaser component rendered with:', props.blok)
</script>

<style scoped>
.teaser {
  margin-bottom: 1rem;
}
</style>

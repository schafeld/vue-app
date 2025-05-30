<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@/lib/utils'

const props = defineProps<{
  class?: HTMLAttributes['class']
}>()
</script>

<template>
  <!--  [&_tr]:border-b  -->
  <thead
    data-slot="table-header"
    :class="cn('', props.class)"
  >
    <slot />
  </thead>
</template>

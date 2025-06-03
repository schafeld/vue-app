<script lang="ts" setup>
import type { CustomError } from "@/types/Error";

defineProps<{
  message: string;
  customCode?: number;
  error?: CustomError | null;
}>();
</script>

<template>
  <section class="error">
    <div>
      <iconify-icon icon="lucide:triangle-alert" class="error__icon" />
      <h1 class="error__code" v-if="customCode">{{ customCode }}</h1>
      <p class="error__msg">{{ message }}</p>
      <div class="error-footer">
        <p class="error-footer__text">You'll find lots to explore on the home page.</p>
        <RouterLink to="/">
          <Button class="max-w-36"> Back to homepage </Button>
        </RouterLink>
      </div>
    </div>
  </section>
</template>

<style scoped></style>

<script lang="ts" setup>
import type { CustomError } from "@/types/Error";

const props = defineProps<{
  statusCode?: number;
  message: string;
  customCode?: number;
  // error?: CustomError | null;
  isCustomError: boolean;
}>();

const error = ref({
  message: "Unfortunately, an unexpected error occurred. We're so, so sorry.",
  code: 500,
});

if (props.isCustomError) {
  error.value.code = props.customCode ?? 500;
  error.value.message = props.message;
}

if (props.statusCode === 406) {
  error.value.code = 404;
  error.value.message = "The page you are looking for does not exist.";
}
</script>

<template>
  <section class="error">
    <div>
      <iconify-icon icon="lucide:triangle-alert" class="error__icon" />
      <h1 class="error__code">{{ error.code }}</h1>
      <p class="error__msg">{{ error.message }}</p>
      <div class="error-footer">
        <p class="error-footer__text">You'll find lots to explore on the home page.</p>
        <RouterLink to="/">
          <Button class="max-w-36"> Back to homepage </Button>
        </RouterLink>
      </div>
      <p>Custom Error: {{ props.isCustomError }}</p>
    </div>
  </section>
</template>

<style scoped></style>

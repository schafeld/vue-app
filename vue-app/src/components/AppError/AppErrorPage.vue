<script lang="ts" setup>
import { useErrorStore } from "@/stores/error";
import AppErrorDevSection from "@/components/AppError/AppErrorDevSection.vue";
import AppErrorProdSection from "./AppErrorProdSection.vue";

const router = useRouter();
const errorStore = useErrorStore();
const error = ref(errorStore.activeError);
const message = ref("");
const customCode = ref(0);

if (error.value) {
  message.value = error.value.message;
  customCode.value = error.value.customCode ?? 0;
}

router.afterEach(() => {
  errorStore.clearError();
});
</script>

<template>
  <AppErrorDevSection :message :customCode :error />
  <!-- <AppErrorProdSection
    :message
    :customCode
    :error
    :isCustomError="errorStore.isCustomError"
  /> -->
</template>

<style>
@reference "@/index.css";

.error {
  @apply mx-auto flex justify-center items-center flex-1 p-10 text-center -mt-20 min-h-[90vh];
}

.error__icon {
  @apply text-7xl text-destructive;
}

.error__code {
  @apply font-extrabold text-7xl text-secondary;
}

.error__msg {
  @apply text-3xl font-extrabold text-primary;
}

.error-footer {
  @apply flex flex-col items-center justify-center gap-5 mt-6 font-light;
}

.error-footer__text {
  @apply text-lg text-muted-foreground;
}

p {
  @apply my-2;
}
</style>

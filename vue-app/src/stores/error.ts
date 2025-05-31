export const useErrorStore = defineStore('error-store', () => {
  const activeError = ref<boolean | null>(null);

  const setError = () => {
    activeError.value = true;
  }

  const clearError = () => {
    activeError.value = false;
  }

  return {
    activeError,
    setError,
    clearError,
  }
});

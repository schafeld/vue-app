import type { CustomError } from '@/types/Error';

export const useErrorStore = defineStore('error-store', () => {
  const activeError = ref<null | CustomError>(null);

  const setError = ({ error, customCode }: {error:string, customCode: number}) => {
    // activeError.value = true;
    activeError.value = Error(error);
    activeError.value.customCode = customCode;
  }

  const clearError = () => {
    activeError.value = null;
  }

  return {
    activeError,
    setError,
    clearError,
  }
});

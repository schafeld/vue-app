import type { CustomError } from '@/types/Error';
import type { PostgrestError } from '@supabase/supabase-js';

export const useErrorStore = defineStore('error-store', () => {
  const activeError = ref<null | CustomError>(null);

  const setError = ({ error, customCode }: {error:string | PostgrestError | Error , customCode?: number}) => {
    const message = typeof error === 'string' ? error : error.message;
    activeError.value = Error(message);
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

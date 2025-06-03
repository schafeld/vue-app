import type { CustomError } from '@/types/Error';
import { PostgrestError } from '@supabase/supabase-js';

export const useErrorStore = defineStore('error-store', () => {
  const activeError = ref<null | CustomError>(null);
  const isCustomError = ref<boolean>(false);

  const setError = ({ error, customCode }: {error:string | PostgrestError | Error , customCode?: number}) => {
    const message = typeof error === 'string' ? error : error.message;
    activeError.value = Error(message);
    activeError.value.customCode = customCode;

    if (typeof error === 'string') {
      // console.log('TYPE of error is: ', typeof error);
      isCustomError.value = true;
    }
  }

  const clearError = () => {
    activeError.value = null;
    isCustomError.value = false;
  }

  return {
    activeError,
    setError,
    clearError,
    isCustomError
  }
});

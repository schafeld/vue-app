import type { LoginForm } from "@/types/AuthForm";
import type { AuthError } from "@supabase/supabase-js";

export const useFormErrors = () => {
  const serverError = ref<string | null>(null);
  const realtimeErrors = ref();

  const handleServerError = (error: AuthError) => {
    serverError.value =
      error.message === "Invalid login credentials"
        ? "Invalid email or password"
        : error.message;
  }

  const handleLoginForm = async (formData: LoginForm) => {
    realtimeErrors.value = {
      email: [],
      password: [],
    }

    const { validateEmail, validatePassword } = await import("@/utils/formValidations");

    const emailErrors = validateEmail(formData.email);
    if (emailErrors && emailErrors.length) {
      realtimeErrors.value.email = emailErrors;
    }

    const passwordErrors = validatePassword(formData.password);
    if (passwordErrors && passwordErrors.length) {
      realtimeErrors.value.password = passwordErrors;
    }
  }

  return {
    serverError,
    handleServerError,
    realtimeErrors,
    handleLoginForm,
  }
}

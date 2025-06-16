import { supabase } from "@/lib/supabaseClient";
import type { LoginForm, RegisterForm } from "@/types/AuthForm";

export const register = async (formData: RegisterForm) => {
  const { data, error } = await supabase.auth.signUp({
    email: formData.email,
    password: formData.password,
  });
  const router = useRouter();

  if (error) {
    console.error("Registration error: ", error);
    return;
  }

  if (data.user) {
    const { error } = await supabase.from('profiles').insert({
      id: data.user.id,
      username: formData.username,
      full_name: `${formData.firstName} ${formData.lastName}`,
    });

    if (error) {
      console.error("Profile creation error: ", error);
      return;
    }
  }
  return true;
}


export const login = async (formData: LoginForm) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email: formData.email,
    password: formData.password,
  });

  if (error) {
    console.error("Error logging in:", error.message);
    return;
  }

  return true;
};

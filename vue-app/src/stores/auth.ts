import { profileQuery } from "@/utils/supabaseQueries";
import type { Session, User } from "@supabase/supabase-js";
import type { Tables } from "database/types";
import { supabase } from "@/lib/supabaseClient";

export const useAuthStore = defineStore("auth-store", () => {
  const user = ref<null | User>(null);
  const profile = ref<null | Tables<"profiles">>(null);
  const isTrackingAuthChanges = ref(false);
  const isLoadingProfile = ref(false);

  const _setProfile = async () => {
    if (!user.value) {
      profile.value = null;
      return;
    }

    // Prevent multiple simultaneous profile fetches
    if (isLoadingProfile.value) {
      return;
    }

    // Only fetch if we don't have the profile or it's for a different user
    if (!profile.value || profile.value.id !== user.value.id) {
      isLoadingProfile.value = true;
      try {
        const { data } = await profileQuery({ column: 'id', value: user.value.id });
        profile.value = data || null;
      } finally {
        isLoadingProfile.value = false;
      }
    }
  }

  const setAuth = async (userSession: null| Session = null) => {
    if(!userSession) {
      user.value = null;
      profile.value = null;
      return;
    }

    // Only update if the user actually changed
    if (user.value?.id !== userSession.user.id) {
      user.value = userSession.user;
      await _setProfile();
    }
  }

  const getSession = async () => {
    // Only get session if we don't already have a user
    if (user.value) {
      return;
    }

    const { data } = await supabase.auth.getSession();
    if (data.session?.user) {
      await setAuth(data.session);
    }
  }

  const trackAuthChanges = () => {

    if (isTrackingAuthChanges.value) {
      return
    }
    isTrackingAuthChanges.value = true;

    supabase.auth.onAuthStateChange((event, session) => {
      setTimeout(async () => {
        await setAuth(session);
      }, 0);
    });
  }

  return {
    user,
    profile,
    setAuth,
    getSession,
    trackAuthChanges
  };
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useAuthStore, import.meta.hot))
}

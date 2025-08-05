<script setup lang="ts">
import type { Tables } from "database/types";
import { profileQuery } from "@/utils/supabaseQueries";

const { username } = useRoute("/users/[username]").params;

usePageStore().setPageTitle(`User: ${username}`); // without this the headline might show the project name of the page that linked to user profile

const profile = ref<Tables<"profiles"> | null>(null);
const loading = ref(true);

const getProfile = async () => {
  if (profile.value) return; // Prevent multiple calls if data already exists

  loading.value = true;
  const { data, error, status } = await profileQuery({
    column: "username",
    value: username,
  });

  if (error) {
    console.error("Error fetching profile:", error);
    useErrorStore().setError({
      error,
      customCode: status,
    });
    profile.value = null;
  } else {
    profile.value = data;
  }
  loading.value = false;
};

onMounted(() => {
  getProfile();
});
</script>

<template>
  <div
    class="mx-auto mb-10 flex w-full flex-col items-center justify-center py-10 text-center"
  >
    <div class="flex flex-col items-center justify-center pb-4">
      <Avatar size="lg">
        <AvatarImage :src="profile?.avatar_url || ''" alt="@radix-vue" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>

      <p class="mt-2 text-gray-500">{{ profile?.username }}</p>
      <h1 class="mt-5 text-4xl font-bold">{{ profile?.full_name }}</h1>
      <p class="mt-2 text-sm">{{ profile?.bio }}</p>
    </div>
    <Button>Edit profile</Button>
  </div>
</template>

<script setup lang="ts">
  const route = useRoute();
  const router = useRouter();
  const params = route.params as { slug: string };

  usePageStore().pageData.title = 'Single Project View';

  const goBack = () => {
    if (router.options.history.state.back) {
      router.back();
    } else {
      router.push('/projects');
    }
  };
</script>

<template>
  <div class="single-project-view">
    <!-- sub navigation inline link list -->
    <div class="sub-nav inline-flex items-center gap-4">
      <!-- <RouterLink to="/projects" class="hover:underline">Projects Overview</RouterLink> -->
      <button @click="goBack" class="hover:underline cursor-pointer">Go Back</button>
    </div>

    <div class="project-details bg-gray-900 p-6 rounded-lg shadow-sm my-4">
      <h2 class="xl my-2">Project Details</h2>
      <!-- Add project details here -->
      <p>Project: {{ params.slug }}</p>
    </div>
  </div>
</template>

<style>
</style>

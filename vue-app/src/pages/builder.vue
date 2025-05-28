<script setup lang="ts">
import type { BuilderContent } from '@builder.io/sdk-vue';
import { Content, fetchOneEntry, isPreviewing } from '@builder.io/sdk-vue';
import { usePageStore } from '@/stores/page';

usePageStore().pageData.title = 'CMS Page with Builder.io';

const content = ref<BuilderContent | null>(null);
// Add your Public API Key below
const apiKey = '1773a318659b4dcab937f955f6ec3839';
const canShowContent = ref(false);
const model = 'page';

onMounted(async () => {
  content.value = await fetchOneEntry({
    model,
    apiKey,
    userAttributes: {
      urlPath: window.location.pathname,
    },
  });
  canShowContent.value = content.value ? true : isPreviewing();
});
</script>

<template>
  <div class="flex flex-col items-center justify-center">
    <h1 class="text-2xl font-bold">Builder.io Page</h1>
    <p class="mt-4 text-gray-600">This is a page built with Builder.io</p>
    <Content
      v-if="canShowContent"
      :model="model"
      :content="content"
      :api-key="apiKey"
    />
    <div v-else>Content not Found</div>
  </div>
</template>

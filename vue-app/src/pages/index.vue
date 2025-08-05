<script setup lang="ts">
import { usePageStore } from '@/stores/page';
import { useStoryblok } from '@storyblok/vue';
import { unref } from 'vue';

usePageStore().setPageTitle('Homepage');

const storyData = await useStoryblok('first-story', { version: 'draft' });
const story = unref(storyData);

// Debug: Log the story data
console.log('Story data:', story);
console.log('Story content:', story?.content);
</script>

<template>
  <div class="home-view">
    <h1>Welcome to HomeView</h1>
    <p>
      <RouterLink to="/projects">Go to Projects</RouterLink>
    </p>
    <p>
      <RouterLink to="/tasks">Go to Tasks</RouterLink>
    </p>
    <p>
      <RouterLink to="/builder">Go to Builder</RouterLink>
    </p>
  </div>

  <div class="storyblok-content">
    <div v-if="!story" class="loading">Loading story...</div>
    <div v-else-if="!story.content" class="error">No story content available</div>
    <div v-else>
      <!-- <h3>Debug: Story Content</h3>
      <pre>{{ JSON.stringify(story.content, null, 2) }}</pre>
      <h3>Rendered Content:</h3> -->
      <StoryblokComponent :blok="story.content" />
    </div>
  </div>
</template>

<style scoped>
</style>

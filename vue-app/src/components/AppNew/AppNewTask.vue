<script setup lang="ts">
import type { CreateNewTask } from '@/types/CreateNewForm';
import { projectsQuery, profilesQuery } from '@/utils/supabaseQueries';
const sheetOpen = defineModel<boolean>();

type SelectOption = {
  label: string;
  value: number | string;
};

const selectOptions = ref({
  projects: [] as SelectOption[],
  profiles: [] as SelectOption[]
});

const getProjectsOptions = async () => {
  const { data: allProjects } = await projectsQuery;

  if(!allProjects) {
    console.error('No projects found');
    return;
  }
  allProjects.forEach((project) => {
    selectOptions.value.projects.push({
      label: project.name,
      value: project.id
    });
  });
}

const getProfilesOptions = async () => {
  const { data: allProfiles } = await profilesQuery;

  if(!allProfiles) {
    console.error('No profiles found');
    return;
  }
  allProfiles.forEach((profile) => {
    selectOptions.value.profiles.push({
      label: profile.full_name,
      value: profile.id
    });
  });
}

const getOptions = async () => {
  await Promise.all([
    getProjectsOptions(),
    getProfilesOptions()
  ]);
};

getOptions();
  

const createTask = async (formData: CreateNewTask) => {
  // Logic to create a new task
  console.log('Creating new task...');

  await new Promise((resolve) => setTimeout(
    () => {
      resolve(console.log('Task created successfully!', formData));
    }, 2000)); // Simulate API call

  // sheetOpen.value = false; // Close the sheet after creating the task
};
</script>

<template>
    <Sheet v-model:open="sheetOpen" class="w-full max-w-2xl">

      <SheetContent>
        <SheetHeader>
          <SheetTitle>Create new task</SheetTitle>

        </SheetHeader>
            <div class="ml-4" >
              <FormKit type="form" @submit="createTask" submit-label="Create Task">
                <FormKit type="text" name="taskName" id="taskName" label="Task Name" placeholder="Enter new task name" />
                <FormKit
                  type="select"
                  name="profile_id"
                  id="profile_id"
                  label="User"
                  placeholder="Select a user"
                  :options="selectOptions.profiles"
                />
                <FormKit
                  type="select"
                  name="project_id"
                  id="project_id"
                  label="Project"
                  placeholder="Select a project"
                  :options="selectOptions.projects"
                />
                <FormKit
                  type="textarea"
                  name="description"
                  id="description"
                  label="Description"
                  placeholder="Task description"
                  validation="length:0,500"
                />
              </FormKit>
            </div>
      </SheetContent>
    </Sheet>
</template>

<style>
    
</style>
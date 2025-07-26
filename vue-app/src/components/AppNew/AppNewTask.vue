<script setup lang="ts">
import type { CreateNewTask } from '@/types/CreateNewForm';
const sheetOpen = defineModel<boolean>();

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
                  :options="[{ label: 'Select a user', value: 1 }]"
                />
                <FormKit
                  type="select"
                  name="project_id"
                  id="project_id"
                  label="Project"
                  placeholder="Select a project"
                  :options="[{ label: 'Select a project', value: 1 }]"
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
<script setup lang="ts">
const sheetOpen = defineModel<boolean>();
</script>

<template>
    <Sheet v-model:open="sheetOpen" class="w-full max-w-2xl">

      <SheetContent>
        <SheetHeader>
          <SheetTitle>Create new task</SheetTitle>

        </SheetHeader>
            <div class="ml-4" >
                <FormKit type="text" name="taskName" label="Task Name" placeholder="Enter task name" />
            </div>
      </SheetContent>
    </Sheet>
</template>

<style>
    
</style>
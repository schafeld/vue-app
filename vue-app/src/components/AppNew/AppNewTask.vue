<script setup lang="ts">
const sheetOpen = defineModel<boolean>();
</script>

<template>
    <Sheet v-model:open="sheetOpen" class="w-full max-w-2xl">
      <!-- <SheetTrigger>Open</SheetTrigger> -->
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Create new task</SheetTitle>
          <!-- <SheetDescription>
            This action cannot be undone. This will permanently delete your account
            and remove your data from our servers.
          </SheetDescription> -->
        </SheetHeader>

        <p>Content</p>
      </SheetContent>
    </Sheet>
</template>

<style>
    
</style>
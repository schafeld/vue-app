
<script lang="ts" setup>
// const value = defineModel<string>({
//   default: "Default value...",
//   type: String,
//   required: true,
// });
const value = defineModel();
</script>

<template>
    <div>     
        <input
        className="w-full p-1 bg-transparent focus:outline-none focus:bg-gray-800 focus:rounded-md"
        type="text" 
        v-model="value"
        />    
    </div>
</template>

<style>
    
</style>
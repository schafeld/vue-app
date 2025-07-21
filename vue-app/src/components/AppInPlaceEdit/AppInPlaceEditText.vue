
<script lang="ts" setup>
    const value = defineModel();
    defineEmits(['commit']);
</script>

<template>
    <div>     
        <input
        className="w-full p-1 bg-transparent focus:outline-none focus:bg-gray-800 focus:rounded-md"
        type="text" 
        v-model="value"
        @blur="$emit('commit')"
        @keyup.enter="($event.target as HTMLInputElement).blur()"
        />    
    </div>
</template>

<style>
    
</style>
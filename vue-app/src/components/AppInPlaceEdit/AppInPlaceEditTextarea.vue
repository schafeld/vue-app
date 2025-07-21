
<script lang="ts" setup>
    const value = defineModel<string>();
    defineEmits(['commit']);
</script>

<template>
    <div>     
        <textarea
        className="w-full p-1 bg-transparent focus:outline-none focus:bg-gray-800 focus:rounded-md"
        rows="4"
        v-model="value"
        @blur="$emit('commit')"
        />    
    </div>
</template>

<style>
    
</style>
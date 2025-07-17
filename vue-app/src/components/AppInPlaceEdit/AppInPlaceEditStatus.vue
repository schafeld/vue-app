
<script setup lang="ts">
const value = defineModel<'in-progress' | 'completed'>();

const emit = defineEmits(['commit']);

interface Props {
    readonly?: boolean;
}
const props = withDefaults(defineProps<Props>(), {
    readonly: false,
});

const toggleValue = () => {
    if (props.readonly) return;

    value.value = value.value === 'completed' ? 'in-progress' : 'completed';
    console.log('Status updated:', value.value);
    emit('commit');
}
</script>

<template>
    <div class="text-2xl cursor-pointer" @click="toggleValue">
        <Transition mode="out-in">
            <iconify-icon 
                :key="value"
                :icon="value === 'completed' ? 'lucide:circle-check' : 'lucide:circle-dot'"
                :class="value === 'completed' ? 'text-green-500' : 'text-gray-500'"
            />
        </Transition>
    </div>
</template>

<style scoped>
    .v-enter-active, .v-leave-active {
        transition: all 0.1s;
    }
    .v-enter-from, .v-leave-to {
        opacity: 0;
        transform: scale(0.3);
    }
</style>
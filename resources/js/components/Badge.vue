<script setup lang="ts">
import { computed } from 'vue';

interface Props {
    variant?: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info';
    outline?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
    variant: 'primary',
    outline: false
});

const variantClasses = computed(() => {
    const variants = {
        primary: props.outline
            ? 'bg-transparent text-blue-600 border border-blue-600'
            : 'bg-blue-100 text-blue-800',
        secondary: props.outline
            ? 'bg-transparent text-gray-600 border border-gray-600'
            : 'bg-gray-100 text-gray-800',
        success: props.outline
            ? 'bg-transparent text-green-600 border border-green-600'
            : 'bg-green-100 text-green-800',
        danger: props.outline
            ? 'bg-transparent text-red-600 border border-red-600'
            : 'bg-red-100 text-red-800',
        warning: props.outline
            ? 'bg-transparent text-yellow-600 border border-yellow-600'
            : 'bg-yellow-100 text-yellow-800',
        info: props.outline
            ? 'bg-transparent text-indigo-600 border border-indigo-600'
            : 'bg-indigo-100 text-indigo-800'
    };

    return variants[props.variant];
});
</script>
<template>
    <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-[13px] font-normal" :class="variantClasses">
        <slot></slot>
    </span>
</template>
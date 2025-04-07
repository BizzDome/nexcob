<script setup lang="ts">
import { cn } from '@/lib/utils';
import type { HTMLAttributes } from 'vue';
import InputError from '@/components/InputError.vue';

const props = defineProps<{
    title?: string;
    error?: string | null;
    class?: HTMLAttributes['class'];
}>();
</script>
<template>
    <div :class="cn('relative px-6 pt-6 pb-4 rounded-lg border border-neutral-200 dark:border-neutral-800', props.class)">
        <span class="absolute left-2 top-[-11px] text-sm px-2 text-neutral-400 dark:text-neutral-500 bg-white dark:bg-background">{{ title }}</span>
        <slot />
    </div>
    <InputError v-if="error" :message="error" />
</template>
<script setup lang="ts">
defineProps<{
    message?: string;
}>();
</script>

<template>
    <span v-show="message" class="text-sm font-semibold text-red-500 dark:text-red-500">
        {{ message }}
    </span>
</template>

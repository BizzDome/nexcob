<script setup lang="ts">
import AppLayout from '@/layouts/app/AppSidebarLayout.vue';
import Toaster from '@/components/ui/toast/Toaster.vue'
import type { BreadcrumbItemType } from '@/types';

interface Props {
    breadcrumbs?: BreadcrumbItemType[];
}

withDefaults(defineProps<Props>(), {
    breadcrumbs: () => [],
});
</script>

<template>
    <AppLayout :breadcrumbs="breadcrumbs">
        <Toaster />
        <slot />
    </AppLayout>
</template>

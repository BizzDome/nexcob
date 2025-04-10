<script setup lang="ts">
import { Link } from '@inertiajs/vue3';
import type { PaginationLink } from '@/types';

defineProps({
  links: {
    type: Array as () => PaginationLink[],
    required: true
  },
  info: Object
});

const getPreviousLink = (links: PaginationLink[]) => links.find(link => link.label.includes('Previous'));
const getNextLink = (links: PaginationLink[]) => links.find(link => link.label.includes('Next'));
</script>

<template>
  <div v-if="links.length > 3" class="flex items-center justify-between mt-4">
    <span class="px-4 text-sm text-muted-foreground">
      {{ ((info?.current_page - 1) * info?.per_page) + 1 }} - {{ info?.to }} of {{ info?.total }} items
    </span>
    
    <div class="flex items-center space-x-2">
      <component 
        :is="getPreviousLink(links)?.url ? Link : 'span'" 
        :href="getPreviousLink(links)?.url || null" 
        :class="[
          !getPreviousLink(links)?.url ? 'opacity-50 cursor-not-allowed' : 'hover:bg-wd-p-50 dark:hover:bg-wd-s-50/20',
          'border border-input bg-background hover:bg-accent hover:text-accent-foreground text-sm font-medium w-auto px-4 h-9 flex items-center justify-center rounded-md shadow-sm'
        ]"
      >
        Previous
      </component>

      <component 
        :is="getNextLink(links)?.url ? Link : 'span'" 
        :href="getNextLink(links)?.url || null" 
        :class="[
          !getNextLink(links)?.url ? 'opacity-50 cursor-not-allowed' : 'hover:bg-wd-p-50 dark:hover:bg-wd-s-50/20',
          'border border-input bg-background hover:bg-accent hover:text-accent-foreground text-sm font-medium w-auto px-4 h-9 flex items-center justify-center rounded-md shadow-sm'
        ]"
      >
         Next
      </component>
    </div>
  </div>
</template>
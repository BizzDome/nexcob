<script setup lang="ts">
import { computed } from 'vue';

interface CheckboxProps {
  checked: boolean | unknown[];
  value?: string | number | null;
}

const emit = defineEmits<{
  'update:checked': [value: boolean | unknown[]];
}>();

const props = withDefaults(defineProps<CheckboxProps>(), {
  checked: false,
  value: null,
});

const proxyChecked = computed({
  get() {
    return props.checked;
  },
  set(val: boolean | unknown[]) {
    emit('update:checked', val);
  },
})
</script>

<template>
  <input
    v-model="proxyChecked"
    type="checkbox"
    :value="value"
    class="rounded border-none text-wd-l-text dark:bg-wd-d-text shadow-sm focus:ring-wd-4 focus:ring-wd-p-700 dark:focus:ring-wd-s-700 focus:checked:bg-wd-p-700 dark:focus:checked:bg-wd-s-700 checked:bg-wd-p-700 dark:checked:bg-wd-s-700 hover:bg-wd-p-700 dark:hover:bg-wd-s-500 hover:checked:bg-wd-p-500 dark:hover:checked:bg-wd-s-500 transition-all duration-300"
  />
</template>
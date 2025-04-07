<script setup lang="ts">
import { computed } from 'vue';

interface CheckboxProps {
  checked: boolean | (string | number)[];
  value?: string | number | null;
  id?: string | number | null;
  name?: string;
  label?: string;
  size?: 'sm' | 'md' | 'lg';
  color?: 'success' | 'warning' | 'danger' | 'primary';
}

const emit = defineEmits<{
  'update:checked': [value: boolean | (string | number)[]];
}>();

const props = withDefaults(defineProps<CheckboxProps>(), {
  checked: false,
  value: null,
  id: null,
  name: undefined,
  label: '',
  size: 'sm',
  color: 'primary',
});

// Para el caso de un checkbox individual
const isChecked = computed(() => {
  if (Array.isArray(props.checked)) {
    return props.value !== null && props.checked.includes(props.value);
  }
  return !!props.checked;
});

// Manejar el cambio manual del checkbox
const handleChange = (event: Event) => {
  const target = event.target as HTMLInputElement;
  
  // Si es un valor booleano simple
  if (!Array.isArray(props.checked)) {
    emit('update:checked', target.checked);
    return;
  }
  
  const newChecked = [...props.checked];
  
  if (target.checked) {
    if (props.value !== null && !newChecked.includes(props.value)) {
      newChecked.push(props.value);
    }
  } else {
    if (props.value !== null) {
      const index = newChecked.indexOf(props.value);
      if (index !== -1) {
        newChecked.splice(index, 1);
      }
    }
  }
  
  emit('update:checked', newChecked);
};

const checkboxSize = computed(() => {
  switch (props.size) {
    case 'md': return 'w-5 h-5';
    case 'lg': return 'w-6 h-6';
    default: return 'w-4 h-4';
  }
});

const colorClasses = computed(() => {
  switch (props.color) {
    case 'danger': return 'bg-red-600 border-red-600 ring-red-400';
    case 'success': return 'bg-green-600 border-green-600 ring-green-400';
    case 'warning': return 'bg-amber-500 border-amber-500 ring-amber-300';
    default: return 'bg-slate-900 border-slate-900 ring-slate-500';
  }
});

</script>

<template>
  <label 
    :for="id !== null ? String(id) : undefined" 
    class="cursor-pointer inline-flex items-center space-x-2"
  >
    <input
      :checked="isChecked"
      @change="handleChange"
      type="checkbox"
      :value="value"
      :id="id !== null ? String(id) : undefined"
      :name="name"
      class="peer hidden"
    />

    <div
      :class="[
        checkboxSize,
        'rounded border flex items-center justify-center transition-colors duration-200',
        isChecked ? colorClasses : 'border-gray-300 bg-white',
        'peer-focus:ring-2 peer-focus:ring-offset-2',
      ]"
    >
      <!-- Check visible solo si está marcado -->
      <svg
        v-if="isChecked"
        :class="[
          checkboxSize,
          'text-white'
        ]"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        stroke-width="3"
      >
        <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
      </svg>
    </div>

    <slot>
      <span v-if="label" class="ml-2 text-sm font-normal text-foreground capitalize">{{ label }}</span>
    </slot>
  </label>
</template>
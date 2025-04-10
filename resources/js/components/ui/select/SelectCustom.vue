<script setup lang="ts">
import { ref, watch } from 'vue';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';

interface Option {
  [key: string]: any;
}

const props = withDefaults(defineProps<{
  modelValue: string | number;
  options: Option[];
  placeholder?: string;
  label?: string;
  icon?: any;
  valueField?: string;
  labelField?: string;
  id?: string;
}>(), {
  modelValue: '',
  options: () => [],
  placeholder: '',
  label: '',
  icon: null,
  valueField: 'id',
  labelField: 'label',
  id: ''
});

// Emitir la actualización del v-model
const emit = defineEmits<{ (e: 'update:modelValue', value: string | number): void }>();

// Ref local para la selección, que se sincroniza con modelValue
const selectedValue = ref<string | number>(props.modelValue);

// Sincronizar cuando cambia la prop modelValue
watch(() => props.modelValue, (newVal) => {
  selectedValue.value = newVal;
});

// Emitir cambios cuando se actualiza selectedValue
watch(selectedValue, (newVal) => {
  emit('update:modelValue', newVal);
});
</script>

<template>
  <div>
    <!-- Label opcional para el select -->
    <Label v-if="label" :for="id" class="text-sm font-medium">{{ label }}</Label>
    <Select v-model="selectedValue" :id="id" class="w-full text-xs">
      <SelectTrigger class="text-sm">
        <div class="flex items-center">
          <component v-if="icon" :is="icon" size="20" :stroke-width="1" class="mr-2 text-muted-foreground" />
          <SelectValue :placeholder="placeholder" />
        </div>
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem 
            v-for="option in options" 
            :key="option[valueField]" 
            :value="option[valueField]"
          >
            {{ option[labelField] }}
          </SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  </div>
</template>

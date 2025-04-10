<script setup lang="ts">
import { computed } from 'vue';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import InputError from '@/components/InputError.vue';

interface Props {
    type?: string;
    id?: string;
    label?: string;
    error?: string | null;
    modelValue?: string | number | null;
    placeholder?: string;
    icon?: any;
}

const props = withDefaults(defineProps<Props>(), {
    type: 'text',
    id: '',
    label: '',
    error: '',
    placeholder: '',
    icon: null,
});

const emit = defineEmits<{
    (e: 'update:modelValue', value: string | number | null): void;
}>();

const internalValue = computed({
    get: () => props.modelValue != null ? props.modelValue.toString() : '',
    set: (val: string) => emit('update:modelValue', val),
});
</script>

<template>
    <div class="space-y-2">
        <Label v-if="label" :for="id" class="text-sm font-medium">{{ label }}</Label>
        <div class="relative">
            <span v-if="icon" class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <component 
                    :is="icon" 
                    :size="20" 
                    :stroke-width="1.4"
                    :class="[
                        error ? 'text-destructive': 'text-neutral-400 dark:text-neutral-500'
                    ]" 
                />
            </span>
            <Input 
                :id="id" 
                v-model="internalValue" 
                :placeholder="placeholder" 
                :type="type"
                v-bind="$attrs" 
                :class="[
                    'block w-full', 
                    icon ? 'pl-10' : '',
                    error ? 'ring-1 ring-destructive border-destructive focus-visible:ring-destructive': ''
                ]"
            />
        </div>
        <InputError v-if="error" :message="error" />
    </div>
</template>
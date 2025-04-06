<script setup lang="ts">
import { watch } from 'vue';
import type { PropType } from 'vue';
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

type ModalType = 'create' | 'edit' | 'delete';

const props = defineProps({
    isOpen: Boolean,
    modalType: {
        type: String as PropType<ModalType | null>,
        default: 'create'
    },
    title: String,
    description: String,
    form: {
        type: Object as PropType<Record<string, any>>,
        required: true,
    },
    errors: {
        type: Object as PropType<Record<string, string>>,
        default: () => ({}),
    },
    isSubmitting: Boolean,
    isDeleting: Boolean,
});

const emit = defineEmits(['close', 'submit', 'delete']);

watch(() => props.isOpen, (newVal, oldVal) => {
    if (oldVal && !newVal) emit('close');
});

const isActionDisabled = () => props.isSubmitting || props.isDeleting;
</script>
<template>
    <Dialog :open="isOpen" @update:open="val => val || (!isActionDisabled() && emit('close'))">
        <DialogContent>
            <DialogHeader>
                <DialogTitle>
                    {{ {
                        'delete': 'Confirm Deletion',
                        'edit': `Edit ${title}`,
                        'create': `Create ${title}`
                    }[modalType || 'create'] }}
                </DialogTitle>
                <DialogDescription>
                    {{ modalType === 'delete' 
                        ? `Are you sure you want to delete this ${title}? This action cannot be undone.`
                        : description }}
                </DialogDescription>
            </DialogHeader>

            <div v-if="modalType !== 'delete'" class="p-4">
                <slot name="form" :form="form" :errors="errors" />
            </div>

            <DialogFooter class="gap-2">
                <DialogClose as-child>
                    <Button variant="secondary" @click="emit('close')"> Cancel </Button>
                </DialogClose>

                <Button 
                    v-if="modalType === 'delete'" 
                    variant="destructive" 
                    @click="emit('delete')" 
                    :disabled="isDeleting"
                >
                    Delete
                </Button>
                <Button 
                    v-else 
                    :disabled="isSubmitting" 
                    @click="emit('submit')"
                >
                    {{ modalType === 'edit' ? 'Update' : 'Create' }}
                </Button>
            </DialogFooter>
        </DialogContent>
    </Dialog>
</template>
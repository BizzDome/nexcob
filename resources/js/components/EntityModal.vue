<script setup lang="ts">
// import { ref } from 'vue';
import type { PropType } from 'vue';

import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    // DialogTrigger,
} from '@/components/ui/dialog';

// import InputError from '@/components/InputError.vue';

type ModalType = 'create' | 'edit' | 'delete';

const props = defineProps({
    isOpen: Boolean,
    modalType: {
        type: String as PropType<ModalType>,
        default: 'create'
    },
    title: {
        type: String,
        default: '',
    },
    form: {
        type: Object as PropType<Record<string, any>>,
        required: true,
    },
    errors: {
        type: Object as PropType<Record<string, string>>,
        default: () => ({}),
    },
    isSubmitting: {
        type: Boolean,
        default: false,
    },
    isDeleting: {
        type: Boolean,
        default: false,
    },
});

const emit = defineEmits<{
    (e: 'close'): void;
    (e: 'submit'): void;
    (e: 'delete'): void;
}>();

const closeModal = () => {
    if (!props.isSubmitting && !props.isDeleting) emit('close');
};

const submitForm = () => emit('submit');
const deleteForm = () => emit('delete');
</script>
<template>
    <Dialog :open="isOpen" @update:open="val => !val && closeModal()">
        <DialogContent>
            <DialogHeader class="space-y-3">
                <DialogTitle>
                    {{ modalType === 'delete'
                        ? 'Confirm Deletion'
                        : modalType === 'edit'
                            ? `Edit ${title}`
                            : `Create ${title}`
                    }}
                </DialogTitle>
                <DialogDescription v-if="modalType === 'delete'">
                    Are you sure you want to delete this {{ title }}? This action cannot be undone.
                </DialogDescription>
            </DialogHeader>

            <div v-if="modalType !== 'delete'" class="p-4">
                <slot name="form" :form="form" :errors="errors" />
            </div>

            <DialogFooter class="gap-2">
                <DialogClose as-child>
                    <Button variant="secondary" @click="closeModal"> Cancel </Button>
                </DialogClose>

                <Button v-if="modalType === 'delete'" variant="destructive" @click="deleteForm" :disabled="isDeleting">
                    Delete
                </Button>
                <Button v-else :disabled="isSubmitting" @click="submitForm">
                    {{ modalType === 'edit' ? 'Update' : 'Create' }}
                </Button>
            </DialogFooter>
        </DialogContent>
    </Dialog>
</template>
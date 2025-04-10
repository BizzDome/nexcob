<script setup lang="ts">
import { Head } from '@inertiajs/vue3';

/* ======= Components ======= */
import AppLayout from '@/layouts/AppLayout.vue';
import EntityModal from '@/components/EntityModal.vue';
import GroupBox from '@/components/GroupBox.vue';
import Badge from '@/components/Badge.vue';
import { InputForm } from '@/components/ui/input';
import { Checkboxnc } from '@/components/ui/checkbox';
import { DataTable } from '@/components/ui/datatable';

/* ======= Icons ======= */
import { Pencil, Trash } from 'lucide-vue-next';

/* ======= Libraries ======= */
import useModal from '@/composables/useModal';
import { RoleModel } from '@/models/Role';
import type { BreadcrumbItem, RolesPagination, Permission, Column } from '@/types';

interface Props {
    roles: RolesPagination;
    permissions: Permission[];
}

defineProps<Props>();

const { 
    modalType, 
    isModalOpen, 
    form, 
    errors, 
    isSubmitting, 
    isDeleting, 
    openModal, 
    closeModal, 
    submitForm,
    deleteForm
} = useModal(RoleModel);

/* ======= Rules ======= */
const validationRules = {
    name: ['required', { min: 3 }],
}

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Roles', href: '/admin/roles' }
]

const columns: Column[] = [
    { key: 'id', label: '#' },
    { key: 'name', label: 'Nme' },
    { key: 'permissions', label: 'Permissions' },
    { key: 'created_at', label: 'Created At' },
];
</script>

<template>
    <AppLayout :breadcrumbs="breadcrumbs">

        <Head title="Roles" />

        <div class="px-4 py-6 w-screen md:w-full">
            <DataTable 
                :columns="columns" 
                :data="roles" 
                routeName="roles.index" 
                searchPlaceholder="Buscar..." 
                btnCreate
                @open-modal="openModal"
            >
                <template #actions="{ item }">
                    <button @click="openModal('edit', item)" class="text-blue-600 hover:text-blue-900">
                        <Pencil :size="20" :stroke-width="1.4" />
                    </button>
                    <button @click="openModal('delete', item)" class="text-red-600 hover:text-red-900">
                        <Trash :size="20" :stroke-width="1.4" />
                    </button>
                </template>
                <template #permissions="{ value }">
                    <Badge color="secondary">
                        {{ value.length }}
                    </Badge>
                </template>
            </DataTable>
        </div>

        <EntityModal 
            :isOpen="isModalOpen" 
            :modalType="modalType" 
            :title="'Role'"
            description="Enter the role information you want to create or modify." 
            :form="form" 
            :errors="errors"
            :isSubmitting="isSubmitting" 
            :isDeleting="isDeleting" 
            @close="closeModal"
            @submit="submitForm('/admin/roles', validationRules)" 
            @delete="deleteForm('/admin/roles')"
        >
            <template #form="{ form, errors }">
                <div class="space-y-4">
                    <InputForm id="name" type="text" v-model="form.name" placeholder="Name" :error="errors.name" />
                    <div>
                        <GroupBox title="Permissions" :error="errors.permissions" class="mt-6">
                            <div class="grid grid-cols-2 md:grid-cols-3 gap-2">
                                <div v-for="permission in permissions" :key="permission.id">
                                    <Checkboxnc name="permissions" :id="permission.id" v-model:checked="form.permissions" :value="permission.id"
                                        :label="permission.name" />
                                </div>
                            </div>
                        </GroupBox>
                    </div>
                </div>
            </template>
        </EntityModal>
    </AppLayout>
</template>
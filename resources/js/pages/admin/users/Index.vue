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
import { UserPen, Trash, Lock, AtSign } from 'lucide-vue-next';

/* ======= Libraries ======= */
import useModal from '@/composables/useModal';
import { UserModel } from '@/models/User';
import type { BreadcrumbItem, UsersPagination, Role, Column } from '@/types';

interface Props {
    users: UsersPagination;
    roles: Role[];
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
    submitForm,deleteForm
} = useModal(UserModel);

/* ======= Rules ======= */
const validationRules = {
    name: ['required', { min: 3 }],
    email: ['required', { type: 'email' }],
    password: [{
        custom: (value: any, form: any) => {
            if (!form.password && !form.password_confirmation) return true;
            if (!value) return 'Password is required';
            return true;
        }
    }],
    password_confirmation: [{
        custom: (value: any, form: any) => {
            if (!form.password && !value) return true;
            if (!value) return 'Password confirmation is required';
            return true;
        }
    }]
}

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Users', href: '/admin/users' }
]

const columns: Column[] = [
    { key: 'id', label: '#' },
    { key: 'name', label: 'Fullname' },
    { key: 'email', label: 'E-mail' },
    { key: 'roles', label: 'Roles' },
    { key: 'created_at', label: 'Created At' },
];
</script>
<template>
    <AppLayout :breadcrumbs="breadcrumbs">

        <Head title="Users" />

        <div class="px-4 py-6 w-screen md:w-full">
            <DataTable 
                :columns="columns" 
                :data="users" 
                routeName="users.index" 
                searchPlaceholder="Buscar..." 
                btnCreate
                @open-modal="openModal"
            >
                <template #actions="{ item }">
                    <button @click="openModal('edit', item)" class="text-blue-600 hover:text-blue-900">
                        <UserPen :size="20" :stroke-width="1.4" />
                    </button>
                    <button @click="openModal('delete', item)" class="text-red-600 hover:text-red-900">
                        <Trash :size="20" :stroke-width="1.4" />
                    </button>
                </template>
                <template #roles="{ value }">
                    <div class="space-x-1">
                        <Badge v-for="role in value" :key="role.id" color="secondary">
                            {{ role.name }}
                        </Badge>
                    </div>
                </template>
                <!-- <template #created_at="{ value }">
                    {{ dateFormatter.formatDateTime(value) }}
                </template> -->
            </DataTable>
        </div>

        <EntityModal 
            :isOpen="isModalOpen" 
            :modalType="modalType" 
            :title="'User'"
            description="Enter the user information you want to create or modify." 
            :form="form" 
            :errors="errors"
            :isSubmitting="isSubmitting" 
            :isDeleting="isDeleting" 
            @close="closeModal"
            @submit="submitForm('/admin/users', validationRules)" 
            @delete="deleteForm('/admin/users')"
        >
            <template #form="{ form, errors }">
                <div class="space-y-4">
                    <InputForm id="name" type="text" v-model="form.name" placeholder="Fullname" :error="errors.name" />
                    <InputForm id="email" type="email" v-model="form.email" placeholder="E-mail" :icon="AtSign" :error="errors.email" />
                    <InputForm id="password" type="password" v-model="form.password" placeholder="Password" :icon="Lock" :error="errors.password" />
                    <InputForm id="password_confirmation" type="password" v-model="form.password_confirmation" placeholder="Password confirmation" :icon="Lock" :error="errors.password_confirmation" />
                    <div>
                        <GroupBox title="Type of access" :error="errors.roles" class="mt-6">
                            <div class="grid gap-2">
                                <div v-for="role in roles" :key="role.id">
                                    <Checkboxnc name="roles" :id="role.id" v-model:checked="form.roles" :value="role.id"
                                        :label="role.name" />
                                </div>
                            </div>
                        </GroupBox>
                    </div>
                </div>
            </template>
        </EntityModal>
    </AppLayout>
</template>

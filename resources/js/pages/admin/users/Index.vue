<script setup lang="ts">
import { Head } from '@inertiajs/vue3';

// Components
import AppLayout from '@/layouts/AppLayout.vue';
import EntityModal from '@/components/EntityModal.vue';
import { InputForm } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Checkboxnc } from '@/components/ui/checkbox';
import GroupBox from '@/components/GroupBox.vue';

// libraries
import useModal from '@/composables/useModal'; 
import { Role, User, UserModel } from '@/models/User';
import { type BreadcrumbItem } from '@/types';
import { UserPen, Trash, Lock, AtSign } from 'lucide-vue-next';

interface Props {
    users: User[];
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
    submitForm,
    deleteForm
} = useModal(UserModel);

const validationRules = {
    name: ['required', { min: 3 }],
    email: ['required', { type: 'email' }],
    password: [{
        custom: (value: any, form: any) => {
            if (!form.password && !form.password_confirmation) return true;
            if (!value)  return 'Password is required';
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
    {
        title: 'Users',
        href: '/admin/users',
    },
]
</script>
<template>
    <Head title="Users" />

    <AppLayout :breadcrumbs="breadcrumbs">
        <div class="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
            <div class="relative min-h-[100vh] flex-1 rounded-xl border border-sidebar-border/70 dark:border-sidebar-border md:min-h-min">
                <Button @click="openModal('create')">
                    Create
                </Button>

                <div class="overflow-x-auto">
                    <table class="min-w-full divide-y divide-gray-200">
                        <thead class="bg-gray-50">
                            <tr>
                                <th
                                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Nombre
                                </th>
                                <th
                                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Roles
                                </th>
                                <th
                                    class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Acciones
                                </th>
                            </tr>
                        </thead>
                        <tbody class="bg-white divide-y divide-gray-200">
                            <tr v-for="user in users" :key="user.id">
                                <td class="px-6 py-4 whitespace-nowrap">
                                    <div class="text-sm font-medium text-gray-900">{{ user.name }}</div>
                                </td>
                                <td class="px-6 py-4">
                                    <div class="flex flex-wrap gap-1">
                                        <span v-for="role in user.roles" :key="role.id"
                                            class="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
                                            {{ role.name }}
                                        </span>
                                    </div>
                                </td>
                                <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                    <button @click="openModal('edit', user)" class="text-blue-600 hover:text-blue-900 mr-3">
                                        <UserPen :size="20" :stroke-width="1.4" />
                                    </button>
                                    <button @click="openModal('delete', user)" class="text-red-600 hover:text-red-900">
                                        <Trash :size="20" :stroke-width="1.4" />
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
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

                    <InputForm
                        id="name"
                        type="text"
                        v-model="form.name" 
                        placeholder="Fullname"
                        :error="errors.name"
                    />

                    <InputForm
                        id="email"
                        type="email"
                        v-model="form.email" 
                        placeholder="E-mail"
                        :icon="AtSign"
                        :error="errors.email"
                    />

                    <InputForm
                        id="password"
                        type="password"
                        v-model="form.password" 
                        placeholder="Password"
                        :icon="Lock"
                        :error="errors.password"
                    />
                    
                    <InputForm
                        id="password_confirmation"
                        type="password"
                        v-model="form.password_confirmation" 
                        placeholder="Password confirmation"
                        :icon="Lock"
                        :error="errors.password_confirmation"
                    />
                    
                    <div>
                        <GroupBox title="Type of access" :error="errors.roles" class="mt-6">
                            <div class="grid gap-2">
                                <div v-for="role in roles" :key="role.id">
                                    <Checkboxnc 
                                        name="roles"
                                        :id="role.id"
                                        v-model:checked="form.roles"
                                        :value="role.id"
                                        :label="role.name"
                                    />
                                </div>
                            </div>
                        </GroupBox>
                    </div>
                </div>
            </template>
        </EntityModal>
    </AppLayout>
</template>
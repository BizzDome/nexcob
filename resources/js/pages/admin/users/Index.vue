<script setup lang="ts">
import { Head } from '@inertiajs/vue3';
import AppLayout from '@/layouts/AppLayout.vue';
import { type BreadcrumbItem } from '@/types';
import { Role, User, UserModel } from '@/models/User';
import EntityModal from '@/components/EntityModal.vue';
import { Input } from '@/components/ui/input';
import InputError from '@/components/InputError.vue';
import { Button } from '@/components/ui/button';
// import { Checkbox } from '@/components/ui/checkbox';
import CheckboxRoles from '@/components/CheckboxRoles.vue';
import useModal from '@/composables/useModal'; 

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
                                        {{ user.roles }}
                                        <span v-for="role in user.roles" :key="role.id"
                                            class="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
                                            {{ role.name }}
                                        </span>
                                    </div>
                                </td>
                                <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                    <button @click="openModal('edit', user)" class="text-blue-600 hover:text-blue-900 mr-3">
                                        Editar
                                    </button>
                                    <button @click="openModal('delete', user)" class="text-red-600 hover:text-red-900">
                                        Eliminar
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
                    <Input 
                        id="name"
                        v-model="form.name" 
                        placeholder="Name"
                    />
                    <InputError :message="errors.name" />
                    
                    <Input 
                        id="email" 
                        type="email"
                        v-model="form.email" 
                        placeholder="Email" 
                    />
                    <InputError :message="errors.email" />
                    
                    <Input 
                        id="password"
                        type="password"
                        v-model="form.password" 
                        placeholder="Password" 
                    />
                    <InputError :message="errors.password" />

                    <Input 
                        id="password_confirmation"
                        type="password"
                        v-model="form.password_confirmation" 
                        placeholder="Password confirmation" 
                    />
                    <InputError :message="errors.password_confirmation" />

                    {{ form }}
                    <CheckboxRoles
                        :roles="roles"
                        v-model="form.roles"
                    />
                    <!-- <div v-for="role in roles" :key="role.id">
                        <label :for="role.name" class="px-2 py-1 cursor-pointer">
                            <Checkbox 
                                name="roles"
                                :id="role.id"
                                v-model="form.roles" 
                                :value="role.id"
                            />
                            <span class="ml-2 font-semibold text-[13px] ">{{ role.name }}</span>
                        </label>
                    </div> -->
                </div>
            </template>
        </EntityModal>
    </AppLayout>
</template>
import { type Role } from '@/types';

export const RoleModel = {
    base: (): Role => ({
        name: '',
        permissions: [],
    }),
    hydrate: (data: Partial<Role> = {}): Role => ({
        id: data.id ?? '',
        name: data.name ?? '',
        permissions: Array.isArray(data.permissions)
            ? data.permissions.map((p: any) => typeof p === 'object' ? p.id : p)
            : [],
        created_at: data.created_at ?? '',
        updated_at: data.updated_at ?? '',
    }),
}
import { type ExtendedUser } from '@/types';

export const UserModel = {
    base: (): ExtendedUser => ({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
        roles: [],
    }),
    hydrate: (data: Partial<ExtendedUser> = {}): ExtendedUser => ({
        id: data.id ?? '',
        name: data.name ?? '',
        email: data.email ?? '',
        password: '',
        password_confirmation: '',
        roles: Array.isArray(data.roles)
            ? data.roles.map((r: any) => typeof r === 'object' ? r.id : r)
            : [],
        created_at: data.created_at ?? '',
        updated_at: data.updated_at ?? '',
    })
}
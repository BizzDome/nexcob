export interface User {
    id?: number | string ;
    name: string;
    email: string;
    password: string;
    password_confirmation?: string;
    roles: number[];
    created_at?: string;
    updated_at?: string;
}

export interface Permission {
    id: number;
    name: string;
    created_at?: string;
    updated_at?: string;
}

export interface Role {
    id: number;
    name: string;
    permissions: Permission[];
    created_at?: string;
    updated_at?: string;
}

export const UserModel = {
    base: (): User => ({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
        roles: [],
    }),
    hydrate: (data: Partial<User> = {}): User => ({
        id: data.id ?? '',
        name: data.name ?? '',
        email: data.email ?? '',
        password: '',
        password_confirmation: '',
        // roles: data.roles ?? [],
        roles: Array.isArray(data.roles)
            ? data.roles.map((r: any) => typeof r === 'object' ? Number(r.id) : Number(r))
            : [],
        created_at: data.created_at ?? '',
        updated_at: data.updated_at ?? '',
    })
}
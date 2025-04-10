export interface Role {
    id?: number | string;
    name: string;
    permissions: Permission[];
    created_at?: string;
    updated_at?: string;
}

export interface RolesPagination {
    data: Role[];
    current_page: number;
    per_page: number;
    last_page: number;
    total: number;
}
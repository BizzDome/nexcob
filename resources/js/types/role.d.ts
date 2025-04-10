export interface Role {
    id?: number | string;
    name: string;
    permissions: Permission[];
    created_at?: string;
    updated_at?: string;
}
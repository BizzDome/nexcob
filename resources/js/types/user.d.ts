export interface User {
    id?: number | string;
    name: string;
    email: string;
    avatar?: string;
    email_verified_at?: string | null;
    created_at?: string;
    updated_at?: string;
}

export interface ExtendedUser extends User {
    password: string;
    password_confirmation: string;
    roles: Role[];
}

export interface UsersPagination {
    data: ExtendedUser[];
    current_page: number;
    per_page: number;
    last_page: number;
    total: number;
}
export interface Column {
    key: string;
    label: string;
    class?: string;
}

export interface PaginationLink {
    active: boolean;
    label: string;
    url: string | null;
}

export interface DataTableData {
    data: any[];
    links?: PaginationLink[];
    current_page?: number;
    per_page?: number;
    last_page?: number;
    to?: number;
    total?: number;
}

export interface Movie {
    id: string;
    name: string;
    year?: number;
    poster?: string;
    favourite?: boolean;
    genres?: Array<{ name: string } | string>;
    description?: string;
}
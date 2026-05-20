import type { Column } from '@/types/Column';

export type Board = {
    id: string,
    title: string,
    columns: Column[]
}
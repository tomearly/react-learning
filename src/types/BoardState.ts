import type { Column } from '@/types/ColumnState';

export type BoardState = {
    id: string,
    title: string,
    columns: Column[]
}
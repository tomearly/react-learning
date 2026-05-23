import type { TaskState } from '@/types/TaskState';
import type { ColumnStatus } from '@/types/ColumnStatus';

export type Column = {
    id: string,
    position: number,
    title: string,
    tasks: TaskState[],
    status: ColumnStatus
}
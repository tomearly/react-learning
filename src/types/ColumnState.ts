import type { TaskState } from '@/types/TaskState';

export type Column = {
    id: string,
    position: number,
    title: string,
    tasks: TaskState[]
}
import type { Task } from '@/types/Task';

export type Column = {
    id: string,
    position: number,
    title: string,
    tasks: Task[]
}
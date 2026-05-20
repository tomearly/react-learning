import type { TaskStatus } from "./TaskStatus"

export type Task = {
    id: string,
    position: number,
    status: TaskStatus,
    title: string,
    text: string,
}
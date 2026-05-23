import type { ColumnStatus } from "@/types/ColumnStatus"

export type MoveToHandler = (
    taskId: string,
    columnStatus: ColumnStatus,
) => void

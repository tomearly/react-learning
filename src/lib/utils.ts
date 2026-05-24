import type { BoardState } from "@/types/BoardState";
import type { ColumnStatus } from "@/types/ColumnStatus";
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function stringLengthValidation(value: string, messageString: string, minChars: number = 1): string | undefined {
  if (value?.length < minChars) {
    const message = `${messageString} must at least ${minChars} characters`;
    return message
  }
}

const allowedMoves: Record<ColumnStatus, ColumnStatus[]> = {
  todo: ["in_progress", "done"],
  in_progress: ["todo", "done"],
  done: ["in_progress"],
}

export function validateTaskMove(fromStatus: ColumnStatus, toStatus: ColumnStatus) {
  return allowedMoves[fromStatus].includes(toStatus)
}

export function addTaskToBoard(board: BoardState, columnId: string, title: string, text: string) {
  return ({
    ...board,
    columns: board.columns.map((column) => {
      if (column.id !== columnId) {
        return column
      }

      return {
        ...column,
        tasks: [
          ...column.tasks,
          {
            id: crypto.randomUUID(),
            position: column.tasks.length,
            title: title,
            text: text,
          },
        ],
      }
    }),
  })
}

export function deleteTaskFromBoard(board: BoardState, columnId: string, taskId: string) {
  return ({
    ...board,
    columns: board.columns.map((column) => {
      if (column.id !== columnId) {
        return column
      }

      return {
        ...column,
        tasks: column.tasks.filter((task) => task.id !== taskId),
      }
    })
  })
}

export function moveTaskInBoard(board: BoardState, taskId: string, targetStatus: ColumnStatus) {
  {
    const taskToMove = board.columns
      .flatMap((column) => column.tasks)
      .find((task) => task.id === taskId)

    if (!taskToMove) {
      throw new Error(`Cannot move task because task "${taskId}" was not found.`)
    }

    const targetColumn = board.columns.find((column) => column.status === targetStatus)

    if (!targetColumn) {
      throw new Error(`Cannot move task because column "${targetStatus}" was not found.`)
    }

    return {
      ...board,
      columns: board.columns.map((column) => {
        if (column.id === targetColumn.id) {
          return {
            ...column,
            tasks: [
              ...column.tasks.filter((task) => task.id !== taskId),
              {
                ...taskToMove,
                position: column.tasks.length,
              },
            ],
          }
        }

        return {
          ...column,
          tasks: column.tasks.filter((task) => task.id !== taskId),
        }
      }),
    }
  }
}

export function editTaskInBoard(board: BoardState, columnId: string, taskId: string, title: string, text: string) {

  return ({
    ...board,
    columns: board.columns.map((column) => {
      if (column.id !== columnId) {
        return column
      }

      const taskExists = column.tasks.some((task) => task.id === taskId)

      if (!taskExists) {
        throw new Error(`Cannot edit task because task "${taskId}" was not found.`)
      }

      return {
        ...column,
        tasks: column.tasks.map((task) => {
          if (task.id !== taskId) {
            return task
          }

          return {
            ...task,
            title: title,
            text: text,
          }
        }),
      }
    }),
  })
}

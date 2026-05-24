import type { BoardState } from "@/types/BoardState"
import type { ColumnStatus } from "@/types/ColumnStatus"

export function addTaskToBoard(board: BoardState, columnId: string, title: string, text: string): BoardState {
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

export function deleteTaskFromBoard(board: BoardState, columnId: string, taskId: string): BoardState {
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

export function moveTaskInBoard(board: BoardState, taskId: string, targetStatus: ColumnStatus): BoardState {
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

export function editTaskInBoard(board: BoardState, columnId: string, taskId: string, title: string, text: string): BoardState {

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

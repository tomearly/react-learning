import { describe, expect, it, vi } from "vitest"

import { boardReducer } from "@/reducers/boardReducer"
import type { BoardState } from "@/types/BoardState"

function createBoard(): BoardState {
    return {
        id: "board-1",
        title: "Test Board",
        columns: [
            {
                id: "column-todo",
                position: 0,
                title: "Todo",
                status: "todo",
                tasks: [
                    {
                        id: "task-1",
                        position: 0,
                        title: "First task",
                        text: "First task text",
                    },
                ],
            },
            {
                id: "column-done",
                position: 1,
                title: "Done",
                status: "done",
                tasks: [],
            },
        ],
    }
}

describe("boardReducer", () => {
    it("adds a task to the selected column", () => {
        vi.spyOn(crypto, "randomUUID").mockReturnValue("00000000-0000-4000-8000-000000000002")

        const nextBoard = boardReducer(createBoard(), {
            type: "task-added",
            columnId: "column-todo",
            taskTitle: "Second task",
            taskText: "Second task text",
        })

        expect(nextBoard.columns[0].tasks).toEqual([
            {
                id: "task-1",
                position: 0,
                title: "First task",
                text: "First task text",
            },
            {
                id: "00000000-0000-4000-8000-000000000002",
                position: 1,
                title: "Second task",
                text: "Second task text",
            },
        ])
    })

    it("deletes a task from the selected column", () => {
        const nextBoard = boardReducer(createBoard(), {
            type: "task-deleted",
            columnId: "column-todo",
            taskId: "task-1",
        })

        expect(nextBoard.columns[0].tasks).toEqual([])
    })

    it("moves a task to the target status column", () => {
        const nextBoard = boardReducer(createBoard(), {
            type: "task-moved",
            taskId: "task-1",
            columnStatus: "done",
        })

        expect(nextBoard.columns[0].tasks).toEqual([])
        expect(nextBoard.columns[1].tasks).toEqual([
            {
                id: "task-1",
                position: 0,
                title: "First task",
                text: "First task text",
            },
        ])
    })

    it("edits a task in the selected column", () => {
        const nextBoard = boardReducer(createBoard(), {
            type: "task-edited",
            columnId: "column-todo",
            taskId: "task-1",
            taskTitle: "Updated task",
            taskText: "Updated task text",
        })

        expect(nextBoard.columns[0].tasks[0]).toEqual({
            id: "task-1",
            position: 0,
            title: "Updated task",
            text: "Updated task text",
        })
    })

    it("resets the board", () => {
        const resetBoard = {
            ...createBoard(),
            title: "Reset Board",
        }

        const nextBoard = boardReducer(createBoard(), {
            type: "board-reset",
            board: resetBoard,
        })

        expect(nextBoard).toBe(resetBoard)
    })
})

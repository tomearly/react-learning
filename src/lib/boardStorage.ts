import type { BoardState } from "@/types/BoardState"

export function loadBoardData(storageKey: string, initialBoardData: BoardState): BoardState {
  const savedBoardData = localStorage.getItem(storageKey)

  if (!savedBoardData) {
    return initialBoardData
  }

  try {
    return JSON.parse(savedBoardData) as BoardState
  } catch (error) {
    throw new Error(`Could not parse board data from localStorage key "${storageKey}".`, {
      cause: error,
    })
  }
}

export function saveBoardData(storageKey: string, boardData: BoardState): void {
  localStorage.setItem(storageKey, JSON.stringify(boardData))
}

export function clearBoardData(storageKey: string): void {
  localStorage.removeItem(storageKey)
}
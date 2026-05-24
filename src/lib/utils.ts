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

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
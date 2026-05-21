import type { TaskState } from "@/types/TaskState";

export type TaskAction =
  | { type: "add-drink"; task: TaskState };
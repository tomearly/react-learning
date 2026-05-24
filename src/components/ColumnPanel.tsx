import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import TaskCard from '@/components/TaskCard'
import AddTaskFormDialog from './AddTaskFormDialog';
import EditTaskFormDialog from './EditTaskFormDialog';

import type { AddTaskHandler } from '@/types/AddTaskHandler';
import type { Column } from '@/types/ColumnState'
import type { DeleteTaskHandler } from '@/types/DeleteTaskHandler';
import type { MoveToHandler } from '@/types/MoveToHandler';
import type { EditTaskHandler } from "@/types/EditTaskHandler";
import type { TaskState } from '@/types/TaskState';

type ColumnPanelProps = {
    columns: Column[],
    addTask: AddTaskHandler,
    deleteTask: DeleteTaskHandler,
    moveToColumn: MoveToHandler,
    editTask: EditTaskHandler
}

function ColumnPanel({ columns, addTask, deleteTask, moveToColumn, editTask }: ColumnPanelProps) {

    const [showAddTaskFormDialog, setShowAddTaskFormDialog] = useState(false);
    const [showEditTaskFormDialog, setShowEditTaskFormDialog] = useState(false);
    const [selectedColumnId, setSelectedColumnId] = useState<string | null>(null)
    const [selectedColumnTitle, setSelectedColumnTitle] = useState<string | null>(null)
    const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null)
    const [selectedTaskTitle, setSelectedTaskTitle] = useState('')
    const [selectedTaskText, setSelectedTaskText] = useState('')

    const showAddTaskDialogForColumn = function(column: Column) {
        setShowAddTaskFormDialog(true)
        setSelectedColumnId(column.id)
        setSelectedColumnTitle(column.title)
    }

    const addTaskToSelectedColumn = function(taskTitle: string, taskText: string) {
        if (selectedColumnId === null) {
            throw new Error("Cannot add task because no column is selected.")
        }

        addTask(selectedColumnId, taskTitle, taskText)
    }

    const showEditTaskDialogForTask = function(column: Column, task: TaskState) {
        setShowEditTaskFormDialog(true)
        setSelectedColumnId(column.id)
        setSelectedTaskId(task.id)
        setSelectedTaskTitle(task.title)
        setSelectedTaskText(task.text)
    }

    const editSelectedTask = function(taskTitle: string, taskText: string) {
        if (selectedColumnId === null) {
            throw new Error("Cannot edit task because no column is selected.")
        }

        if (selectedTaskId === null) {
            throw new Error("Cannot edit task because no task is selected.")
        }

        editTask(selectedColumnId, selectedTaskId, taskTitle, taskText)
    }

    return (
        <>
            <section className="grid gap-4 md:grid-cols-3">
                {columns.map((column) => (
                    <section key={column.id} className="h-full">
                        <Card className="bg-background h-full">
                            <CardHeader>
                                <CardTitle className="my-4">{column.title}</CardTitle>
                                <Button onClick={() => showAddTaskDialogForColumn(column)}>
                                    Add a task
                                </Button>
                            </CardHeader>
                            <CardContent className="space-y-3">
                                {column.tasks.map((task) => (
                                    <TaskCard
                                        key={task.id}
                                        task={task}
                                        deleteTask={(taskId) => deleteTask(column.id, taskId)}
                                        moveToColumn={(taskId, columnStatus) => moveToColumn(taskId, columnStatus)}
                                        columnStatus={column.status}
                                        editTask={() => showEditTaskDialogForTask(column, task)}
                                    />
                                ))}
                            </CardContent>
                        </Card>
                    </section>
                ))}
            </section>
            {showAddTaskFormDialog && 
                <AddTaskFormDialog open={showAddTaskFormDialog}
                    onOpenChange={setShowAddTaskFormDialog}
                    selectedColumnTitle={selectedColumnTitle}
                    onAddTask={addTaskToSelectedColumn}
                >
                </AddTaskFormDialog>
            }
            {showEditTaskFormDialog &&
                 <EditTaskFormDialog open={showEditTaskFormDialog}
                    onOpenChange={setShowEditTaskFormDialog}
                    initialTaskTitle={selectedTaskTitle}
                    initialTaskText={selectedTaskText}
                    onEditTask={editSelectedTask}
                >
                </EditTaskFormDialog>
            }
        </>
    )
};

export default ColumnPanel;

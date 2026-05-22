import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import TaskCard from '@/components/TaskCard'
import AddTaskFormDialog from './AddTaskFormDialog';

import type { AddTaskHandler } from '@/types/AddTaskHandler';
import type { Column } from '@/types/ColumnState'
import type { DeleteTaskHandler } from '@/types/DeleteTaskHandler';

type ColumnPanelProps = {
    columns: Column[],
    addTask: AddTaskHandler,
    deleteTask: DeleteTaskHandler,
}

function ColumnPanel({ columns, addTask, deleteTask }: ColumnPanelProps) {

    const [showAddTaskFormDialog, setShowAddTaskFormDialog] = useState(false);
    const [selectedColumnId, setSelectedColumnId] = useState<string | null>(null)
    const [selectedColumnTitle, setSelectedColumnTitle] = useState<string | null>(null)

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
        </>
    )
};

export default ColumnPanel;

import { useState } from 'react';
import type { Column } from '@/types/Column'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import TaskCard from '@/components/TaskCard'
import { Button } from './ui/button';
import AddTaskFormDialog from './AddTaskFormDialog';

type ColumnPanelProps = {
    columns: Column[]
}

function ColumnPanel({ columns }: ColumnPanelProps) {

    const [showAddTaskFormDialog, setShowAddTaskFormDialog] = useState(false);
    const [selectedColumnId, setSelectedColumnId] = useState<string | null>(null)
    const [selectedColumnTitle, setSelectedColumnTitle] = useState<string | null>(null)

    const showAddTaskDialogForColumn = function(column: Column) {
        setShowAddTaskFormDialog(true)
        setSelectedColumnId(column.id)
        setSelectedColumnTitle(column.title)
    }

    return (
        <>
            <section className="grid gap-4 md:grid-cols-3">
                {columns.map((column) => (
                    <section key={column.id}>
                        <Card className="bg-background">
                            <CardHeader>
                                <CardTitle className="my-4">{column.title}</CardTitle>
                                <Button onClick={() => showAddTaskDialogForColumn(column)}>
                                    Add a task
                                </Button>
                            </CardHeader>
                            <CardContent className="space-y-3">
                                {column.tasks.map((task) => (
                                    <TaskCard key={task.id} task={task} />
                                ))}
                            </CardContent>
                        </Card>
                    </section>
                ))}
            </section>
            {showAddTaskFormDialog && 
                <AddTaskFormDialog open={showAddTaskFormDialog}
                    onOpenChange={setShowAddTaskFormDialog}
                    selectedColumnId={selectedColumnId}
                    selectedColumnTitle={selectedColumnTitle}
                >
                </AddTaskFormDialog>
            }
        </>
    )
};

export default ColumnPanel;

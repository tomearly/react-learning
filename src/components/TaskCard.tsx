import { memo } from 'react';
import type { TaskState } from '@/types/TaskState';
import { Card, CardTitle, CardContent, CardHeader } from './ui/card';
import { Button } from './ui/button';
import { Item } from './ui/item';
import type { ColumnStatus } from '@/types/ColumnStatus';
import { validateTaskMove } from '@/lib/utils';

const moveTargets: { status: ColumnStatus, label: string }[] = [
    { status: 'todo', label: 'Todo' },
    { status: 'in_progress', label: 'In progress' },
    { status: 'done', label: 'Done' },
]

type TaskCardProps = {
    task: TaskState,
    deleteTask: (id: string) => void,
    moveToColumn: (id: string, columnStatus: ColumnStatus) => void,
    columnStatus: ColumnStatus,
    editTask: (id: string) => void,
}

function TaskCard({task, deleteTask, moveToColumn, columnStatus, editTask}: TaskCardProps) {
    return (
        <Card className="gap-3 p-4">
            <CardHeader className="flex-row items-start justify-between gap-3 p-0">
                <CardTitle>{task.title}</CardTitle>
                <Item className="pl-0 flex space-x-1">
                    <Button size="sm" variant="outline" onClick={() => editTask(task.id)}>
                        Edit
                    </Button>
                    <Button variant="destructive" size="sm" onClick={() => deleteTask(task.id)}>
                        Delete
                    </Button>
                </Item>

            </CardHeader>
            <CardContent className="space-y-3 p-0">
                <p className="text-sm text-muted-foreground">{task.text}</p>
                <div className="flex flex-wrap gap-2">
                    {moveTargets
                        .filter((target) => validateTaskMove(columnStatus, target.status))
                        .map((target) => (
                            <Button
                                key={target.status}
                                type="button"
                                variant="outline"
                                size="sm"
                                onClick={() => moveToColumn(task.id, target.status)}
                            >
                                Move to {target.label}
                            </Button>
                        ))}
                    
                </div>
            </CardContent>
        </Card>
    )
}

export default memo(TaskCard);

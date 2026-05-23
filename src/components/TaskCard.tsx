import type { TaskState } from '@/types/TaskState';
import { Card, CardTitle, CardContent, CardHeader } from './ui/card';
import { Button } from './ui/button';
import type { ColumnStatus } from '@/types/ColumnStatus';
import { validateTaskMove } from '@/lib/utils';

type TaskCardProps = {
    task: TaskState,
    deleteTask: (id: string) => void,
    moveToColumn: (id: string, collumnStatus: ColumnStatus) => void,
    columnStatus: ColumnStatus
}

function TaskCard({task, deleteTask, moveToColumn, columnStatus}: TaskCardProps) {
    return (
        <Card className="p-4">
            <CardHeader className="p-0 flex justify-between">
                <CardTitle>{task.title}</CardTitle>
                <Button onClick={() => deleteTask(task.id)}>Delete Task</Button>
                { validateTaskMove(columnStatus, 'todo') && <Button onClick={() => moveToColumn(task.id, 'todo')}>Move to todo</Button>}
                { validateTaskMove(columnStatus, 'in_progress') && <Button onClick={() => moveToColumn(task.id, 'in_progress')}>Move to in progress</Button>}
                { validateTaskMove(columnStatus, 'done') && <Button onClick={() => moveToColumn(task.id, 'done')}>Move to done</Button>}
            </CardHeader>
            <CardContent className='p-0'>
                {task.text}
            </CardContent>
        </Card>
    )
}

export default TaskCard;
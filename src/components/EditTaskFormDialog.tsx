import { useState, type FormEvent } from "react"

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog"
import {
    Button,
} from "@/components/ui/button"
import {
    FieldGroup,
    Field,
} from "@/components/ui/field"
import {
    Label
} from "@/components/ui/label"
import {
    Input
} from "@/components/ui/input"

import FormAlert from "@/components/base/FormAlert"

import { stringLengthValidation } from "@/lib/utils"

type EditTaskFormDialogProps = {
    open: boolean | undefined,
    onOpenChange: (open: boolean) => void,
    initialTaskTitle: string,
    initialTaskText: string,
    onEditTask: (
        taskTitle: string,
        taskText: string,
    ) => void
}


function EditTaskFormDialog({ open, onOpenChange, initialTaskTitle, initialTaskText, onEditTask }: EditTaskFormDialogProps) {

    const [taskTitle, setTaskTitle] = useState(initialTaskTitle);
    const [taskText, setTaskText] = useState(initialTaskText);

    const resetForm = () => {
        setTaskTitle(initialTaskTitle)
        setTaskText(initialTaskText)
        setValidationMessages([])
    }

    const [validationMessages, setValidationMessages] = useState<string[]>([])

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        const nextValidationMessages: string[] = []

        const titleMessage = stringLengthValidation(taskTitle, 'Title', 3)
        const textMessage = stringLengthValidation(taskText, 'Text', 3)

        if (titleMessage) {
            nextValidationMessages.push(titleMessage)
        }

        if (textMessage) {
            nextValidationMessages.push(textMessage)
        }

        if (nextValidationMessages.length > 0) {
            setValidationMessages(nextValidationMessages)
            return;
        }

        setValidationMessages([])

        onEditTask(taskTitle, taskText)
        resetForm()
        onOpenChange(false)
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Edit task</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit}>
                    <FieldGroup className="pb-4">
                        <Field>
                            <Label htmlFor="title-1">Title</Label>
                            <Input id="title-1" value={taskTitle} name="title" onChange={(e) => setTaskTitle(e.target.value)} />
                        </Field>
                        <Field>
                            <Label htmlFor="text-1">Text</Label>
                            <Input id="text-1" value={taskText} name="text" onChange={(e) => setTaskText(e.target.value)} />
                        </Field>
                        <FormAlert validationMessages={validationMessages} />
                    </FieldGroup>
                    <DialogFooter>
                        <Button type="submit">Save Task</Button>
                        <Button type="button" variant="destructive" onClick={(() => {resetForm(); onOpenChange(false) })}>Cancel</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}

export default EditTaskFormDialog;

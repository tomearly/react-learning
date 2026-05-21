import { useState, type SubmitEvent } from "react"

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

type AddTaskFormDialogProps = {
    open: boolean | undefined,
    onOpenChange: (open: boolean) => void,
    selectedColumnTitle: string | null,
    onAddTask: (
        taskTitle: string,
        taskText: string,
    ) => void
}

function AddTaskFormDialog({ open, onOpenChange, selectedColumnTitle, onAddTask }: AddTaskFormDialogProps) {

    const [taskTitle, setTaskTitle] = useState('');
    const [taskText, setTaskText] = useState('');

    const [validationMessages, setValidationMessages] = useState<string[]>([])

    const handleSubmit = (event: SubmitEvent) => {
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

        onAddTask(taskTitle, taskText)
        onOpenChange(false)
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Add task to the {selectedColumnTitle} column</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit}>
                    <FieldGroup className="pb-4">
                        <Field>
                            <Label htmlFor="title-1">Title</Label>
                            <Input id="title-1" name="title" onChange={(e) => setTaskTitle(e.target.value)} />
                        </Field>
                        <Field>
                            <Label htmlFor="text-1">Text</Label>
                            <Input id="text-1" name="text" onChange={(e) => setTaskText(e.target.value)} />
                        </Field>
                        <FormAlert validationMessages={validationMessages}/>
                    </FieldGroup>
                    <DialogFooter>
                        <Button type="submit">Add Task</Button>
                        <Button type="button" variant="destructive" onClick={(() => onOpenChange(false))}>Cancel</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}

export default AddTaskFormDialog;
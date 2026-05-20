import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
    DialogDescription,
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

type AddTaskFormDialogProps = {
    open: boolean | undefined,
    onOpenChange: (open: boolean) => void,
    selectedColumnId: string | null,
    selectedColumnTitle: string | null
}

function AddTaskFormDialog({ open, onOpenChange, selectedColumnId, selectedColumnTitle }: AddTaskFormDialogProps) {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Add task to the {selectedColumnTitle} column</DialogTitle>
                </DialogHeader>
                <FieldGroup>
                    <Field>
                    <Label htmlFor="title-1">Title</Label>
                    <Input id="title-1" name="title" />
                    </Field>
                    <Field>
                    <Label htmlFor="text-1">Text</Label>
                    <Input id="text-1" name="text" />
                    </Field>
                </FieldGroup>
                <DialogFooter>
                    <Button>Add Task</Button>
                    <Button variant="destructive" onClick={(() => onOpenChange(false))}>Cancel</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default AddTaskFormDialog;
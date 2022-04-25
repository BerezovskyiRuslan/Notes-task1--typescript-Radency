import { INotes, state } from "../../state";

function deleteStateItem(id: string | number | null | undefined): void {
    let newStateNotes: INotes[] = state.notes.filter((item: INotes) => item.id != id)
    
    state.notes = newStateNotes;
}

function deleteStateAll(): void {
    let newStateNotes: INotes[] = state.notes.filter((item: INotes) => item.archive !== state.isArchiveVisible)

    state.notes = newStateNotes;
}

export { deleteStateItem, deleteStateAll }

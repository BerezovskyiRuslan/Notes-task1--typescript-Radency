import { INotes, state } from "../../state";

export default function addOrDeleteNotesToArchive(id: string | number | null | undefined) {
    let newStateNotes: INotes[] = state.notes.filter((item: INotes): INotes => {
        if (item.id == id) {
            item.archive = !item.archive;
        }
        return item
    });

    state.notes = newStateNotes;
}
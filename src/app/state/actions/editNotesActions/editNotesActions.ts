import { state, INotes } from "../../state";

export default function saveEditItemToState(data: INotes) {
    let newNotes: INotes[] = state.notes.map((item: INotes): INotes => {
        if (item.id == data.id) {
            item = {...item, ...data};

            return item;
        }

        return item;
    })
    
    state.notes = newNotes;
}
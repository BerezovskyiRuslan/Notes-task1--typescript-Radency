import { state } from "../../state";
import { ICreateOrEditNewNote } from "../../../controller/createController/createController";

export default function addNote(data: ICreateOrEditNewNote) {
    data.id = state.notes.length.toString();
    state.notes = [...state.notes, data];
}
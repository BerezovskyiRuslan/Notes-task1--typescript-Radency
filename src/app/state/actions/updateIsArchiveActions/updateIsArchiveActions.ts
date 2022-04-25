import { state } from "../../state";

export default function updateIsArchiveVisible () {
    state.isArchiveVisible = !state.isArchiveVisible;
}
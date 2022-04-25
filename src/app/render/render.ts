import Home from "../template/homeTemplate/homeTemplate";
import CreateNotes from "../template/createOrEditTemplate/createOrEditTemplate";
import NoteListTemplate from "../template/notesListTemplate/notesListTemplate";
import Footer from "../template/footerTemplate/footerTemplate";
import { IState } from "../state/state";

 interface IRender {
    state: IState | {},
    element: Element,
    renderApp(): boolean
}

export default class Render implements IRender {
    public state;
    public element;

    constructor(state: IState, element: HTMLElement) {
        this.state = state;
        this.element = element;
    }

    renderApp() {
        if (!Object.keys(this.state).length) return false

        let appRender = new Home(this.state.notes, false, this.state.category).getTemplate();

        this.element.innerHTML = appRender;

        return true;
    }

    renderCreate() {
        let createNoteTemplate = new CreateNotes(true, this.state.category/*, null*/).getCreatOrEditTemplate();

        this.element.innerHTML = createNoteTemplate;
    }

    renderEdit(id: string | number | null | undefined) {
        let note = this.state.notes.filter(item => item.id == id)[0];
        let editNoteTemplate = new CreateNotes(false, this.state.category, this.element, note).getCreatOrEditTemplate();

        this.element.innerHTML = editNoteTemplate;
    }

    renderActiveOrArchiveList(archive: boolean, elem: HTMLElement) {
        let newList: string = new NoteListTemplate(this.state.notes, this.state.category, archive).getNotesList();
        
        elem.innerHTML = newList;
    }

    renderFooter() {
        let footer: string = new Footer(this.state.notes, this.state.category).getFooterList();

        document.getElementById('footer')!.innerHTML = footer;
    }
}







// export {renderApp};
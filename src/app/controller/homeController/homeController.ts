import { IController, Controller } from './../controller';
import updateIsArchiveVisible from "../../state/actions/updateIsArchiveActions/updateIsArchiveActions";
import { deleteStateItem, deleteStateAll } from '../../state/actions/deleteNotesActions/deleteNotesActions';
import addOrDeleteNotesToArchive from "../../state/actions/addOrDeleteToArchiveActions/addOrDeleteToArchiveActions";
import { 
    showFormCreateNoteEvent,
    checkVisibleList,
    deleteNoteToState,
    deleteAllNotesToState,
    addOrDeleteToArchive,
    editItemNotes,
    saveEditNote,
    showItemFull,
    closeForm
} from "../../events/events";

interface IHomeController extends IController {
    renderHome(): void,
    renderNodesList(): void,
    deleteNoteToList(id: number): void,
    deleteAllNotesToList(): void,
    addOrDeleteToArchive(id: number): void,
    editNote(id: number): void,
    visibleIconArchive(id: number): void,
    visibleFullNote(id: number): void
}   

export default class HomeController extends Controller implements IHomeController {
    constructor(mainElement: HTMLElement | any = null) {
        super(mainElement)
    }


    renderHome() {
        let render = new Promise((resolve, reject) => {
            resolve(this.render.renderApp());
        })
        
        render.then(() => {
            showFormCreateNoteEvent();
            checkVisibleList();
            deleteNoteToState();
            deleteAllNotesToState();
            addOrDeleteToArchive();
            editItemNotes();
            showItemFull();
        })
    }

    renderNodesList() {
        super.setArchive();
        
        let listNotes: HTMLElement = document.getElementById('notes-list')!;

        updateIsArchiveVisible();

        this.render.renderActiveOrArchiveList(super.getArchive(), listNotes);

        this.visibleIconArchive();

        deleteNoteToState();
        addOrDeleteToArchive();
        editItemNotes();
        showItemFull();
    }

    deleteNoteToList(id: string | number | null | undefined) {
        let listNotes: HTMLElement = document.getElementById('notes-list')!;

        deleteStateItem(id);

        this.render.renderActiveOrArchiveList(super.getArchive(), listNotes);
        this.render.renderFooter();

        deleteNoteToState();
        addOrDeleteToArchive();
        editItemNotes();
        showItemFull();
    }

    deleteAllNotesToList() {
        let listNotes: HTMLElement = document.getElementById('notes-list')!;

        deleteStateAll();

        this.render.renderActiveOrArchiveList(super.getArchive(), listNotes);
        this.render.renderFooter();

        deleteAllNotesToState();
        editItemNotes();
        showItemFull();
    }

    addOrDeleteToArchive(id: string | number | null | undefined) {
        addOrDeleteNotesToArchive(id);

        let listNotes: HTMLElement = document.getElementById('notes-list')!;

        this.render.renderActiveOrArchiveList(this.getArchive(), listNotes);
        this.render.renderFooter();

        deleteNoteToState();
        addOrDeleteToArchive();
        editItemNotes();
        showItemFull();
    }

    editNote(id: string | number | null | undefined) {
        this.render.renderEdit(id);

        saveEditNote();
        closeForm();         
    }

    visibleIconArchive() {
        let noteIcon: string = `<svg xmlns="http://www.w3.org/2000/svg" class="header-button-icon" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
                            <path fill-rule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clip-rule="evenodd" />
                        </svg>`
        let archiveIcon: string = `<svg xmlns="http://www.w3.org/2000/svg" class="header-button-icon" viewBox="0 0 20 20"
                                fill="currentColor">
                                <path d="M4 3a2 2 0 100 4h12a2 2 0 100-4H4z" />
                                <path fill-rule="evenodd"
                                    d="M3 8h14v7a2 2 0 01-2 2H5a2 2 0 01-2-2V8zm5 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z"
                                    clip-rule="evenodd" />
                            </svg>`

        let buttonVisibleArchive: HTMLElement = document.getElementById('visible-list')!;
        
        buttonVisibleArchive.innerHTML = this.getArchive() ? noteIcon : archiveIcon;


    }

    visibleFullNote(id: string | number | null | undefined) {
        let fullNotes: NodeListOf<HTMLElement> = document.querySelectorAll('.content-list-notes-item-full')!;
        let visibleIcon: NodeListOf<HTMLElement> = document.querySelectorAll('.container-visible-icon')!;
        let itemNote: HTMLElement | any;
        let visibleItemNote: HTMLElement | any;

        fullNotes.forEach((element: HTMLElement, index: number) => {
            if (element.getAttribute('name') == id?.toString()) {
                itemNote = element;
                visibleItemNote = visibleIcon[index]
            }
        });

        if (itemNote.classList.contains('display-none')) {

            itemNote.classList.remove('display-none');
            visibleItemNote.style.transform = 'rotate(180deg)';

        } else {

            itemNote.classList.add('display-none');
            visibleItemNote.style.transform = 'rotate(0deg)';
            
        }
    }

}
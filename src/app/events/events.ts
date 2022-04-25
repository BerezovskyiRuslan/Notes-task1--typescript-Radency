import { ICreateController, ICreateOrEditNewNote } from './../controller/createController/createController';
import CreateController from "../controller/createController/createController";
import HomeController from "../controller/homeController/homeController";
import { INotes } from '../state/state';
interface HTMLAttribute extends Element {
    name: string
}

function showFormCreateNoteEvent(): void {
    let event: HTMLElement = document.getElementById('create-note')!;
    
    event.addEventListener('click', (): void => {
        new CreateController().renderCreateNote();
    })
}   

function checkVisibleList(): void {
    let event: HTMLElement = document.getElementById('visible-list')!;

    event.addEventListener('click', (): void => {
        new HomeController().renderNodesList();
    })
}

function getNameActiveElement(): HTMLAttribute | null {
    return document.activeElement as HTMLAttribute | null
}

function deleteNoteToState(): void {
    let events: NodeListOf<HTMLElement> = document.querySelectorAll('.delete-item')!;

    
    
    events.forEach((element: HTMLElement)  => {
        element.addEventListener('click', (event: Event): void => {
            event.stopPropagation();

            new HomeController().deleteNoteToList(getNameActiveElement()?.name);
        })
    })
}

function deleteAllNotesToState(): void {
    let event: HTMLElement = document.getElementById('delete-all-notes')!;

    event.addEventListener('click', (): void => {
        new HomeController().deleteAllNotesToList();
    })
}

function createNewNote() {
    let event: HTMLElement = document.getElementById('create-new-note')!;

    event.addEventListener('click', () => {
        let date = new Date() as Date;
        let month = date.toLocaleDateString('en-US', {
            month: 'long'
        }) as string;
        let day = date.getDate() as number;
        let year = date.getFullYear() as number;
        let select = document.getElementById('select-create-note') as HTMLSelectElement;
        let name = (document.getElementById('name-create-note') as HTMLInputElement).value as string;
        let category = select.options[select.selectedIndex].value as string;
        let content = (document.getElementById('content-create-note') as HTMLInputElement).value as string;
        let dates = content.match(/[0-3]?[0-9].[0-3]?[0-9].(?:[0-9]{2})?[0-9]{2}/g) as RegExpMatchArray | null;
        let created = (month + ' ' + day + ', ' + year) as string;
        let archive = false as boolean;

        dates = dates !== null ? dates : [];
        
        let data: INotes = {
            name: name,
            created: created,
            category: category,
            content: content,
            dates: dates,
            archive: archive
        }
        
        new CreateController().createNewNote(data)
    })
}

function addOrDeleteToArchive(): void {
    let events: NodeListOf<Element> = document.querySelectorAll('.add-or-delete-archive');

    events.forEach((element: Element): void => {
        element.addEventListener('click', (event: Event): void => {
            event.stopPropagation();
            new HomeController().addOrDeleteToArchive(getNameActiveElement()?.name);
        })
    })
}

function editItemNotes(): void {
    let events: NodeListOf<Element> = document.querySelectorAll('.edit-note');
    console.log(events)
    events.forEach((element: Element): void => {
        element.addEventListener('click', (event: Event): void => {
            event.stopPropagation();
            new HomeController().editNote(getNameActiveElement()?.name);
        });
    });
}

function saveEditNote() {
    let event = document.getElementById('save-edit-note') as HTMLAttribute | null;

    if(!event) return;

    event.addEventListener('click', (): void => {
        let select = document.getElementById('select-create-note') as HTMLSelectElement;
        let name = (document.getElementById('name-create-note') as HTMLInputElement).value as string;
        let category = select.options[select.selectedIndex].value as string;
        let content = (document.getElementById('content-create-note') as HTMLInputElement).value as string;
        let dates = content.match(/[0-3]?[0-9].[0-3]?[0-9].(?:[0-9]{2})?[0-9]{2}/g) as RegExpMatchArray | null;
        dates = dates !== null ? dates : [];

        let data: INotes = {
            id: event?.name.length ? event?.name : '',
            name: name,
            category: category,
            content: content,
            dates: dates
        }

        new CreateController().saveEditItemNote(data)

    })
}

function showItemFull(): void {
    let event: NodeListOf<Element> = document.querySelectorAll('.container-content-list-notes-items')

    event.forEach((element: Element) => {
        element.addEventListener('click', (): void => {

            new HomeController().visibleFullNote(element.getAttribute('name') as string | null | undefined);
       
        })
    })
}

function closeForm(): void {
    let event: HTMLElement = document.getElementById('close-form')!;

    if(!event) return;

    event.addEventListener('click', (): void => {
        new HomeController().renderHome();
    })
}



export { 
    showFormCreateNoteEvent,
    checkVisibleList,
    deleteNoteToState,
    deleteAllNotesToState,
    createNewNote,
    addOrDeleteToArchive,
    editItemNotes,
    saveEditNote,
    showItemFull,
    closeForm
};
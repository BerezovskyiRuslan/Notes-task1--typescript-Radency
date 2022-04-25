import { IController, Controller } from '../controller';
import addNote from '../../state/actions/addNotesActions/addNotesActions';
import saveEditItemToState from '../../state/actions/editNotesActions/editNotesActions';
import HomeController from '../homeController/homeController';
import { createNewNote, closeForm} from '../../events/events';

export interface ICreateController extends IController {
    renderCreateNote(): void,
    createNewNote(data:any): void,
    saveEditItemNote(data:any): void
}

export interface ICreateOrEditNewNote {
    id?: string,
    name: string,
    created?: string,
    category: string
    content: string,
    dates: string[],
    archive?: boolean
}

export default class CreateController extends Controller implements ICreateController {
    constructor(mainElement: HTMLElement | any = null) {
        super(mainElement);
    }

    renderCreateNote() {
        let result = new Promise((resolve, reject) => {
            resolve(this.render.renderCreate());
        })
        .then(() => {
            createNewNote();
            closeForm();
        })
    }

    createNewNote(data: ICreateOrEditNewNote) {
        if (!data.name.trim().length) {
            data.name = 'New Note';
        }
        addNote(data);

        new HomeController().renderHome();

    }

    saveEditItemNote(data: ICreateOrEditNewNote) {
        if (!data.name.trim().length) {
            data.name = 'Edit Note';
        }

        saveEditItemToState(data);

        new HomeController().renderHome();
    }
}
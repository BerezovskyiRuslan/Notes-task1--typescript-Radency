import NoteListTemplate from "../notesListTemplate/notesListTemplate";
import Footer from "../footerTemplate/footerTemplate";
import { INotes, ICategory } from "../../state/state";

interface IHome {
    data: INotes[],
    archive: boolean,
    category: ICategory[],
    getTemplate(): void
}

export default class Home implements IHome{
    public data;
    public archive;
    public category;

    constructor(data: INotes[], archive: boolean, category: ICategory[]) {
        this.data = data;
        this.archive = archive;
        this.category = category;
        
    }

    getTemplate() {
        let notesList = new NoteListTemplate(this.data, this.category, this.archive).getNotesList();
        let footerApp = new Footer(this.data, this.category).getFooterList();
        // let iconButtonArchive = this.archive ? this.noteIcon : this.archiveIcon;
        return `
            <div class="container-list-notes">
                <div class="header-list-notes">
                    <h1 class=" w-16 first-header-position header-list-notes-name">Name</h1>
                    <h1 class=" w-16 header-list-notes-name">Created</h1>
                    <h1 class=" w-16 header-list-notes-name">Category</h1>
                    <h1 class=" w-16 header-list-notes-name">Content</h1>
                    <h1 class=" w-16 header-list-notes-name">Dates</h1>
                    <div class="w-16 header-list-notes-name">
                        <button class="header-button" id="visible-list" title="archive All">
                           <svg xmlns="http://www.w3.org/2000/svg" class="header-button-icon" viewBox="0 0 20 20"
                                fill="currentColor">
                                <path d="M4 3a2 2 0 100 4h12a2 2 0 100-4H4z" />
                                <path fill-rule="evenodd"
                                    d="M3 8h14v7a2 2 0 01-2 2H5a2 2 0 01-2-2V8zm5 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z"
                                    clip-rule="evenodd" />
                            </svg
                        </button>
                        <button class="header-button" id="delete-all-notes" title="delete All">
                            <svg xmlns="http://www.w3.org/2000/svg" class="header-button-icon" viewBox="0 0 20 20"
                                fill="currentColor">
                                <path fill-rule="evenodd"
                                    d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                                    clip-rule="evenodd" />
                            </svg>
                        </button>
                    </div>
                    <div class="container-visible"></div>
                </div>
                <div class="content-list-notes" id="notes-list">
                    ${notesList}
                </div>
                <div class="container-button-create">
                    <button class="button-create" id="create-note">Create</button>
                </div>
            </div>
            
            <div class="container-list-notes">
                <div class="header-list-notes">
                    <h1 class="w-50 first-header-position header-list-notes-name ">Note Category</h1>
                    <h1 class="header-list-notes-name w-25">Active</h1>
                    <h1 class="header-list-notes-name w-25">Archive</h1>
                </div>
                <div class="content-list-notes">
                    <div id="footer">
                        ${footerApp}
                    </div>
                </div>
            </div>
        `
    }
}
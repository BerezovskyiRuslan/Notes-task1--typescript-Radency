import { ICategory, INotes } from "../../state/state";

interface INotesListTemplate {
    data: INotes[],
    category: ICategory[],
    archive: boolean,
    addArchiveIcon: string,
    deleteArchiveIcon: string,
    getIconCategory(categoryName: string): string,
    getTemplate(data: INotes): string,
    getNotesList(): string
}

export default class NoteListTemplate implements INotesListTemplate {
    public data;
    public category;
    public archive;
    public addArchiveIcon;
    public deleteArchiveIcon;
    constructor(data: INotes[], category: ICategory[], archive: boolean) {
        this.data = data;
        this.category = category;
        this.archive = archive;
        this.addArchiveIcon = `<svg xmlns="http://www.w3.org/2000/svg" class="content-list-notes-item-actions-button-icon" viewBox="0 0 20 20" fill="currentColor">
                                <path d="M4 3a2 2 0 100 4h12a2 2 0 100-4H4z" />
                                <path fill-rule="evenodd"
                                    d="M3 8h14v7a2 2 0 01-2 2H5a2 2 0 01-2-2V8zm5 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z"
                                    clip-rule="evenodd" />
                            </svg>`;
        this.deleteArchiveIcon = `<svg xmlns="http://www.w3.org/2000/svg" class="content-list-notes-item-actions-button-icon" viewBox="0 0 20 20" fill="currentColor">
                                    <path fill-rule="evenodd" d="M5 2a2 2 0 00-2 2v14l3.5-2 3.5 2 3.5-2 3.5 2V4a2 2 0 00-2-2H5zm4.707 3.707a1 1 0 00-1.414-1.414l-3 3a1 1 0 000 1.414l3 3a1 1 0 001.414-1.414L8.414 9H10a3 3 0 013 3v1a1 1 0 102 0v-1a5 5 0 00-5-5H8.414l1.293-1.293z" clip-rule="evenodd" />
                                </svg>`;

    }

    getIconCategory(categoryName: string) {
        return this.category.filter((item: ICategory) => item.name == categoryName)[0].icon as string;
    }

    getTemplate(data: INotes) {
        let icon = data.archive ? this.deleteArchiveIcon : this.addArchiveIcon as string;
        let iconCategory = this.getIconCategory(data.category) as string;
        return `<div class="container-content-list-notes-items" name="${data.id}">
            <div class="content-list-notes-item">
                <div class="w-16 first-content-position content-list-notes-item-text">
                    ${iconCategory}
                    <span class="content-list-notes-item-text-span">
                    ${data.name}
                    </span>
                </div>
                <div class="w-16 content-list-notes-item-text">
                    <span class="content-list-notes-item-text-span">
                        ${data.created}
                    </span>
                </div>
                <div class="w-16 content-list-notes-item-text">
                    <span class="content-list-notes-item-text-span">
                    ${data.category}
                    </span>
                </div>
                <div class="w-16 content-list-notes-item-text">
                    <span class="content-list-notes-item-text-span">
                        ${data.content}
                    </span>
                </div>
                <div class="w-16 content-list-notes-item-text">
                    <span class="content-list-notes-item-text-span">
                        ${data.dates}
                    </span>
                </div>
                <div class="w-16 content-list-notes-item-text">
                    <button class="content-list-notes-item-actions-button edit-note" name="${data.id}" title="edit">
                            <svg xmlns="http://www.w3.org/2000/svg" class="content-list-notes-item-actions-button-icon"
                                viewBox="0 0 20 20" fill="currentColor">
                                <path
                                    d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                            </svg>
                    </button>
                    <button name="${data.id}"class="add-archive content-list-notes-item-actions-button add-or-delete-archive" title="Add Archive">
                        ${icon}
                    </button>
                    <button name="${data.id}" class="content-list-notes-item-actions-button delete-item" title="Delete">
                        <svg xmlns="http://www.w3.org/2000/svg" class="content-list-notes-item-actions-button-icon" viewBox="0 0 20 20" fill="currentColor">
                            <path fill-rule="evenodd"
                                d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                                clip-rule="evenodd" />
                        </svg>
                    </button>
                </div>
                <div class="container-visible" >
                    <svg xmlns="http://www.w3.org/2000/svg" class="container-visible-icon" name="${data.id}" viewBox="0 0 20 20" fill="currentColor">
                        <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
                    </svg>
                </div>
            </div>
            <div class="content-list-notes-item-full display-none" name="${data.id}">
                <div class="content-list-notes-item-full-text">
                    <div class="content-list-notes-item-full-name-category">
                        <div class="content-list-notes-item-name-icon-container">
                            ${iconCategory}
                        </div>
                        <h3>${data.name}</h3>
                        <span>|</span>
                        <span class="content-list-notes-item-full-name-category-span">
                            ${data.category}
                        </span>
                    </div>
                    
                    <p>${data.created}</p>
                </div>
                <div class="content-list-notes-item-full-text-pre">
                    <pre id="render">${data.content}</pre>
                </div>
            </div>
        </div>
        `
    }

    getNotesList() {
        if (!this.data.length) {
            return '<p class="text-empty">Is Empty</p>';
        }
        let notes: INotes[] = this.data.filter((item: INotes) => item.archive === this.archive);
        
        if (!notes.length) {
            return '<p class="text-empty">Is Empty</p>';
        }

        let result: string = '';

        for (let i: number = 0; i < notes.length; i++) {
            result += this.getTemplate(notes[i]);
        }

        return result;
    }
    
}
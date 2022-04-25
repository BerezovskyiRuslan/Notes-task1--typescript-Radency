import Render from "../render/render";  
import { state, IState } from "../state/state";

export interface IController {
    app: HTMLElement,
    isArchive: boolean,
    state: IState,
    render: any,
    getArchive(): boolean,
    setArchive(): void
}

export class Controller implements IController {
   
    public app;
    public isArchive;
    public state;
    public render;

    constructor(mainElement: HTMLElement) {
        this.app = mainElement != null ? mainElement : document.getElementById('app')!;
        this.isArchive = state.isArchiveVisible;
        this.state = state;
        this.render = new Render(state, this.app);
    }

    getArchive() {
        return this.isArchive;
    }

    setArchive() {
        this.isArchive = !this.isArchive;
    }
}
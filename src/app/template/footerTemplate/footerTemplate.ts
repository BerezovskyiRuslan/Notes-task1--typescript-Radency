import { INotes, ICategory } from "../../state/state";

interface IFooter {
    data: INotes[],
    category: ICategory[],
    counterCondition(): IConditionItem | {},
    getTemplate(data: IConditionItem): string,
    getFooterList(): string
}

interface IConditionItem {
    name?: string,
    icon: string,
    active: number,
    archive: number
}

interface ICondition  {
    [name: string]: IConditionItem
}


export default class Footer implements IFooter {
    public data;
    public category;

    constructor(data: INotes[], category: ICategory[]) {
        this.data = data;
        this.category = category;
    }

    counterCondition() {
        let condition: ICondition = {};

        for (let i: number = 0; i < this.category.length; i++) {
            
            condition[this.category[i].name] = {
                name: this.category[i].name,
                icon: this.category[i].icon,
                active: 0,
                archive: 0
            };
            
            for (let j: number = 0; j < this.data.length; j++) {
                
                if (this.data[j].category === this.category[i].name) {
                    
                    if (this.data[j].archive) {
                        
                        condition[this.category[i].name]['archive'] += 1;
                        
                        continue;
                    }
                    
                    condition[this.category[i].name]['active'] = condition[this.category[i].name]['active'] + 1
                }
            }
        }

        return condition;
    }

    getTemplate(data: IConditionItem) {
        return `<div class="content-list-notes-item">
                    <div class="w-50 first-content-position content-list-notes-item-text ">
                        ${data.icon}
                        <span class="content-list-notes-item-text-span">${data.name}</span>
                    </div>
                    <div class="w-25 content-list-notes-item-text">
                        <span class="content-list-notes-item-text-span">${data.active}</span>
                    </div>
                    <div class="w-25 content-list-notes-item-text">
                        <span class="content-list-notes-item-text-span">${data.archive}</span>
                    </div>
                </div>`
    }

    getFooterList() {
        let condition: ICondition = this.counterCondition();
        
        let keys: string[] = Object.keys(condition);
        let result: string = '';

        for (let i: number = 0; i < keys.length; i++) {
            result += this.getTemplate(condition[keys[i]]);
        }

        return result
    }
}
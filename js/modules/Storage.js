import UI from './UI.js';

class Storage extends UI {

    constructor(title, content, id){
        super(title, content);
        this.id = id;
    }

    saveValue(){
        const values = {
            titleValue: this.title,
            contentValue: this.content,
            idValue: this.id
        };
        
        const { titleValue, contentValue, idValue } = values;

        const valueStorage = [titleValue,contentValue];

        localStorage.setItem(idValue, valueStorage);
    }

    getValues(){
        for(let i = 0; i < localStorage.length; i++){
            const key = localStorage.key(i);
            const items = localStorage.getItem(key);
            const fullItems = {
                key,
                items
            };

            return fullItems;
            
        }
    }

}

export default Storage;
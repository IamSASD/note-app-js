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
        
        let keys = '';
        for(let i = 0; i < localStorage.length; i++){
            keys += `${localStorage.key(i)},`;
        }
        const keySplit = keys.split(",");
        const filterKey = keySplit.filter(item => item != '');
        return filterKey;

    }

    removeItem(key){
        localStorage.removeItem(key);
    }

}

export default Storage;
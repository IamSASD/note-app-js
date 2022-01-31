import UI from './modules/UI.js';
import Storage from './modules/Storage.js'
import { buttonHead, buttonMain, exitPopUp, popUp, notesContainer, wrapperOpen, noteTitle, noteText, message, wrapperEdit } from './modules/Selectors.js'

let ui;
let storage;

eventListeners()
function eventListeners(){
    window.addEventListener('DOMContentLoaded', showItems);
    buttonHead.addEventListener('click', () => {
        ui = new UI();
        ui.showNewNoteForm();
    });
    buttonMain.addEventListener('click', () => {
        ui = new UI();
        ui.showNewNoteForm();
    });
    exitPopUp.addEventListener('click', () => {
        ui = new UI();
        ui.hideNewNoteForm();
    });
    popUp.addEventListener('submit', manageValues);
    notesContainer.addEventListener('click', (e) => {
        if(e.target.name == 'edit-option' || e.target.name == 'remove-option' || e.target.name == 'open-option'){
                optionsNote(e);
        }
    });
    wrapperOpen.addEventListener('click', (e) => {
        ui = new UI();
        ui.exitNote(e)
    });
    wrapperEdit.addEventListener('click', (e) => {
        e.preventDefault();
        if(e.target.name === 'exit-edit'){
            ui = new UI();
            ui.exitEditNote();
        }else if(e.target.name === 'save-changes'){
            const itemId = e.target.parentElement.parentElement.id;
            const newTitle = e.target.parentElement.parentElement[0].value;
            const newText = e.target.parentElement.parentElement[1].value;

            ui = new UI();
            storage = new Storage(newTitle, newText, itemId);
            storage.saveValue();
            notesContainer.innerHTML = '';
            showItems();
            ui.exitEditNote();
        }
        
    });
}

function manageValues(e){

    e.preventDefault();

    //Create Id
    const id = Date.now();

    const titleValue = noteTitle.value;
    const textValue = noteText.value;

    storage = new Storage(titleValue, textValue, id);
    ui = new UI();
    
    //Validator fields
    if(titleValue && textValue != ''){

        storage.saveValue(); //Save values in local storage
        notesContainer.innerHTML = '';
        showItems(); //show in the HTML
        ui.cleanForm();// clear fields
        ui.hideNewNoteForm();// close the pop up form

    }else{
        alert('One or more fields are empty');
    }
    
}

function showItems(){
    if(localStorage.length != 0){

        storage = new Storage();
        let keyItems = storage.getValues();
        keyItems.sort((a,b) => {
            return a - b;
        })
        keyItems.reverse()
        for(let i = 0; i < keyItems.length; i++){

            const getItems = localStorage.getItem(keyItems[i]);
            const itemSplit = getItems.split(",");

            ui = new UI(itemSplit[0], itemSplit[1]);

                const card = ui.cardNote();
                let divCreate = document.createElement('div');
                divCreate.className = 'card-note';
                divCreate.setAttribute('id', keyItems[i]);
                divCreate.innerHTML = card;

                notesContainer.appendChild(divCreate);

                if(message.style.display != 'none'){
                    ui.hideNewNoteMessage();
                }

        }
    }
}

function optionsNote(e){

    const titleContent = e.target.parentElement.previousElementSibling.children[0].textContent,
    textContent = e.target.parentElement.previousElementSibling.children[1].value;
    const idNote = e.target.parentElement.parentElement.id;

    storage = new Storage();
    ui = new UI(titleContent, textContent);

    if(e.target.name === 'remove-option'){

        storage.removeItem(idNote);
        e.target.parentElement.parentElement.remove();

        if(localStorage.length == 0){
            location.reload();
        }

    }else if(e.target.name === "open-option"){

        ui.OpenNote();

    }else if(e.target.name === 'edit-option'){

        ui.editNote(idNote);

    }

}




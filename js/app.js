import UI from './modules/UI.js';
import Storage from './modules/Storage.js'
import { buttonHead, buttonMain, exitPopUp, popUp, notesContainer, wrapperOpen, noteTitle, noteText, message } from './modules/Selectors.js'

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
    wrapperOpen.addEventListener('click', exitPopUpOption);
}

function exitPopUpOption(e){
    if(e.target.name == 'exit'){
        wrapperOpen.style.display = 'none';
        wrapperOpen.innerHTML = '';
    }
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

    storage = new Storage();
    ui = new UI(titleContent, textContent);

    if(e.target.name === 'remove-option'){
        const idNote = e.target.parentElement.parentElement.id;
        storage.removeItem(idNote);
        e.target.parentElement.parentElement.remove();
    }else if(e.target.name = "open-option"){
        ui.OpenNote();
    }

}




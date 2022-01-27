import UI from './modules/UI.js';
import Storage from './modules/Storage.js'

const buttonHead =  document.querySelector('.button-add-head');
const buttonMain =  document.querySelector('.button-add-main');
const popUp = document.querySelector('.pop-up-form');
const wrapper = document.querySelector('.wrapper');
const exitPopUp = document.querySelector('.exit') ;
const notesContainer = document.querySelector('.notes-container');
const message = document.querySelector('.empty-container');
let noteTitle = document.querySelector('.input-title');
let noteText = document.querySelector('.text-content');

//Options buttons
const removeOption = document.querySelector('.remove-option');
const editOption = document.querySelector('.edit-option');
const openOption = document.querySelector('.open-option');

let ui;
let storage;

eventListeners()
function eventListeners(){
    buttonHead.addEventListener('click', showPopUp);
    buttonMain.addEventListener('click', showPopUp);
    exitPopUp.addEventListener('click', closedPopUp);
    popUp.addEventListener('submit', manageValues);
    window.addEventListener('DOMContentLoaded', showItems);
    notesContainer.addEventListener('click', options);
}

function showPopUp(){
    wrapper.style.display = 'block';
}

function closedPopUp(){
    wrapper.style.display = 'none';
}


function manageValues(e){

    e.preventDefault();

    //Create Id
    const id = Date.now();

    const titleValue = noteTitle.value;
    const textValue = noteText.value;

    storage = new Storage(titleValue, textValue, id);
    
    //Validator fields
    if(noteText && noteTitle != ''){

        storage.saveValue(); //Save values in local storage
        notesContainer.innerHTML = '';
        showItems(); //show in the HTML
        cleanInputs();// clear fields
        closedPopUp();// close the pop up form

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
                    hideMessage();
                }

        }
    }
}

function options(e){

    storage = new Storage();

    if(e.target.name === 'remove-option'){
        const idNote = e.target.parentElement.parentElement.id;
        storage.removeItem(idNote);
        e.target.parentElement.parentElement.remove();
    }

}

function hideMessage(){


    message.style.display = 'none';
    notesContainer.classList.remove('notes-container');
    notesContainer.classList.add('notes-container-grid');

}

function cleanInputs(){
    noteTitle.value = '';
    noteText.value = '';
}

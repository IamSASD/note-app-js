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


eventListeners()
function eventListeners(){
    buttonHead.addEventListener('click', showPopUp);
    buttonMain.addEventListener('click', showPopUp);
    exitPopUp.addEventListener('click', closedPopUp);
    popUp.addEventListener('submit', manageValues);
}

function showPopUp(){
    wrapper.style.display = 'block';
}

function closedPopUp(){
    wrapper.style.display = 'none';
}

let ui;
let storage;

function manageValues(e){

    e.preventDefault();

    //get note values
    const titleValue = noteTitle.value;
    const textValue = noteText.value;

    //create id
    const id = Date.now();

    storage = new Storage(titleValue, textValue, id);
    
    //Add values to local storage
    storage.saveValue();
    
    const getItems = storage.getValues();
    const { key, items } = getItems;
    const itemSplit = items.split(",");

    ui = new UI(itemSplit[0], itemSplit[1]);
    
    //validator for the fields
    if(titleValue && textValue != ''){

        const card = ui.cardNote();
        let divCreate = document.createElement('div');
        divCreate.className = 'card-note';
        divCreate.setAttribute('id', key);
        divCreate.innerHTML = card;

        notesContainer.appendChild(divCreate);

        //Clean Inputs
        cleanInputs();

        //close pop up form
        closedPopUp();

        if(message.style.display != 'none'){
            hideMessage();
        }

    }else{

        alert('One or more fields are ampty');

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

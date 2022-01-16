import UI from './modules/UI.js';

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

function manageValues(e){

    e.preventDefault();

    // Add new notes
    const titleValue = noteTitle.value;
    const textValue = noteText.value;

    ui = new UI(titleValue, textValue);

    //validator for the fields
    if(titleValue || textValue != ''){

        const card = ui.cardNote();
        let divCreate = document.createElement('div');
        divCreate.className = 'card-note';
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
    console.log(notesContainer);

    
}

function cleanInputs(){
    noteTitle.value = '';
    noteText.value = '';
}

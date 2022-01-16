import UI from './modules/UI.js';

const buttonHead =  document.querySelector('.button-add-head');
const buttonMain =  document.querySelector('.button-add-main');
const popUp = document.querySelector('.pop-up-form');
const wrapper = document.querySelector('.wrapper');
const exitPopUp = document.querySelector('.exit') ;
const notesContainer = document.querySelector('.notes-container');
const message = document.querySelector('.empty-container');


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
    const noteTitle = document.querySelector('.input-title').value;
    const noteText = document.querySelector('.text-content').value;

    ui = new UI(noteTitle, noteText);

    const card = ui.cardNote();
    let divCreate = document.createElement('div');
    divCreate.className = 'card-note';
    divCreate.innerHTML = card;

    notesContainer.appendChild(divCreate);


    closedPopUp();
    if(message.style.display != 'none'){
        hideMessage();
    }
}


function hideMessage(){
    
    
    message.style.display = 'none';
    notesContainer.classList.remove('notes-container');
    notesContainer.classList.add('notes-container-grid');
    console.log(notesContainer);

    
}

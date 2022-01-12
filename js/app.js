const buttonHead =  document.querySelector('.button-add-head');
const buttonMain =  document.querySelector('.button-add-main');
const popUp = document.querySelector('.pop-up-form');
const wrapper = document.querySelector('.wrapper');
const exitPopUp = document.querySelector('.exit') ;

eventListeners()
function eventListeners(){
    buttonHead.addEventListener('click', showPopUp);
    buttonMain.addEventListener('click', showPopUp);
    exitPopUp.addEventListener('click', closedPopUp);
    popUp.addEventListener('submit', getValues);
}

function showPopUp(){
    wrapper.style.display = 'block';
}

function closedPopUp(){
    wrapper.style.display = 'none';
}



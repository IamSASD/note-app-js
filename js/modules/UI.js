import { wrapperOpen, wrapper, popUp, message, notesContainer } from "./Selectors.js";
class UI {

    constructor(title, content){
        this.title = title;
        this.content = content;
    }

    cardNote(){
        const cardHtml = `

                <div class="card-content">
                
                    <p class="card-title">${this.title}</p>
                    <textarea class="card-text" readonly>${this.content}</textarea>

                </div>

                <div class="card-options">

                    <a class="far fa-edit" name="edit-option"></a>
                    <a class="far fa-trash-alt" name="remove-option"></a>
                    <a class="fas fa-external-link-alt" name="open-option"></a>

                </div>

        `;

        return cardHtml;
        
    }

    OpenNote(){
        const divWrapper = document.createElement('div');
        divWrapper.innerHTML = `
        
            <div class="container">

                <div class="open-card">
                    <div class="exit-open">
                
                        <a href="#" class="fas fa-times" name="exit"></a>

                    </div>

                    <p class="open-title">${this.title}</p>
                    <p class="open-text">${this.content}</p>
                </div>
            </div>
        `
        document.querySelector('.open-option').append(divWrapper);
        wrapperOpen.style.display = 'block';
    }

    showNewNoteForm(){
        wrapper.style.display = 'block';
    }

    hideNewNoteForm(){
        wrapper.style.display = 'none';
        this.cleanForm();
    }

    hideNewNoteMessage(){
        message.style.display = 'none';
        notesContainer.classList.remove('notes-container');
        notesContainer.classList.add('notes-container-grid');
    }

    cleanForm(){
        popUp.reset();
    }

    

}

export default UI;
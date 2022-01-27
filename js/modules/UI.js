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

    

}

export default UI;
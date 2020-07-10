// Card class

export default class Card {
    constructor({item, handleCardClick}) {
        this._name = item.name;
        this._link = item.link;
        this._handleCardClick = handleCardClick;
    }

    // card template
    _getTemplate(){
        const cardTemplate = document
            .querySelector("#card_template")
            .content
            .querySelector(".cards__item")
            .cloneNode(true);

        return cardTemplate;
    }

    // set event listeners for f delete, like and popup card image
    _setEventListeners(){
        this._element.addEventListener("click", (event) => {
            if (!event.target.classList.contains('cards__delete') && !event.target.classList.contains('cards__favourite')){
                this._handleCardClick({text: this._name, link: this._link});
            }
        });

        this._element.querySelector(".cards__favourite").addEventListener("click", (event) => {
            this._element.querySelector(".cards__favourite").classList.toggle("cards__favourite_active");
        });

        this._element.querySelector(".cards__delete").addEventListener("click", (event) => {
            this._element.closest('.cards__item').remove();
        });
    }



    // generate card
    generateCard() {
        this._element = this._getTemplate();
        this._setEventListeners();

        this._element.querySelector(".cards__title").textContent = this._name;
        this._element.querySelector(".cards__image").alt = this._name;
        this._element.querySelector(".cards__image").src = this._link;

        return this._element;
    }
}
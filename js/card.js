// Card class
export class Card {
    constructor(name, link) {
        this._name = name;
        this._link = link;
    };

    // card template
    _getTemplate(){
        const cardTemplate = document
            .querySelector("#card_template")
            .content
            .querySelector(".cards__item")
            .cloneNode(true);

        return cardTemplate;
    };

    // delete card
    _handleCardDelete(){
        this._element.querySelector(".cards__delete").addEventListener("click", (event) => {
            event.target.closest('.cards__item').remove();
        });
    };

    // like card
    _handleLikeCard(){
        this._element.querySelector(".cards__favourite").addEventListener("click", (event) => {
            event.target.classList.toggle("cards__favourite_active");
        });
    };

    // popup card image
    _handleOpenPopup(){
        this._element.addEventListener("click", (event) => {
            if (!event.target.classList.contains('cards__delete') && !event.target.classList.contains('cards__favourite')){

                document.querySelector(".openPicture-popup__img").setAttribute('src',this._link);
                document.querySelector(".openPicture-popup__text").textContent = this._name;
                document.querySelector(".popup").classList.add("popup_show");
                this._element.classList.remove("popup__body_show");
                document.querySelector(".openPicture-popup").classList.add("popup__body_show");
            }
        });
    };

    // generate card
    generateCard() {
        this._element = this._getTemplate();
        this._handleCardDelete();
        this._handleLikeCard();
        this._handleOpenPopup();

        this._element.querySelector(".cards__title").textContent = this._name;
        this._element.querySelector(".cards__image").src = this._link;

        return this._element;
    };
};
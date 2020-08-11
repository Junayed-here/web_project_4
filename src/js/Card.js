// Card class

import {api, ownerId} from "./constants";
import DeleteCard from "./deleteCard";

export default class Card {
    constructor({item, handleCardClick}) {
        this._name = item.name;
        this._link = item.link;
        this._id = item._id;
        this._initialLikes = item.likes;
        this._liked = false;
        this._owner_id = item.owner._id;
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

    _addLike(){
        api.cardLike({element:this._element, id: this._id},"PUT");
        this._liked = true;
    }
    _deleteLike(){
        api.cardLike({element:this._element, id: this._id},"DELETE");
        this._liked = false;
    }

    // set event listeners for f delete, like and popup card image
    _setEventListeners(){
        this._element.addEventListener("click", (event) => {
            if (!event.target.classList.contains('cards__delete') && !event.target.classList.contains('cards__favourite') && !event.target.classList.contains('cards__likes')){
                this._handleCardClick({text: this._name, link: this._link});
            }
        });

        this._element.querySelector(".cards__favourite").addEventListener("click", (event) => {
            if (this._liked){
                this._deleteLike();
            }else{
                this._addLike();
            }
        });

        this._element.querySelector(".cards__delete").addEventListener("click", (event) => {
            const confirmationPopup = new DeleteCard(".confirmation",this._id,this._element);
            confirmationPopup.open();
        });
    }


    // generate card
    generateCard() {
        this._element = this._getTemplate();
        this._setEventListeners();

        if (this._initialLikes.length > 0){
            this._initialLikes.forEach((item)=>{
                if (item._id === ownerId.value){
                    this._liked = true;
                }
            });
        }else{
            this._liked = false;
        }

        if (this._owner_id !== ownerId.value){
            this._element.querySelector(".cards__delete").classList.add("d-none");
        }
        if (this._liked){
            this._element.querySelector(".cards__favourite").classList.add("cards__favourite_active");
        }

        this._element.querySelector(".cards__likes").textContent = this._initialLikes.length;
        this._element.querySelector(".cards__title").textContent = this._name;
        this._element.querySelector(".cards__image").alt = this._name;
        this._element.querySelector(".cards__image").src = this._link;

        return this._element;
    }
}
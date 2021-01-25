// Card class

import {ownerId} from "../utils/constants";

export default class Card {
    constructor({item, handleCardClick, handleAddLike, handleDeleteLike, handleDeleteCard}) {
        this._name = item.name;
        this._link = item.link;
        this._id = item._id;
        this._initialLikes = item.likes;
        this._liked = false;
        this._owner_id = item.owner._id;
        this._handleCardClick = handleCardClick;
        this._handleAddLike = handleAddLike;
        this._handleDeleteLike = handleDeleteLike;
        this._handleDeleteCard = handleDeleteCard;
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
        this._handleAddLike(this._id)
            .then((likeCount) => {
                this._element.querySelector(".cards__favourite").classList.add("cards__favourite_active");
                this._element.querySelector(".cards__likes").textContent = likeCount;
            });
        this._liked = true;
    }
    _deleteLike(){
        this._handleDeleteLike(this._id)
            .then((likeCount) => {
                this._element.querySelector(".cards__favourite").classList.remove("cards__favourite_active");
                this._element.querySelector(".cards__likes").textContent = likeCount;
            });
        this._liked = false;
    }

    deleteCard(){
        this._element.remove();
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
            if (this._owner_id === ownerId.value) {
                this._handleDeleteCard(this._id);
            }
        });
    }


    // generate card
    generateCard() {
        this._element = this._getTemplate();
        this._setEventListeners();
        let name = this._name;

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
        this._element.querySelector(".cards__title").textContent = name;
        this._element.querySelector(".cards__image").alt = name;
        this._element.querySelector(".cards__image").src = this._link;

        return this._element;
    }
}
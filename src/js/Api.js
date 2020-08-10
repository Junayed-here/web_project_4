import {cardList, profileDesignation, profileName, profilePicture} from "./constants";
import Section from "./Section";
import Card from "./Card";
import PopupWithImage from "./PopupWithImage.js";

export default class Api {
    constructor(options) {
        this._baseURL = options.baseUrl;
        this._headers = options.headers;
    }

    getInitialCards() {
        fetch(this._baseURL+"/cards", {
            headers: this._headers
        })
        .then(res=>{
            if (res.ok){
                return res.json()
            }
            return Promise.reject(`Error: ${res.status}`);
        })
        .then((result) => {
            const initialCard = new Section({
                items: result,
                renderer: (item) => {
                    const card = new Card({item, handleCardClick:({text, link}) =>{
                            new PopupWithImage(".openPicture-popup").open({text, link});
                        }});
                    const cardElement = card.generateCard();
                    initialCard.setItem(cardElement);
                }
            }, cardList);
            initialCard.renderItems();
        })
        .catch((err) => {
            console.log(err);
        });
    }
    getUserInfo() {
        fetch(this._baseURL+"/users/me", {
            headers: this._headers
        })
        .then(res=>{
            if (res.ok){
                return res.json()
            }
            return Promise.reject(`Error: ${res.status}`);
        })
        .then((result) => {
            profileName.textContent = result.name;
            profileDesignation.textContent = result.about;
            ownerId.value = result._id;
            profilePicture.setAttribute('src', result.avatar);
        })
        .catch((err) => {
            console.log(err);
        });
    }
    addCard(item, close) {
        fetch(this._baseURL+"/cards", {
            method: "POST",
            headers: this._headers,
            body: JSON.stringify({
                name: item.name,
                link:  item.link
            })
        })
        .then(res=>{
            if (res.ok){
                return res.json()
            }
            return Promise.reject(`Error: ${res.status}`);
        })
        .then((result) => {
            item = result;
            const card = new Card({item, handleCardClick:({text, link}) =>{
                    new PopupWithImage(".openPicture-popup").open({text, link});
                }});
            const cardElement = card.generateCard();
            cardList.prepend(cardElement);
            close.closePopup();
        })
        .catch((err) => {
            console.log(err);
        });
    }
    updateUserInfo(info, close, dom) {
        fetch(this._baseURL+"/users/me", {
            method: "PATCH",
            headers: this._headers,
            body: JSON.stringify({
                name: info.name,
                about: info.link
            })
        })
            .then(res=>{
                if (res.ok){
                    return res.json()
                }
                return Promise.reject(`Error: ${res.status}`);
            })
            .then((result) => {
                dom.name.textContent = result.name;
                dom.designation.textContent = result.about;
                close.closePopup();
            })
            .catch((err) => {
                console.log(err);
            });
    }
    deleteCard(data,close) {
        fetch(this._baseURL+"/cards/"+data.id, {
            method: "DELETE",
            headers: this._headers
        })
            .then(res=>{
                if (res.ok){
                    return res.json()
                }
                return Promise.reject(`Error: ${res.status}`);
            })
            .then((result) => {
                data.card.remove();
                close.closePopup();
            })
            .catch((err) => {
                console.log(err);
            });
    }
    updateProfilePicture(url,close) {
        fetch(this._baseURL+"/users/me/avatar", {
            method: "PATCH",
            headers: this._headers,
            body: JSON.stringify({
                avatar : url
            })
        })
            .then(res=>{
                if (res.ok){
                    return res.json()
                }
                return Promise.reject(`Error: ${res.status}`);
            })
            .then((result) => {
                profilePicture.setAttribute('src', result.avatar);
                close.closePopup();
            })
            .catch((err) => {
                console.log(err);
            });
    }
    cardLike(data,method) {
        fetch(this._baseURL+"/cards/likes/"+ data.id, {
            method: method,
            headers: this._headers
        })
        .then(res=>{
            if (res.ok){
                return res.json()
            }
            return Promise.reject(`Error: ${res.status}`);
        })
        .then((result) => {
            if (method === "PUT"){
                data.element.querySelector(".cards__favourite").classList.add("cards__favourite_active");
            }else if (method === "DELETE"){
                data.element.querySelector(".cards__favourite").classList.remove("cards__favourite_active");
            }

            data.element.querySelector(".cards__likes").textContent = result.likes.length;
        })
        .catch((err) => {
            console.log(err);
        });
    }
}
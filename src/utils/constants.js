// All constant variables

export const profile = document.querySelector(".profile");
export const addCard = profile.querySelector(".button_role_add");
export const profileEdit = profile.querySelector(".button_role_edit");
export const cardList = document.querySelector(".cards__list");
export const formList = Array.from(document.querySelectorAll('.popup__form'));
export const updateImage = document.querySelector("#updateImage");
export const popupBoxActiveClass = document.querySelector(".popup_show");
export const ownerId = document.querySelector("#ownerId");
export const popupImgSrc = document.querySelector('.openPicture-popup__img');
export const popupImgText = document.querySelector('.openPicture-popup__text');
export const profilePicture  = document.querySelector(".profile__picture");
export const profileName = document.querySelector(".profile__name");
export const confirmButton = document.querySelector(".button_role_confirmation");
export const inputName = document.querySelector("#input-name");
export const inputJob = document.querySelector("#input-about");
import Api from '../components/Api.js';
export const api = new Api({
    baseUrl: "https://around.nomoreparties.co/v1/group-1",
    headers: {
        authorization: "d5a21fc1-e5d8-4165-b258-a43018ddec41",
        "Content-Type": "application/json"
    }
});
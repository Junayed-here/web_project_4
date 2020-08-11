// All constant variables

export const profile = document.querySelector(".profile");
export const profileName = document.querySelector(".profile__name");
export const profileDesignation  = document.querySelector(".profile__designation");
export const profilePicture  = document.querySelector(".profile__picture");
export const addCard = profile.querySelector(".button_role_add");
export const profileEdit = profile.querySelector(".button_role_edit");
export const cardList = document.querySelector(".cards__list");
export const formList = Array.from(document.querySelectorAll('.popup__form'));
export const updateImage = document.querySelector("#updateImage");
export const popupBoxActiveClass = document.querySelector(".popup_show");
export const popupBody = document.querySelectorAll(".popup__body");
export const formElementEdit = document.querySelector(".popup__edit-form");
export const nameInput = formElementEdit.querySelector("#input-name");
export const designationInput = formElementEdit.querySelector("#input-about");
export const formElementAddCard = document.querySelector(".add_card-form");
export const titleInput = formElementAddCard.querySelector("#input-card-name");
export const imageURLInput = formElementAddCard.querySelector("#input-img-link");
export const ownerId = document.querySelector("#ownerId");
import Api from './Api.js';
export const api = new Api({
    baseUrl: "https://around.nomoreparties.co/v1/group-1",
    headers: {
        authorization: "d5a21fc1-e5d8-4165-b258-a43018ddec41",
        "Content-Type": "application/json"
    }
});
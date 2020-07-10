// importing css file
import "../pages/index.css";
import Card from './Card.js';
import Section from './Section.js';
import FormValidator from './FormValidator.js';
import PopupWithImage from "./PopupWithImage.js";
import PopupWithForm from "./PopupWithForm.js";
import UserInfo from "./UserInfo.js";
import {
    initialCards,
    addCard,
    profileEdit,
    cardList,
    profileName,
    profileDesignation,
    titleInput,
    imageURLInput,
    nameInput,
    designationInput,
    formList
} from "./constants.js";


const initialCard = new Section({
    items: initialCards,
    renderer: (item) => {
        const card = new Card({item, handleCardClick:({text, link}) =>{
            new PopupWithImage(".openPicture-popup").open({text, link});
            }});
        const cardElement = card.generateCard();
        initialCard.setItem(cardElement);
    }
}, cardList);
initialCard.renderItems();


// Activate form validation
formList.forEach((formElement) => {
    const validate = new FormValidator({
        formSelector: ".popup__form",
        inputSelector: ".popup__input",
        submitButtonSelector: ".popup__button",
        inactiveButtonClass: "button_role_inactive",
        inputErrorClass: "popup__input-invalid",
        errorClass: "popup__input-error_active"
    },formElement);
    validate.enableValidation();
});


// Open add card box
addCard.addEventListener("click",()=>{
    new PopupWithForm(".addCard", {fromSubmission:(item) => {
            const card = new Card({item, handleCardClick:({text, link}) =>{
                    new PopupWithImage(".openPicture-popup").open({text, link});
                }});
            const cardElement = card.generateCard();
            cardList.prepend(cardElement);
        },inputs: {input1: titleInput, input2: imageURLInput}}).open();
});


// Open edit profile box
profileEdit.addEventListener("click", ()=>{
    new UserInfo({profileName, profileDesignation}).getUserInfo();
    new PopupWithForm(".profileEdit", {fromSubmission:(item) => {
            new UserInfo({profileName, profileDesignation}).setUserInfo(item);
        },inputs: {input1: nameInput, input2: designationInput}}).open();
});
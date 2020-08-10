// importing css file
import "../pages/index.css";
import Card from './Card.js';
import Section from './Section.js';
import FormValidator from './FormValidator.js';
import PopupWithImage from "./PopupWithImage.js";
import PopupWithForm from "./PopupWithForm.js";
import UserInfo from "./UserInfo.js";
import UpdateProfilePicture from "./updateProfilePicture";
import {
    authorizationCode,
    addCard,
    api,
    profileEdit,
    cardList,
    profileName,
    profileDesignation,
    profilePicture,
    titleInput,
    imageURLInput,
    nameInput,
    designationInput,
    updateImage,
    formList
} from "./constants.js";

const userInfoCheck = new UserInfo({profileName, profileDesignation});
const addCardPopup = new PopupWithForm(".addCard", {fromSubmission: (item, close) => {
        api.addCard(item, close);
    },inputs: {input1: titleInput, input2: imageURLInput}});
const profileEditpopup = new PopupWithForm(".profileEdit", {fromSubmission:(item, close) => {
        userInfoCheck.setUserInfo(item, close);
    },inputs: {input1: nameInput, input2: designationInput}});


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
    addCardPopup.open();
});

// Open edit profile box
profileEdit.addEventListener("click", ()=>{
    userInfoCheck.getUserInfo();
    profileEditpopup.open();
});

// Open update profile picture box
updateImage.addEventListener("click", ()=>{
    const ppr = new UpdateProfilePicture(".updateProfilePicture");
    ppr.open();
});

api.getUserInfo();
api.getInitialCards();
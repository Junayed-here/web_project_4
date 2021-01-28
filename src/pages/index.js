// importing css file
import "./index.css";
import Card from '../components/Card.js';
import Section from '../components/Section.js';
import FormValidator from '../components/FormValidator.js';
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
const profileDesignation  = document.querySelector(".profile__designation");
import {
    addCard,
    api,
    profileEdit,
    profilePicture,
    profileName,
    cardList,
    updateImage,
    formList,
    confirmButton,
    inputName,
    inputJob,
    ownerId
} from "../utils/constants.js";
const deleteCardConfirmationPopup = new PopupWithForm({popupSelector:".confirmation"});
deleteCardConfirmationPopup.setEventListeners();
const popupWithImage = new PopupWithImage(".openPicture-popup");
popupWithImage.setEventListeners();

const cardSection = new Section({
    items: [],
    renderer: (item) => {
        const card = new Card({
            item,
            handleCardClick:({text, link}) =>{
                popupWithImage.open({text, link});
            },
            handleAddLike:(id) =>{
                return api.cardLike(id,"PUT")
                    .then(result => result.likes.length)
                    .catch((err) => console.log(err));
            },
            handleDeleteLike:(id) =>{
                return api.cardLike(id,"DELETE")
                    .then(result => result.likes.length)
                    .catch((err) => console.log(err));;
            },
            handleDeleteCard: (id)=>{
                deleteCardConfirmationPopup.open();
                confirmButton.classList.remove('button_role_inactive');
                deleteCardConfirmationPopup.handleDeleteEvent(()=>{
                    api.deleteCard(id)
                        .then((res) => {
                            card.deleteCard();
                            deleteCardConfirmationPopup.close();
                        })
                        .catch((err) => console.log(err));
                });
            }
        });
        const cardElement = card.generateCard();
        cardSection.setItem(cardElement);
    }
}, cardList);

// profile Actions
const userProfile = new UserInfo({ name: profileName, designation: profileDesignation, avatar: profilePicture });
api.getUserInfo()
    .then((result) => {
        ownerId.value = result._id;
        userProfile.setUserInfo({name: result.name, designation: result.about, avatar: result.avatar});
        api.getInitialCards()
            .then( (res) => {
                res.map(item => cardSection.pushItem(item));
                cardSection.renderItems();
            })
            .catch((err) =>console.log(err));
    })
    .catch((err) => console.log(err));
const profileEditpopup = new PopupWithForm({
    popupSelector : ".profileEdit",
    fromSubmission:(data) => {
        api.updateUserInfo(data)
            .then(res => {
                userProfile.setUserInfo({name: res.name, designation: res.about, avatar: res.avatar});
                profileEditpopup.close();
        })
            .catch((err) => console.log(err));
    }
});
profileEdit.addEventListener("click", ()=>{
    const userInfoVal = userProfile.getUserInfo();
    inputName.value = userInfoVal.name;
    inputJob.value = userInfoVal.job;
    profileEditpopup.open();
});
profileEditpopup.setEventListeners();

// Cards
const addCardPopup = new PopupWithForm({
    popupSelector : ".addCard",
    fromSubmission : (data) => {
        api.addCard(data)
            .then((result)=> {
                cardSection.addItem(result);
                cardSection.renderItems();
                addCardPopup.close();
            })
            .catch((err) => console.log(err));
    }
});
// Open add card box
addCard.addEventListener("click",()=>{
    addCardPopup.open();
});
addCardPopup.setEventListeners();

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

const updateImageFun = new PopupWithForm({
    popupSelector:".updateProfilePicture",
    fromSubmission:(data) => {
        api.updateProfilePicture(data.newProfileUrl)
            .then((res) => {
                profilePicture.setAttribute('src', res.avatar);
                updateImageFun.close();
            })
            .catch((err) => console.log(err));
    }
});
updateImage.addEventListener('click', ()=>{
    updateImageFun.open();
});
updateImageFun.setEventListeners();
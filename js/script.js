const profile = document.querySelector(".profile");
const profileEdit = profile.querySelector(".button_role_edit");
const addCard = profile.querySelector(".button_role_add");
const cardList = document.querySelector(".cards__list");
const popupBox = document.querySelector(".popup");
const popupBoxActiveClass = document.querySelector(".popup_show");
const popupBody = document.querySelectorAll(".popup__body");
const popupsClose = document.querySelectorAll(".button_role_close");
const profileName = document.querySelector(".profile__name");
const profileDesignation = document.querySelector(".profile__designation");
const formList = Array.from(document.querySelectorAll('.popup__form'));
const formElementEdit = document.querySelector(".popup__edit-form");
const nameInput = formElementEdit.querySelector("#input-name");
const designationInput = formElementEdit.querySelector("#input-about");
const formElementAddCard = document.querySelector(".add_card-form");
const titleInput = formElementAddCard.querySelector("#input-card-name");
const imageURLInput = formElementAddCard.querySelector("#input-img-link");
const initialCards = [
    {
        name: "Yosemite Valley",
        link: "https://code.s3.yandex.net/web-code/yosemite.jpg"
    },
    {
        name: "Lake Louise",
        link: "https://code.s3.yandex.net/web-code/lake-louise.jpg"
    },
    {
        name: "Bald Mountains",
        link: "https://code.s3.yandex.net/web-code/bald-mountains.jpg"
    },
    {
        name: "Latemar",
        link: "https://code.s3.yandex.net/web-code/latemar.jpg"
    },
    {
        name: "Vanois National Park",
        link: "https://code.s3.yandex.net/web-code/vanois.jpg"
    },
    {
        name: "Lago di Braies",
        link: "https://code.s3.yandex.net/web-code/lago.jpg"
    }
];


// Initial Cards load to the page
import {Card} from './Card.js';
for (const { name, link } of initialCards) {
    const card = new Card(name, link);
    const cardElement = card.generateCard();
    cardList.append(cardElement);
}

// Activate form validation
import {FormValidator} from './FormValidator.js';
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


// Open add card popup
const openAddCardPopup = () => {
    titleInput.value = '';
    imageURLInput.value = '';
    popupBox.classList.add("popup_show");
    popupBody.forEach((item) => {
        item.classList.remove("popup__body_show");
    });
    document.querySelector(".addCard").classList.add("popup__body_show");
};

// Open edit profile popup
const openProfileEditPopup = () =>  {
    popupBox.classList.add("popup_show");
    popupBody.forEach((item) => {
        item.classList.remove("popup__body_show");
    });
    document.querySelector(".profileEdit").classList.add("popup__body_show");
    nameInput.value = profileName.textContent;
    designationInput.value = profileDesignation.textContent;
};

// close popup
const closePopup = () => {
    popupBox.classList.remove("popup_show");
    document.querySelector('.popup__body_show').classList.remove('popup__body_show');
    document.querySelectorAll('.button_role_submit').forEach( (item) => {
        item.classList.add("button_role_inactive");
    });
};

// Function for closing popup when clicking outside of popup content
popupBox.addEventListener("click", (evt) => {
    if(evt.target.classList.contains("popup_show")){
        closePopup();
    }
});

// Function for closing popup using "Esc" key
document.addEventListener("keydown",  (evt) => {
    if (evt.key === "Escape" || event.keyCode === 27 && popupBoxActiveClass.length > 0) {
        closePopup();
    }
});

// Add card form submission
const formSubmitHandlerAddCard = () => {
    const card = new Card(titleInput.value, imageURLInput.value);
    const cardElement = card.generateCard();
    cardList.prepend(cardElement);
    closePopup();
};

// edit profile form submission
const formSubmitHandlerProfileEdit = () => {
    profileName.textContent = nameInput.value;
    profileDesignation.textContent = designationInput.value;
    closePopup();
};

// Open add card box
addCard.addEventListener("click", openAddCardPopup);

// Open edit profile box
profileEdit.addEventListener("click", openProfileEditPopup);

// Close popups
popupsClose.forEach((btn) => {
    btn.addEventListener("click",closePopup);
});

// Add card form
formElementAddCard.addEventListener('submit', formSubmitHandlerAddCard);

// Edit profile form
formElementEdit.addEventListener('submit', formSubmitHandlerProfileEdit);
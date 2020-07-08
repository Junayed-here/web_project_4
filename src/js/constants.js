// All constant variables

export const initialCards = [
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
export const profile = document.querySelector(".profile");
export const profileName = document.querySelector(".profile__name");
export const profileDesignation  = document.querySelector(".profile__designation");
export const addCard = profile.querySelector(".button_role_add");
export const profileEdit = profile.querySelector(".button_role_edit");
export const cardList = document.querySelector(".cards__list");
export const formList = Array.from(document.querySelectorAll('.popup__form'));


export const popupBox = document.querySelector(".popup");
export const popupBoxActiveClass = document.querySelector(".popup_show");
export const popupBody = document.querySelectorAll(".popup__body");
export const popupsClose = document.querySelectorAll(".button_role_close");
export const formElementEdit = document.querySelector(".popup__edit-form");
export const nameInput = formElementEdit.querySelector("#input-name");
export const designationInput = formElementEdit.querySelector("#input-about");
export const formElementAddCard = document.querySelector(".add_card-form");
export const titleInput = formElementAddCard.querySelector("#input-card-name");
export const imageURLInput = formElementAddCard.querySelector("#input-img-link");

const profile = document.querySelector(".profile");
const profileEdit = profile.querySelector(".button_role_edit");
const addCard = profile.querySelector(".button_role_add");
const cardList = document.querySelector(".cards__list");
const popupBox = document.querySelector(".popup");
const popupBody = document.querySelectorAll(".popup__body");
const openPictureImg = document.querySelector(".openPicture-popup__img");
const openPictureText = document.querySelector(".openPicture-popup__text");
const popupsClose = document.querySelectorAll(".button_role_close");
const profileName = document.querySelector(".profile__name");
const profileDesignation = document.querySelector(".profile__designation");
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

// Function for closing popup when clicking outside of popup content
popupBox.addEventListener("click", function (evt) {
    if(evt.target.classList.contains("popup_show")){
        closePopup();
    };
});

// Function for closing popup using "Esc" key
document.addEventListener("keydown", function (evt) {
    if (evt.key === "Escape" || event.keyCode === 27 && document.querySelector(".popup_show").length > 0) {
        closePopup();
    };
});

// Add card function
const addCardFun = (cardTitle, cardImage) => {
    const cardTemplate = document.querySelector("#card_template").content;
    const cardElement = cardTemplate.cloneNode(true);

    cardElement.querySelector(".cards__title").textContent = cardTitle;
    cardElement.querySelector(".cards__image").setAttribute('alt',cardTitle);
    cardElement.querySelector(".cards__image").setAttribute('title',cardTitle);
    cardElement.querySelector(".cards__image").setAttribute('src',cardImage);

    // adding delete function
    cardElement.querySelector(".cards__delete").addEventListener("click", (event) => {
        event.target.closest('.cards__item').remove();
    });

    // adding like function
    cardElement.querySelector(".cards__favourite").addEventListener("click", (event) => {
        event.target.classList.toggle("cards__favourite_active");
    });

    // adding like function
    cardElement.querySelector(".cards__item").addEventListener("click", (event) => {
        if (event.target.classList != 'cards__delete'){
            openImagePopup(event.target.closest('.cards__item'));
        }
    });

    cardList.prepend(cardElement);
};

// Initial Cards load to the page
for (let { name, link } of initialCards) {
    addCardFun(name, link);
}

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

// Open Image popup
const openImagePopup = (item) => {
    const title =  item.querySelector(".cards__title").textContent;
    const url =  item.querySelector(".cards__image").getAttribute('src');
    openPictureText.textContent = title;
    openPictureImg.setAttribute('src',url);
    popupBox.classList.add("popup_show");
    item.classList.remove("popup__body_show");
    document.querySelector(".openPicture-popup").classList.add("popup__body_show");
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

    const inputList =  Array.from(document.forms.popup__edit.querySelectorAll('.popup__input'));
    const buttonElement = document.forms.popup__edit.querySelector('.popup__button');

    toggleButtonState(inputList,buttonElement,'button_role_inactive');
};

// close popup
const closePopup = () => {
    popupBox.classList.remove("popup_show");
    document.querySelector('.popup__body_show').classList.remove('popup__body_show');
    document.querySelectorAll('.button_role_submit').forEach(function (item) {
        item.classList.add("button_role_inactive");
    });
};

// Open add card box
addCard.addEventListener("click", openAddCardPopup);

// Open edit profile box
profileEdit.addEventListener("click", openProfileEditPopup);

// Close popups
popupsClose.forEach((btn) => {
    btn.addEventListener("click",closePopup);
});

// Initial call for for all form to active validation feature
enableValidation({
    formSelector: ".popup__form",
    inputSelector: ".popup__input",
    submitButtonSelector: ".popup__button",
    inactiveButtonClass: "button_role_inactive",
    inputErrorClass: "popup__input-invalid",
    errorClass: "popup__input-error_active"
});
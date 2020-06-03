const profile = document.querySelector(".profile");
const profileEdit = profile.querySelector(".button_role_edit");
const addCard = profile.querySelector(".button_role_add");
const cardList = document.querySelector(".cards__list");
const popupBox = document.querySelector(".popup");
const deleteCard = document.querySelectorAll(".cards__delete");
const favouriteCard = document.querySelectorAll(".cards__favourite");
const popupBody = document.querySelectorAll(".popup__body");
const openPicture_img = document.querySelector(".openPicture-popup__img");
const openPicture_text = document.querySelector(".openPicture-popup__text");
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

// Initial Cards load to the page
initialCards.map(function (item,index) {
    addCardFun(initialCards[(initialCards.length - 1) - index].name,initialCards[(initialCards.length - 1) - index].link);
});

// Open edit profile popup
function open_profileEdit_Popup() {
    popupBox.classList.add("popup_show");
    popupBody.forEach((item) => {
        item.classList.remove("popup__body_show");
    });
    document.querySelector(".profileEdit").classList.add("popup__body_show");
    nameInput.value = profileName.textContent;
    designationInput.value = profileDesignation.textContent;
}

// Open add card popup
function open_addCard_Popup() {
    titleInput.value = '';
    imageURLInput.value = '';
    popupBox.classList.add("popup_show");
    popupBody.forEach((item) => {
        item.classList.remove("popup__body_show");
    });

    document.querySelector(".addCard").classList.add("popup__body_show");
}

// Open Image popup
function open_Image_Popup(item) {
    const title =  item.querySelector(".cards__title").textContent;
    const url =  item.querySelector(".cards__image").getAttribute('src');

    openPicture_text.textContent = title;
    openPicture_img.setAttribute('src',url);

    popupBox.classList.add("popup_show");
    popupBody.forEach((item) => {
        item.classList.remove("popup__body_show");
    });

    document.querySelector(".openPicture-popup").classList.add("popup__body_show");
}

// close popup
function closePopup() {
    popupBox.classList.remove("popup_show");
}

// edit profile form submission
function formSubmitHandlerProfileEdit (evt) {
    evt.preventDefault();

    profileName.textContent = nameInput.value;
    profileDesignation.textContent = designationInput.value;

    closePopup();
}

// Add card form submission
function formSubmitHandlerAddCard (evt) {
    evt.preventDefault();
    const title = titleInput.value;
    const image = imageURLInput.value;

    console.log(title, image);
    addCardFun(title, image);

    closePopup();
}

// Add card function
function addCardFun(cardTitle, cardImage) {
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
            open_Image_Popup(event.target.closest('.cards__item'));
        }
    });
    cardList.prepend(cardElement);
}

// Open add card box
addCard.addEventListener("click", open_addCard_Popup);

// Open edit profile box
profileEdit.addEventListener("click", open_profileEdit_Popup);

// Close popups
popupsClose.forEach((btn) => {
    btn.addEventListener("click",closePopup);
});

// Edit profile form
formElementEdit.addEventListener('submit', formSubmitHandlerProfileEdit);

// Add card form
formElementAddCard.addEventListener('submit', formSubmitHandlerAddCard);

// Delete card
// deleteCard.forEach((btn) => {
//     btn.addEventListener("click", (event) => {
//         event.target.closest('.cards__item').remove();
//     });
// });

// Favourite card
// favouriteCard.forEach((btn) => {
//     btn.addEventListener("click", (event) => {
//         event.target.classList.toggle("cards__favourite_active");
//     });
// });

// https://source.unsplash.com/random/1920x1080
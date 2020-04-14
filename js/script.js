const profile = document.querySelector(".profile");
const profileEdit = profile.querySelector(".profile__button_edit");
const popupBox = document.querySelector(".popup");
const popupsClose = document.querySelector(".popup__close");
const profileName = document.querySelector(".profile__name");
const profileDesignation = document.querySelector(".profile__designation");
const formElement = document.querySelector(".popup__edit-form");
const nameInput = formElement.querySelector("#input-name");
const designationInput = formElement.querySelector("#input-about");

function openPopup() {
    popupBox.classList.add("popup_show");
    nameInput.value = profileName.textContent;
    designationInput.value = profileDesignation.textContent;
}

function closePopup() {
    popupBox.classList.remove("popup_show");
}

function formSubmitHandler (evt) {
    evt.preventDefault();

    profileName.textContent = nameInput.value;
    profileDesignation.textContent = designationInput.value;

    closePopup();
}

// Open edit profile box
profileEdit.addEventListener("click", openPopup);
// Close edit profile box
popupsClose.addEventListener("click", closePopup);
// Submit the form
formElement.addEventListener('submit', formSubmitHandler);
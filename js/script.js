const profile = document.querySelector(".profile");
const profileEdit = profile.querySelector(".profile__edit");
const popupsBox = document.querySelector(".popups");
const popupsClose = document.querySelector(".popup__close");
const profileName = document.querySelector(".profile__name");
const profileDesignation = document.querySelector(".profile__designation");
const formElement = document.querySelector(".edit-form");
const nameInput = formElement.querySelector("#input-name");
const designationInput = formElement.querySelector("#input-about");

function openPopup() {
    popupsBox.classList.add("popups_show");
    nameInput.value = profileName.textContent;
    designationInput.value = profileDesignation.textContent;
}

function closePopup() {
    popupsBox.classList.remove("popups_show");
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
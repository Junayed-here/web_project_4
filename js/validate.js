// Checking if any input has invalid value
const hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
        return !inputElement.validity.valid;
    });
};

// Toggle button state (active / inactive)
const toggleButtonState = (inputList, buttonElement, btnDisableClass) => {
    if (hasInvalidInput(inputList)) {
        buttonElement.classList.add(btnDisableClass);
    } else {
        buttonElement.classList.remove(btnDisableClass);
    }
};

// edit profile form submission
const formSubmitHandlerProfileEdit = () => {
    profileName.textContent = nameInput.value;
    profileDesignation.textContent = designationInput.value;
    closePopup();
};

// Add card form submission
const formSubmitHandlerAddCard = () => {
    const title = titleInput.value;
    const image = imageURLInput.value;
    addCardFun(title, image);
    closePopup();
};

// Show error message for input field
const showInputError = (formElement, inputElement, errorMessage,inputDisableClass, errorHideClass) => {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.add(inputDisableClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(errorHideClass);
};

// Hide error message for input field
const hideInputError = (formElement, inputElement, inputDisableClass, errorHideClass) => {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.remove(inputDisableClass);
    errorElement.classList.remove(errorHideClass);
    errorElement.textContent = "";
};

// Setting event listener for "submit" a form
const enableValidation = (options) => {

    // Checking validity for input field
    const checkInputValidity = (formElement, inputElement) => {
        if (!inputElement.validity.valid) {
            showInputError(formElement, inputElement, inputElement.validationMessage, options['inputErrorClass'], options[`errorClass`]);
        } else {
            hideInputError(formElement, inputElement,options['inputErrorClass'], options[`errorClass`]);
        }
    };

    const formList = Array.from(document.querySelectorAll(options[`formSelector`]));
    formList.forEach(function (formElement) {
        const inputList = Array.from(formElement.querySelectorAll(options[`inputSelector`]));
        const buttonElement = formElement.querySelector(options[`submitButtonSelector`]);

        formElement.addEventListener("submit", function (evt) {
            evt.preventDefault();
            if (hasInvalidInput(inputList)){
                inputList.forEach(function (inputElement) {
                    toggleButtonState(inputList,buttonElement,options[`inactiveButtonClass`]);
                    checkInputValidity(formElement, inputElement);
                });
                return false;
            }
            formElement.classList.forEach(function (classValue) {
                switch (classValue) {
                    case "popup__edit-form":
                        formSubmitHandlerProfileEdit();
                        break;
                    case "add_card-form":
                        formSubmitHandlerAddCard();
                        break;
                    default:
                        return false;
                };
            });

        });
        toggleButtonState(inputList,buttonElement,options[`inactiveButtonClass`]);

        // Setting event listener for "input" event in input fields
        inputList.forEach(function (inputElement) {
            inputElement.addEventListener("input", function (evt) {
                toggleButtonState(inputList,buttonElement,options[`inactiveButtonClass`]);
                checkInputValidity(formElement, inputElement);
            });
        });

    });
};
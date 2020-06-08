// Checking if any input has invalid value
const hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
        return !inputElement.validity.valid;
    });
};

// Toggle button state (active / inactive)
const toggleButtonState = (inputList, buttonElement, btnDisableClass) => {
    if (hasInvalidInput(inputList)) {
        buttonElement.setAttribute("disabled", "");
        buttonElement.classList.add(btnDisableClass);
    } else {
        buttonElement.removeAttribute("disabled");
        buttonElement.classList.remove(btnDisableClass);
    }
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


// Checking validity for input field
const checkInputValidity = (formElement, inputElement, inputErrorClass, errorClass) => {
    if (!inputElement.validity.valid) {
        showInputError(formElement, inputElement, inputElement.validationMessage, inputErrorClass, errorClass);
    } else {
        hideInputError(formElement, inputElement,inputErrorClass, errorClass);
    }
};

// Setting event listener for "submit" a form
const enableValidation = (options) => {

    const formList = Array.from(document.querySelectorAll(options[`formSelector`]));
    formList.forEach(function (formElement) {
        const inputList = Array.from(formElement.querySelectorAll(options[`inputSelector`]));
        const buttonElement = formElement.querySelector(options[`submitButtonSelector`]);

        formElement.addEventListener("submit", function (evt) {
            evt.preventDefault();
            if (hasInvalidInput(inputList)){
                inputList.forEach(function (inputElement) {
                    toggleButtonState(inputList,buttonElement,options[`inactiveButtonClass`]);
                    checkInputValidity(formElement, inputElement,options['inputErrorClass'],options['errorClass']);
                });
                return false;
            }
        });
        toggleButtonState(inputList,buttonElement,options[`inactiveButtonClass`]);

        // Setting event listener for "input" event in input fields
        inputList.forEach(function (inputElement) {
            inputElement.addEventListener("input", function (evt) {
                toggleButtonState(inputList,buttonElement,options[`inactiveButtonClass`]);
                checkInputValidity(formElement, inputElement,options['inputErrorClass'],options['errorClass']);
            });
        });

    });
};

// Initial call for for all form to active validation feature
enableValidation({
    formSelector: ".popup__form",
    inputSelector: ".popup__input",
    submitButtonSelector: ".popup__button",
    inactiveButtonClass: "button_role_inactive",
    inputErrorClass: "popup__input-invalid",
    errorClass: "popup__input-error_active"
});
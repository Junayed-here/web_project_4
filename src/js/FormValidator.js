// Form Validation class
export default class FormValidator {
    constructor(data, formElement) {
        this._formSelector = data.formSelector;
        this._inputSelector = data.inputSelector;
        this._submitButtonSelector = data.submitButtonSelector;
        this._inactiveButtonClass = data.inactiveButtonClass;
        this._inputErrorClass = data.inputErrorClass;
        this._errorClass = data.errorClass;
        this._formElement = formElement;
        this._inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));
        this._buttonElement = this._formElement.querySelector(this._submitButtonSelector);
    }

    // check any invalid field available or not
    _hasInvalidInput(){
        return this._inputList.some((inputElement) => {
            return !inputElement.validity.valid;
        });
    }

    // toggle button state
    _toggleButtonState(){
        if (this._hasInvalidInput()) {
            this._buttonElement.setAttribute("disabled", "");
            this._buttonElement.classList.add(this._inactiveButtonClass);
        } else {
            this._buttonElement.removeAttribute("disabled");
            this._buttonElement.classList.remove(this._inactiveButtonClass);
        }
    }

    // show error message
    _showInputError(inputElement, errorMessage){
        const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
        inputElement.classList.add(this._inputErrorClass);
        errorElement.textContent = errorMessage;
        errorElement.classList.add(this._errorClass);
    }

    // hide error message
    _hideInputError(inputElement){
        const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
        inputElement.classList.remove(this._inputErrorClass);
        errorElement.classList.remove(this._errorClass);
        errorElement.textContent = "";
    }

    // check validity and show/hide error message
    _checkInputValidity(inputElement){
        if (!inputElement.validity.valid) {
            this._showInputError(inputElement, inputElement.validationMessage);
        } else {
            this._hideInputError(inputElement);
        }
    }

    // set event listeners for form and input
    _setEventListeners() {
        this._formElement.addEventListener("submit", (evt) =>{
            evt.preventDefault();
        });

        this._inputList.forEach((inputElement) =>{
            inputElement.addEventListener("input", ()=>{
                this._toggleButtonState();
                this._checkInputValidity(inputElement);
            });
        });
    }

    // initialize validation
    enableValidation(){
        this._toggleButtonState();
        this._setEventListeners();
    }

}
// Popup with form class
import Popup from './Popup.js';

export default class PopupWithForm extends Popup{
    constructor({popupSelector,fromSubmission}) {
        super(popupSelector);
        this._form = this._popupElement.querySelector(".popup__form");
        this._submitButton = this._form.querySelector(".button_role_submit");
        this._fromSubmission = fromSubmission;
    }

    _getInputValues(){
        this._inputList = this._popupElement.querySelectorAll(".popup__input");

        this._formValues = {};
        this._inputList.forEach(input => this._formValues[input.name] = input.value);
        return this._formValues;
    }

    setEventListeners(){
        super.setEventListeners();
        this._form.addEventListener("submit", (e)=>{
            e.preventDefault();
            if (this._submitButton.textContent === "Save"){
                this._submitButton.textContent = "Saving...";
            }
            this._fromSubmission(this._getInputValues());
        });
    }

    handleDeleteEvent(event){
        this._fromSubmission = event;
    }

    close() {
        super.close();
        this._form.reset();
    }

    open() {
        super.open();
        if (this._submitButton.textContent === "Saving..."){
            this._submitButton.textContent = "Save";
        }
    }
}
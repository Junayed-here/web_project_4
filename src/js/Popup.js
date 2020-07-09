// Popup class
import {
    popupBody,
    popupBoxActiveClass
} from "./constants.js";
export default class Popup {
    constructor(popupSelector) {
        this._popupElement = document.querySelector(popupSelector);
        this._popupBox = document.querySelector('.popup');
        this._closeButton = this._popupElement.querySelector(".button_role_close");
        this._handleEscClose = this._handleEscClose.bind(this);
    }
    _handleEscClose(){
        this.close();
    }
    setEventListeners(){
        this._closeButton.addEventListener("click", () => {
            this.close();
        });
        this._popupBox.addEventListener("click", (evt) => {
            if(evt.target.classList.contains("popup_show")){
                this.close();
            }
        });
    }
    open(){
        document.addEventListener('keyup', (evt)=>{
            if (evt.key === "Escape" || evt.keyCode === 27 && popupBoxActiveClass.length > 0) {
                this._handleEscClose();
            }
        });
        this._popupBox.classList.add("popup_show");

        popupBody.forEach((item) => {
            item.classList.remove("popup__body_show");
        });
        this._popupElement.classList.add("popup__body_show");
        this.setEventListeners();
    }
    close(){
        document.removeEventListener('keyup', this._handleEscClose);
        this._popupBox.classList.remove("popup_show");

        this._popupElement.classList.remove('popup__body_show');
        document.querySelectorAll('.button_role_submit').forEach( (item) => {
            item.classList.add("button_role_inactive");
        });
    }
}
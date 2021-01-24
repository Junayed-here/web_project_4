// Popup class
import {
    popupBoxActiveClass
} from "../utils/constants.js";
export default class Popup {
    constructor(popupSelector) {
        this._popupElement = document.querySelector(popupSelector);
        this._handleEscClose = this._handleEscClose.bind(this);
    }
    open(){
        this._popupElement.classList.add("popup_show");
        document.addEventListener('keyup', (evt)=>{
            this._handleEscClose(evt);
        });
    }
    close(){
        this._popupElement.classList.remove("popup_show");
        document.addEventListener('keyup', (evt)=>{
            this._handleEscClose(evt);
        });

        document.querySelectorAll('.button_role_submit').forEach( (item) => {
            item.classList.add("button_role_inactive");
        });
    }
    _handleEscClose(evt){
        if (evt.key === "Escape" || evt.keyCode === 27 && popupBoxActiveClass.length > 0) {
            this.close();
        }
    }
    setEventListeners(){
        this._popupElement.addEventListener("click", (evt) => {
            if(evt.target.classList.contains('button_role_close') || evt.target.classList.contains("popup_show")){
                this.close();
            }
        });
    }
}
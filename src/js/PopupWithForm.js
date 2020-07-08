// Popup with form class
import Popup from './Popup.js';
import {
    titleInput,
    imageURLInput,
    formElementAddCard
} from "./constants.js";

export default class PopupWithForm extends Popup{
    constructor(props,data) {
        super(props);
        this._fromSubmission = data.fromSubmission;
    }

    _getInputValues(){
        return({name: titleInput.value, link: imageURLInput.value});
    }

    setEventListeners(){
        super.setEventListeners();
        formElementAddCard.addEventListener("submit", ()=>{
            if (titleInput.value !== "" || imageURLInput.value !== ""){
                this._fromSubmission(this._getInputValues());
                this.close();
            }
        });
    }

    close() {
        super.close();
        formElementAddCard.reset();
    }
}
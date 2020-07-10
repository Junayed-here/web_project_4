// Popup with form class
import Popup from './Popup.js';
import {titleInput} from "./constants";

export default class PopupWithForm extends Popup{
    constructor(props,data) {
        super(props);
        this._selectedPopup = document.querySelector(props);
        this._form = this._selectedPopup.querySelector(".popup__form");
        this._fromSubmission = data.fromSubmission;
        this._input1 = data.inputs.input1;
        this._input2 = data.inputs.input2;
    }

    _getInputValues(){
        return({name: this._input1.value, link: this._input2.value});
    }

    setEventListeners(){
        super.setEventListeners();
        this._form.addEventListener("submit", ()=>{
            if (this._input1.value !== "" || this._input2.value !== ""){
                this._fromSubmission(this._getInputValues());
                this.close();
            }
        });
    }

    close() {
        super.close();
        this._form.reset();
    }
}
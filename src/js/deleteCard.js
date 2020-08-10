// Delete a card
import Popup from "./Popup";
import {api} from "./constants";

export default class DeleteCard extends Popup{
    constructor(props,cardId,cardDOM) {
        super(props);
        this._inputId = cardId;
        this._card = cardDOM;
        this._confirmButton = this._popupElement.querySelector(".button_role_confirmation");
    }

    setEventListeners(){
        super.setEventListeners();
        this._confirmButton.addEventListener("click", ()=>{
            api.deleteCard({id:this._inputId, card: this._card}, {closePopup:()=>{this.close()}});
        });
    }

    open() {
        super.open();
        this._confirmButton.classList.remove('button_role_inactive');
    }

}
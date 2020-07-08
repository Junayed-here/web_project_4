// Popup with image class
import Popup from './Popup.js';

export default class PopupWithImage extends Popup{
    constructor(props) {
        super(props);
    }

    open({text, link}) {
        document.querySelector(".openPicture-popup__text").textContent = text;
        document.querySelector(".openPicture-popup__img").src = link;
        super.open();
    }
}
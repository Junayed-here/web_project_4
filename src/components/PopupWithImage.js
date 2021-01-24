// Popup with image class
import Popup from './Popup.js';
import {popupImgSrc,popupImgText} from '../utils/constants'
export default class PopupWithImage extends Popup{
    constructor(props) {
        super(props);
    }
    open({text, link}) {
        popupImgSrc.src = link;
        popupImgSrc.alt = text;
        popupImgText.textContent = text;
        super.open();
    }
}
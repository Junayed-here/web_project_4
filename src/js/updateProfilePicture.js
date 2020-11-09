import Popup from "./Popup";
import {api, profilePicture} from "./constants";

export default class UpdateProfilePicture extends Popup{
    constructor(props) {
        super(props);
        this._selectedPopup = document.querySelector(props);
        this._form = this._selectedPopup.querySelector(".popup__form");
    }

    setEventListeners(){
        super.setEventListeners();

        this._form.addEventListener("submit", ()=>{
            const imageURL = this._form.querySelector("#profile-img-link").value;
            api.updateProfilePicture(imageURL)
                .then((result) => {
                    profilePicture.setAttribute('src', result.avatar);
                    this.close();
                })
        });
    }

    close() {
        super.close();
        this._form.reset();
    }


}
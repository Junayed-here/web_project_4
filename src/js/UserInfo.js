// Popup with user info form
import {
    api,
    nameInput,
    designationInput
} from "./constants.js";


export default class UserInfo {
    constructor(data) {
        this._name = data.profileName;
        this._designation = data.profileDesignation;
    }

    getUserInfo(){
        nameInput.value = this._name.textContent;
        designationInput.value = this._designation.textContent;
    }

    setUserInfo(info, close){
        api.updateUserInfo(info)
            .then((result) => {
                this._name.textContent = result.name;
                this._designation.textContent = result.about;
                close.closePopup();
            })
    }
}
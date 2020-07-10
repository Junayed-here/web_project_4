// Popup with user info form
import {
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

    setUserInfo(info){
        this._name.textContent = info.name;
        this._designation.textContent = info.link;
    }
}
// Popup with user info form
import Popup from './Popup.js';
import {
    nameInput,
    designationInput,
    formElementEdit
} from "./constants.js";

export default class UserInfo extends Popup{
    constructor(props,data) {
        super(props);
        this._name = data.profileName;
        this._designation = data.profileDesignation;
    }

    getUserInfo(){
        return {name: this._name.textContent, designation: this._designation.textContent };
    }

    setUserInfo(info){
        this._name.textContent = info.name;
        this._designation.textContent = info.designation;
    }

    setEventListeners(){
        super.setEventListeners();
        formElementEdit.addEventListener("submit", ()=>{
            if (nameInput.value !== "" || designationInput.value !== ""){
                this.setUserInfo({name: nameInput.value, designation: designationInput.value });
                this.close();
            }
        });
    }

    open() {
        const info = this.getUserInfo();
        nameInput.value = info.name;
        designationInput.value = info.designation;
        super.open();
        this.setEventListeners();
    }
    close() {
        super.close();
    }
}
// Popup with user info form
export default class UserInfo {
    constructor(data) {
        this._name = data.name;
        this._designation = data.designation;
        this._avatar = data.avatar;
    }

    getUserInfo(){
        return { name: this._name.textContent, job: this._designation.textContent, avatar: this._avatar.src};
    }

    setUserInfo({name,designation,avatar}){
        this._name.textContent = name;
        this._designation.textContent = designation;
        this._avatar.setAttribute('src', avatar);
    }
}
export default class Api {
    constructor(options) {
        this._baseURL = options.baseUrl;
        this._headers = options.headers;
    }
    getInitialCards() {
        return fetch(this._baseURL+"/cards", {
            headers: this._headers
        }).then(res=> res.ok ? res.json() : Promise.reject(`Error: ${res.status}`));
    }
    getUserInfo() {
        return fetch(this._baseURL+"/users/me", {
            headers: this._headers
        }).then(res=> res.ok ? res.json() : Promise.reject(`Error: ${res.status}`));
    }
    updateUserInfo(data) {
        return fetch(this._baseURL+"/users/me", {
            method: "PATCH",
            headers: this._headers,
            body: JSON.stringify({
                name: data.name,
                about: data.designation
            })
        }).then(res=> res.ok ? res.json() : Promise.reject(`Error: ${res.status}`));

    }
    addCard(item) {
        return fetch(this._baseURL+"/cards", {
            method: "POST",
            headers: this._headers,
            body: JSON.stringify({
                name: item.cardTitle,
                link:  item.cardImgUrl
            })
        }).then(res=> res.ok ? res.json() : Promise.reject(`Error: ${res.status}`));

    }
    deleteCard(id) {
        return fetch(this._baseURL+"/cards/"+id, {
            method: "DELETE",
            headers: this._headers
        }).then(res=> res.ok ? res.json() : Promise.reject(`Error: ${res.status}`));
    }
    updateProfilePicture(url) {
        return fetch(this._baseURL+"/users/me/avatar", {
            method: "PATCH",
            headers: this._headers,
            body: JSON.stringify({
                avatar : url
            })
        }).then(res=> res.ok ? res.json() : Promise.reject(`Error: ${res.status}`));
    }
    cardLike(id,method) {
        return fetch(this._baseURL+"/cards/likes/"+ id, {
            method: method,
            headers: this._headers
        }).then(res=> res.ok ? res.json() : Promise.reject(`Error: ${res.status}`));
    }
}
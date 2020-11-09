export default class Api {
    constructor(options) {
        this._baseURL = options.baseUrl;
        this._headers = options.headers;
    }
    getInitialCards() {
        return fetch(this._baseURL+"/cards", {
            headers: this._headers
        }).then(res=> res.ok ? res.json() : Promise.reject(`Error: ${res.status}`))
        .catch((err) => {
            console.log(err);
        });
    }
    getUserInfo() {
        return fetch(this._baseURL+"/users/me", {
            headers: this._headers
        }).then(res=> res.ok ? res.json() : Promise.reject(`Error: ${res.status}`))
        .catch((err) => {
            console.log(err);
        });
    }
    addCard(item) {
        return fetch(this._baseURL+"/cards", {
            method: "POST",
            headers: this._headers,
            body: JSON.stringify({
                name: item.name,
                link:  item.link
            })
        }).then(res=> res.ok ? res.json() : Promise.reject(`Error: ${res.status}`))
        .catch((err) => {
            console.log(err);
        });
    }
    updateUserInfo(info) {
        return fetch(this._baseURL+"/users/me", {
            method: "PATCH",
            headers: this._headers,
            body: JSON.stringify({
                name: info.name,
                about: info.link
            })
        }).then(res=> res.ok ? res.json() : Promise.reject(`Error: ${res.status}`))
        .catch((err) => {
            console.log(err);
        });
    }
    deleteCard(id) {
        return fetch(this._baseURL+"/cards/"+id, {
            method: "DELETE",
            headers: this._headers
        }).then(res=> res.ok ? res.json() : Promise.reject(`Error: ${res.status}`))
        .catch((err) => {
            console.log(err);
        });
    }
    updateProfilePicture(url) {
        return fetch(this._baseURL+"/users/me/avatar", {
            method: "PATCH",
            headers: this._headers,
            body: JSON.stringify({
                avatar : url
            })
        }).then(res=> res.ok ? res.json() : Promise.reject(`Error: ${res.status}`))
        .catch((err) => {
            console.log(err);
        });
    }
    cardLike(id,method) {
        return fetch(this._baseURL+"/cards/likes/"+ id, {
            method: method,
            headers: this._headers
        }).then(res=> res.ok ? res.json() : Promise.reject(`Error: ${res.status}`))
        .catch((err) => {
            console.log(err);
        });
    }
}
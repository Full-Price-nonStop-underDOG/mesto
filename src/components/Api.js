export class Api {
    constructor({
        token,
        URL
    }) {
        this._token = token;
        this._url = URL;
    }

    _handlePromiseRequest(res) {
        if (res.ok) {
            return res.json();
        }
        return (`Ошибка: ${res.status}`)
    }

    async getUserInfo() {
        const reply = await fetch(`${this._url}/users/me`, {
            method: "GET",
            headers: {
                authorization: this._token
            },
        })
        return this._handlePromiseRequest(reply)
    }

    async getInitialCardsData() {
        const reply = await fetch(`${this._url}/cards`, {
            headers: {
                authorization: this._token,
            }
        })
        return this._handlePromiseRequest(reply);
    }

    getInitialData() {
        return Promise.all([this.getInitialCardsData(), this.getUserInfo()]);
    }

    async editProfileInfo(data) {
        const response = await fetch('https://mesto.nomoreparties.co/v1/cohort-61/users/me', {
            method: 'PATCH',
            headers: {
                authorization: '8de39d2e-51cd-4fb0-8531-ab4805fcaf6d',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: data.name,
                about: data.about
            })
        });

        const info = await response.json();

        return this._handlePromiseRequest(info);
    }

    async removeCard(cardId) {
        const response = await fetch(`${this._url}/cards/${cardId}`, {
            method: "DELETE",
            headers: {
                authorization: this._token
            }
        })
        return this._handlePromiseRequest(response)
    }

    async addNewCard(data) {
        const response = await fetch(`${this._url}/cards`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                authorization: this._token
            },
            body: JSON.stringify({
                name: data.name,
                link: data.link
            }),
        })
        return this._handlePromiseRequest(response)
    }

}
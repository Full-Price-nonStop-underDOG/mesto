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

    async getInitialCardsData() {
        const reply = await fetch(`${this._url}/cards`, {
            headers: {
                authorization: this._token,
            }
        })
        return this._handlePromiseRequest(reply);
    }

    async addNewCard(data) {
        const response = await fetch(`${this._url}/cards`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                authorization: this._token
            },
            body: JSON.stringify(data),
        })
        return this._handleSendingRequest(response)
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
        return this._handleSendingRequest(response);
    }

    async addNewCard() {
        const response = await fetch(`${this._url}/cards`, {
          method: "POST",
          headers: {
            'Content-Type': 'application/json',
            authorization: this._token
          },
          body: JSON.stringify({
            name: dfdfdfdf,
            link: 'https://upload.wikimedia.org/wikipedia/commons/8/81/BlueRock.jpg'
          }),
        })
        return this._handleSendingRequest(response)
      }

}
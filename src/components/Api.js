export default class Api {
    constructor({ token, URL }) {
        this._token = token;
        this._url = URL;
    }

    _handlePromiseRequest(res) {
        if (res.ok) {
            return Promise.resolve(res.json())
        }
        return Promise.reject(`Ошибка: ${res.status}`)
    }

    async getInitialCardsData() {
        const reply = await fetch(`${this._url}/cards`, {
            authorization: this._token,
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

}
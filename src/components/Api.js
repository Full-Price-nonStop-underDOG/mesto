export class Api {
  constructor({ headers, URL }) {
    this._headers = headers;
    this._url = URL;
  }

  _handlePromiseRequest(res) {
    if (res.ok) {
      return res.json();
    }
    return null;
  }
  async addLike(cardId) {
    try {
      const response = await fetch(`${this._url}/cards/${cardId}/likes`, {
        method: "PUT",
        headers: this._headers,
      });
      return this._handlePromiseRequest(response);
    } catch (error) {
      console.log(`Ошибка: ${error}`);
      return error;
    }
  }

  async removeLike(cardId) {
    try {
      const response = await fetch(`${this._url}/cards/${cardId}/likes`, {
        method: "DELETE",
        headers: this._headers,
      });

      return this._handlePromiseRequest(response);
    } catch (error) {
      console.log(`Ошибка: ${error}`);
      return error;
    }
  }

  async getUserInfo() {
    try {
      const reply = await fetch(`${this._url}/users/me`, {
        method: "GET",
        headers: this._headers,
      });
      return this._handlePromiseRequest(reply);
    } catch (error) {
      console.log(`Ошибка: ${error}`);
      return error;
    }
  }

  async getInitialCardsData() {
    try {
      const reply = await fetch(`${this._url}/cards`, {
        headers: this._headers,
      });
      return this._handlePromiseRequest(reply);
    } catch (error) {
      console.log(`Ошибка: ${error}`);
      return error;
    }
  }

  getInitialData() {
    try {
      return Promise.all([this.getInitialCardsData(), this.getUserInfo()]);
    } catch (error) {
      console.log(`Ошибка: ${error}`);
      return error;
    }
  }

  async editProfileInfo(data) {
    try {
      console.log(data);
      const response = await fetch(`${this._url}/users/me`, {
        method: "PATCH",
        headers: this._headers,

        body: JSON.stringify({
          name: data.name,
          about: data.about,
          avatar: data.avatar,
        }),
      });

      return this._handlePromiseRequest(response);
    } catch (error) {
      console.log(`Ошибка: ${error}`);
      return error;
    }
  }

  async removeCard(cardId) {
    try {
      const response = await fetch(`${this._url}/cards/${cardId}`, {
        method: "DELETE",
        headers: this._headers,
      });
      return this._handlePromiseRequest(response);
    } catch (error) {
      console.log(`Ошибка: ${error}`);
      return error;
    }
  }

  async addNewCard(data) {
    try {
      const response = await fetch(`${this._url}/cards`, {
        method: "POST",
        headers: this._headers,

        body: JSON.stringify({
          name: data.name,
          link: data.link,
        }),
      });
      return this._handlePromiseRequest(response);
    } catch (error) {
      console.log(`Ошибка: ${error}`);
      return error;
    }
  }

  async getCard(cardId) {
    try {
      const response = await fetch(`${this._url}/cards/${cardId}`, {
        method: "GET",
        headers: this._headers,
      });
      return this._handlePromiseRequest(response);
    } catch (error) {
      console.log(`Ошибка: ${error}`);
      return error;
    }
  }

  async updateProfileUserAvatar(data) {
    try {
      const response = await fetch(`${this._url}/users/me/avatar`, {
        method: "PATCH",
        headers: this._headers,
        body: JSON.stringify({
          avatar: data.avatar,
        }),
      });
      return this._handlePromiseRequest(response);
    } catch (error) {
      console.log(`Ошибка: ${error}`);
      return error;
    }
  }
}

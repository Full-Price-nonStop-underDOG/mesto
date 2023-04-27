export class UserInfo {
  constructor(data) {
    // this._nameElement = document.querySelector(nameSelector);
    // this._aboutElement = document.querySelector(infoSelector);
    //console.log(data);
    this._data = data;
    this._name = document.querySelector(data.name);
    this._about = document.querySelector(data.about);
    this._avatar = document.querySelector(data.avatar);
  }

  getUserInfo() {
    return {
      name: this._data.name,
      about: this._data.about,
      avatar: this._data.avatar,
    };
  }

  setUserInfo(data) {
    // this._nameElement.textContent = data.name;
    // this._aboutElement.textContent = data.about;
    this._data.name = data.name;
    this._data.about = data.about;
    this._data.avatar = data.avatar;
    if (data.name) {
      this._name.textContent = this._data.name;
    }

    if (data.about) {
      this._about.textContent = this._data.about;
    }

    if (data.avatar) {
      this._avatar.src = this._data.avatar;
      this._avatar.alt = this._data.name;
    }
  }
}

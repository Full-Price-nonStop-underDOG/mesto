export class UserInfo {
    constructor({nameSelector, infoSelector}) {
      this._nameElement = document.querySelector(nameSelector);
      this._aboutElement = document.querySelector(infoSelector);
    }
  
    getUserInfo() {
      return {
        name: this._nameElement.textContent,
        about: this._aboutElement.textContent,
      };
    }
  
    setUserInfo(data) {
      this._nameElement.textContent = data.name;
      this._aboutElement.textContent = data.about;
      // if (data.name) {
      //   this._name.textContent = this._data.name
      // }
  
      // if (data.info) {
      //   this._about.textContent = this._data.about
      // }
    }
  }
  
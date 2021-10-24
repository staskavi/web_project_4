export default class UserInfo {
    constructor(profileTitle, profileSubtitle, profileImage) {
      this._name = document.querySelector(profileTitle);
      this._about = document.querySelector(profileSubtitle);
      this._image = document.querySelector(profileImage);
    }
  /*Public getter & setter*/
    getUserInfo() {
      const name = this._name.textContent;
      const about = this._about.textContent;
      return { name, about };
    }
  
    setUserInfo(userInfo) {
      const { name, about, avatar } = userInfo;//destuction
      this._name.textContent =  name;
      this._about.textContent =  about;
      this._image.src = avatar;
    }
  }
  
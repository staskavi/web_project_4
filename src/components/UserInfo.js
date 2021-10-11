export default class UserInfo {
    constructor(profileTitle, profileSubtitle) {
      this._name = document.querySelector(profileTitle);
      this._about = document.querySelector(profileSubtitle);
    }
  /*Public getter & setter*/
    getUserInfo() {
      const name = this._name.textContent;
      const about = this._about.textContent;
      return { name, about };
    }
  
    setUserInfo(userInfo) {
      const { editName, editAbout } = userInfo;//destuction
      this._name.textContent =  editName;
      this._about.textContent =  editAbout;
    }
  }
  
export default class UserInfo {
    constructor(profileTitle, profileSubtitle) {
      this._name = document.querySelector(profileTitle);
      this._about = document.querySelector(profileSubtitle);
    }
  /*Public getter & setter*/
    getUserInfo() {
      const name = this._name.textContent;
      const about = this._about.textContent;
      console.log(name);
      return { name, about };
    }
  
    setUserInfo(userInfo) {
      const { edit_name, edit_about } = userInfo;//destuction
      this._name.textContent =  edit_name;
      this._about.textContent =  edit_about;
    }
  }
  
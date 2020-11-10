export default class UserInfo {
  constructor(nameElemenet, aboutElement) {
    this._nameElement = nameElemenet;
    this._aboutElement = aboutElement;
  }

  getUserInfo() {
    const userInfo = {};
    userInfo.name = this._nameElement.textContent;  
    userInfo.about = this._aboutElement.textContent;
    userInfo.id = this._id;
    return userInfo;
  }

  setUserinfo({name, about, _id}) {
    this._nameElement.textContent = name;
    this._aboutElement.textContent = about;
    this._id = _id;
  }
}
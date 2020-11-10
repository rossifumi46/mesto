export default class Api {
  constructor({baseUrl, headers}) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  _makeRequest(endPoint, method='GET', body) {
    return fetch(this._baseUrl + endPoint, {
      method,
      headers: this._headers,
      body
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        
        // если ошибка, отклоняем промис
        console.log(res.err);
        return Promise.reject(`Ошибка: ${res.status}`);
      });
  }

  getProfile() {
    return this._makeRequest('/users/me ');
  }

  getInitialCards() {
    return this._makeRequest('/cards');
  }

  // PATCH https://mesto.nomoreparties.co/v1/cohortId/users/me
  editProfile({name, about}) {
    return this._makeRequest(
      '/users/me',
      'PATCH',
      JSON.stringify({
        name,
        about
      })
    )
  }
 
  // POST https://mesto.nomoreparties.co/v1/cohortId/cards
  createCard(name, link) {
    return this._makeRequest(
      '/cards',
      'POST',
      JSON.stringify({
        name,
        link
      }))
  }

  // DELETE https://mesto.nomoreparties.co/v1/cohortId/cards/cardId
  deleteCard(cardId) {
    return this._makeRequest('/cards/' + cardId, 'DELETE')
  }

  // DELETE https://mesto.nomoreparties.co/v1/cohortId/cards/likes/cardId 
  // PUT https://mesto.nomoreparties.co/v1/cohortId/cards/likes/cardId 
  like(cardId,method) {
    return this._makeRequest('/cards/likes/' + cardId, method);
  }

  // PATCH https://mesto.nomoreparties.co/v1/cohortId/users/me/avatar 
  updateAvatar(avatarUrl) {
    return this._makeRequest('/users/me/avatar', 'PATCH', JSON.stringify({avatar: avatarUrl}));
  }

}
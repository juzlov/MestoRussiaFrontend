export default class Api {
    constructor(options, infoAboutUser, iniCards, serverUrl) {
        this.options = options;
        this.infoAboutUser = infoAboutUser;
        this.iniCards = iniCards;
        this.serverUrl = serverUrl;
    }

    //Загрузка информации о пользователе с сервера и смена имени на эту информацию 
    getNameFromServer() {
        fetch((this.serverUrl + this.options.baseUrl + '/users/me'), {
            method: 'GET',
            headers: this.options.headers
        })
            .then((res) => res.json())
            .then((res) => {
                return res;
            })
            .then((res) => {
                this.infoAboutUser.changeNameFromServer(res.name, res.about); 
            })
            .catch((err) => {
                console.log(err);
            });
    }

    //Загрузка первоначальных карточек с сервера
    getInitialCards() {
       return fetch((this.serverUrl + this.options.baseUrl + '/cards'), {
            method: 'GET',
            headers: this.options.headers
        })
    }

    //заготовка для смены моей аватарки на сервере (Не должно работать)
    changeAvatar() {
        fetch((this.serverUrl + this.options.baseUrl + 'users/me/avatar'), {
            method: 'PATCH',
            headers: this.options.headers,
            body: JSON.stringify({
                "avatar": "https://i.ibb.co/1qLp4R3/s1200.png"
            })
        })
            .then((res) => res.json())
            .catch((err) => {
                console.log(err);
            });
    }

    //смена имени и О себе на сервере
    changeServerName(name, about) {
        fetch((this.serverUrl + this.options.baseUrl + '/users/me'), {
            method: 'PATCH',
            headers: this.options.headers,
            body: JSON.stringify({
                "name": `${name}`,
                "about": `${about}`
            })
        })
            .then((res) => res.json())
            .then(() => {
                this.getNameFromServer();
            })
            .catch((err) => {
                console.log(err);
            });
    }

    // добавление новой карточки
    addNewCard(name, link, callback) {
        return fetch((this.serverUrl + this.options.baseUrl + '/cards'), {
            method: 'POST',
            headers: this.options.headers,
            body: JSON.stringify(
                {
                    "name": `${name}`,
                    "link": `${link}`
                })
        })
        .then(res => res.json())
            .then((result) => {
                if (callback) {
                    callback(result);
                }
            })
            .catch(err => console.log(err));
    }

    //удаление карточки
    deleteCard(cardId) {
       return fetch((this.serverUrl + this.options.baseUrl + '/cards/' + cardId), {
            method: 'DELETE',
            headers: this.options.headers
        })
    }

    // постановка лайка
    likeCard(cardId) {
        return fetch((this.serverUrl + this.options.baseUrl + '/cards/like/' + cardId), {
            method: 'PUT',
            headers: this.options.headers
        })
        
    }

    //снятие лайка
    likeDelete(cardId) {
        return fetch((this.serverUrl + this.options.baseUrl + '/cards/like/' + cardId), {
            method: 'DELETE',
            headers: this.options.headers
        })
    }
}

// класс создания прототипа карточки с методами лайк, ремув                                                                                    
export default class Card {
  constructor(name, link, likes, id, cards, api) {                                                                     
    this.name = name;
    this.link = link;
    this.likes = likes;
    this.id = id;
    this.cards = cards;
    this.api = api;

  }

  like(result) {
    this.result = result;

    this.placeCard.querySelector('.place-card__like-counter').textContent = this.result;
    this.placeCard.querySelector('.place-card__like-icon').classList.toggle('place-card__like-icon_liked');
  }

  likeDelete(result) {
    this.result = result;

    this.placeCard.querySelector('.place-card__like-counter').textContent = this.result;
    this.placeCard.querySelector('.place-card__like-icon').classList.toggle('place-card__like-icon_liked');
  }

  setEventListener() {
    let api = this.api;
    let id = this.id;
    let thiscard = this;

    this.placeCard.querySelector('.place-card__delete-icon').addEventListener('click', function (event) {
      const listOfPlaces = document.querySelectorAll('.place-card');
      api.deleteCard(id)
      .then((res) => {
          if(res.ok) {
            return res.json();
          } else {
            return Promise.reject(err);
          }
        }).then((res) => {
            if (res.message === "Пост удалён") {
              this.closest('.place-card').remove();
            }
          })
          .catch((err) => {
            console.log(err);
        });
    });

    this.placeCard.querySelector('.place-card__like-icon').addEventListener('click', function (event) {
      const listOfPlaces = document.querySelectorAll('.place-card');
      
      if (!event.target.classList.contains('place-card__like-icon_liked')) {
        for (let i = 0; i < listOfPlaces.length; i++) {
          if (listOfPlaces[i].contains(event.target)) {
            api.likeCard(id)
              .then((res) => {
                if (res.ok) {
                    return res.json();
                }
                }).then((res) => {
                    return res.likes.length;
                }).then((res) => {
                    thiscard.like(res);
                })
                .catch((err) => {
                    console.log(err);
                });
          }
        }
      } else {
        for (let i = 0; i < listOfPlaces.length; i++) {
          if (listOfPlaces[i].contains(event.target)) {
            api.likeDelete(id)
              .then((res) => {
                if (res.ok) {
                    return res.json();
                }
                }).then((res) => {
                    return res.likes.length;
                }).then((res) => {
                    thiscard.likeDelete(res);
                })
                .catch((err) => {
                    console.log(err);
                });
          }
        }
      }
    });
  }

  remove() {
    this.placeCard.parentElement.removeChild(this.placeCard);
  }

  create(card) {    
    if (typeof(card.name) != 'undefined') {
      this.name = card.name;
      this.link = card.link;
      this.likes = card.likes;
      this.id = card._id;
      this.isMine = true;
      this.isLike = false;
    }

    let placesList = document.querySelector('.places-list');

    this.placeCard = document.createElement('div');
    let placeCardImage = document.createElement('div');
    let placeCardDescription = document.createElement('div');
    let placeCardName = document.createElement('h3');
    let placeCardDeleteIcon = document.createElement('button');
    let placeCardLikeIcon = document.createElement('button');
    let placeCardLikeCounter = document.createElement('h4');
    let placeCardLikeContainer = document.createElement('div');

    this.placeCard.classList.add('place-card');

    placeCardImage.classList.add('place-card__image');
    placeCardName.classList.add('place-card__name');
    placeCardDescription.classList.add('place-card__description');
    placeCardDeleteIcon.classList.add('place-card__delete-icon');
    placeCardLikeIcon.classList.add('place-card__like-icon');
    placeCardLikeCounter.classList.add('place-card__like-counter');
    placeCardLikeContainer.classList.add('place-card__like-container');

    placeCardImage.style.backgroundImage = `url('${this.link}')`;
    placeCardName.textContent = this.name;
    placeCardLikeCounter.textContent = this.likes;
            
    placeCardImage.appendChild(placeCardDeleteIcon); 
    placeCardDescription.appendChild(placeCardName);
    placeCardDescription.appendChild(placeCardLikeContainer);
    placeCardLikeContainer.appendChild(placeCardLikeIcon);
    placeCardLikeContainer.appendChild(placeCardLikeCounter);

    this.placeCard.appendChild(placeCardImage);
    this.placeCard.appendChild(placeCardDescription);

    if (this.isLike) {
      this.placeCard.querySelector('.place-card__like-icon').classList.add('place-card__like-icon_liked');
    }

    placesList.appendChild(this.placeCard);
    this.setEventListener();

    if (!this.isMine) {
      this.placeCard.querySelector('.place-card__delete-icon').classList.add('place-card__delete-icon_not-mine');
    }
    return this.placeCard;
  }

}
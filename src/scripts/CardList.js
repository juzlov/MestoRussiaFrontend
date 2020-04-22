//класс для создания листа карточек и рендера

export default class CardList {
  constructor(container, iniCards, api, renderCard) {
    this.container = container;
    this.iniCards = iniCards;
    this.api = api;
    this.renderCard = renderCard;
  }

  addCard(card) {
    this.renderCard.create(card);
  }

  render(carder) {
    this.iniCards.forEach(function (elem) {
      carder.name = elem.name;
      carder.link = elem.link;
      carder.likes = elem.likes;
      carder.id = elem.id;
      carder.isLike = elem.isLike;
      carder.isMine = elem.isMine;
      carder.create(carder.name, carder.link, carder.likes, carder.id, carder.isLike, carder.isMine);
    });
  }

  getInitialCards() {
    this.api.getInitialCards()
    .then((res) => {
      if(res.ok) {
        return res.json();
      } else {
        return Promise.reject(err);
      };
    })
        .then((result) => {
              for (let i = 0; i < result.length; i++) {
                const initialCard = {};
                initialCard.name = result[i].name;
                initialCard.link = result[i].link;
                initialCard.likes = result[i].likes.length;
                initialCard.id = result[i]._id;
                
                const isLiked = result[i].likes.some((elem) => {
                  if (elem._id === '5176dd5ab8b6c044a17659a0') {
                   return true;
                  }
                 })
                
                const isMine = (result[i].owner._id === '5176dd5ab8b6c044a17659a0');
                                  
                initialCard.isLike = isLiked;
                initialCard.isMine = isMine;
                this.iniCards.push(initialCard);
          }
          this.render(this.renderCard); 
        })
        .catch((err) => {
            console.log(err);
        });      
  }

  addNewCard(name, link) {
    this.api.addNewCard(name, link, (elem) => {
     if (elem) {
      this.addCard(elem);
     }
    });
    
  }
}




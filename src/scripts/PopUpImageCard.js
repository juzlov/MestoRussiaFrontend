
//класс управляющий попапом для изображений

export default class PopUpImageCard {
  open(event) {     
    if (event.target.classList.contains('place-card__image') === true) {
      const imageUrl = event.target.style.backgroundImage;
      const imageSrcFirst = imageUrl.replace(`url("`, "");
      const imageSrcFinal = imageSrcFirst.replace(`")`, "");
      const image = document.querySelector('.popup-image');
      const imageSource = document.querySelector('.popup__place-image-src');

      image.classList.toggle('popup_is-opened');
      imageSource.insertAdjacentHTML('beforeend', `<img class="popup__place-image" src='${imageSrcFinal}'>`)
    }
  }

  close(event) {
    if (event.target.classList.contains('popup-image__close')) {
      const image = document.querySelector('.popup-image');
      const imageSource = document.querySelector('.popup__place-image-src');  

      image.classList.toggle('popup_is-opened');
      imageSource.textContent = '';
    }
  }
}

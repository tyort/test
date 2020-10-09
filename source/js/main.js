const body = document.querySelector(`body`);
const pageLink = document.querySelector(`.page-link`);
const photoGallery = document.querySelector(`.photo-gallery`);

import {sendRequest, renderComponent, createElement} from './formulas';
import './drag-n-drop';

pageLink.querySelector(`form`).addEventListener(`submit`, (evt) => {
  evt.preventDefault();
  const requestURL = evt.target.querySelector(`#link-phone`).value

  sendRequest('GET', `https://don16obqbay2c.cloudfront.net/frontend-test-task/gallery-images.json`)
    .then(data => {
      const stringOfPhotos = createPhotos(data.galleryImages);
      renderComponent(photoGallery, createElement(stringOfPhotos), `afterBegin`);
      photoGallery.querySelector(`div`).classList.add(`photo-gallery__inner`);
      turnOnListener();
    })
    .catch(err => console.log(err))
});

const turnOnListener = () => {
  const photoGalleryInner = photoGallery.querySelector(`.photo-gallery__inner`);
  const photolist = [...photoGalleryInner.children];

  photolist.forEach((photo) => {
    photo.addEventListener(`click`, () => {
      let photoContainer = createElement(createPhotoContainer(photo.outerHTML)).firstChild;
      renderComponent(body, photoContainer, `afterBegin`);

      photoContainer = document.querySelector(`.photo-container`)
      photoContainer.querySelector(`img`).style.width = `${photo.dataset.width}px`;
      photoContainer.querySelector(`img`).style.height = `${photo.dataset.height}px`;
      photoContainer.addEventListener(`click`, (evt) => onPhotoClick(evt))
    })
  })
}

const createPhotos = (photos) => {
  return photos
    .map((item, index) => {
      return (
        `<img 
          src="${item.url}"
          data-width="${item.width}"
          data-height="${item.height}"
          data-count="${index}"
          alt=""
        >`
      );
    })
    .join(``);
};

const createPhotoContainer = (photo) => {
  return (
    `<div class="photo-container">
      ${photo}
      <button class="button-wide">Удалить фото</button>
    </div>`
  )
}

const onPhotoClick = (evt) => {
  const photoContainer = document.querySelector(`.photo-container`);

  if (evt.target.className === `button-wide`) {
    const count = evt.target.parentElement.querySelector(`img`).dataset.count;
    const allPhotos = [...document.querySelector(`.photo-gallery__inner`).children];
    const unwantedPhoto = allPhotos.find((photo) => photo.dataset.count === count);
    unwantedPhoto.remove();
  }

  photoContainer.removeEventListener(`click`, onPhotoClick);
  photoContainer.remove();
}






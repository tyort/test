const body = document.querySelector(`body`);
const pageDesire = document.querySelector(`.page-desire`);
const photoGallery = document.querySelector(`.photo-gallery`)
const form = pageDesire.querySelector(`form`);
import {sendRequest, renderComponent, createElement} from './formulas';

form.addEventListener(`submit`, (evt) => {
  evt.preventDefault();
  const requestURL = evt.target.querySelector(`#desire-phone`).value

  sendRequest('GET', `https://don16obqbay2c.cloudfront.net/frontend-test-task/gallery-images.json`)
    .then(data => {
      const stringOfPhotos = createPhotos(data.galleryImages);
      renderComponent(photoGallery, createElement(stringOfPhotos), `afterBegin`);
      photoGallery.querySelector(`div`).classList.add(`photo-gallery__inner`);
      turnOnListener();
    })
    .catch(err => console.log(err))
});

const createPhotos = (photos) => {
  return photos
    .map((item) => {
      return (
        `<img 
          src="${item.url}"
          data-width="${item.width}"
          data-height="${item.height}"
          alt=""
        >`
      );
    })
    .join(``);
};

const turnOnListener = () => {
  const sdasd = photoGallery.querySelector(`.photo-gallery__inner`);
  const photolist = [...sdasd.children];

  photolist.forEach((photo) => {
    photo.addEventListener(`click`, () => {
      renderComponent(body, createElement(photo.outerHTML), `afterBegin`);
      body.firstChild.classList.add(`photo-container`);
      const photoContainer = document.querySelector(`.photo-container`)
      photoContainer.querySelector(`img`).style.width = `${photo.dataset.width}px`;
      photoContainer.querySelector(`img`).style.height = `${photo.dataset.height}px`;

      photoContainer.addEventListener(`click`, onPhotoClick)
    })
  })
}


const onPhotoClick = () => {
  const photoContainer = document.querySelector(`.photo-container`);
  photoContainer.removeEventListener(`click`, onPhotoClick);
  photoContainer.remove();
}






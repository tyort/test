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
  photolist.forEach((photo, index) => {
    photo.addEventListener(`click`, () => {

      photolist.forEach((item, count) => {
        if (index !== count) {
          item.classList.toggle(`big-size`, false);
          item.style.width = `auto`;
          item.style.height = `150px`;
          item.style.position = `static`;
        }
      })

      photo.classList.toggle(`big-size`);

      if (photo.classList.contains(`big-size`)) {
        photo.style.width = `${photo.dataset.width}px`;
        photo.style.height = `${photo.dataset.height}px`;
        photo.style.position = `fixed`;
      } else {
        photo.style.width = `auto`;
        photo.style.height = `150px`;
        photo.style.position = `static`;
      }
    })
  })
}






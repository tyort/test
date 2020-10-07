const body = document.querySelector(`body`);
const pageDesire = document.querySelector(`.page-desire`);
const form = pageDesire.querySelector(`form`);
import {sendRequest, renderComponent, createElement} from './formulas';

const createPhotos = (photos) => {
  return photos
    .map((item) => {
      return (
        `<a href="#"><img src="${item.url}" width="${item.width}" height="${item.height}" alt=""></a>`
      );
    })
    .join(``);
};

form.addEventListener(`submit`, (evt) => {
  evt.preventDefault();
  const requestURL = evt.target.querySelector(`#desire-phone`).value

  sendRequest('GET', `https://don16obqbay2c.cloudfront.net/frontend-test-task/gallery-images.json`)
    .then(data => {
      const stringOfPhotos = createPhotos(data.galleryImages);
      const photoGallery = document.querySelector(`.photo-gallery`)
      renderComponent(photoGallery, createElement(stringOfPhotos), `afterBegin`);
    })
    .catch(err => console.log(err))
});




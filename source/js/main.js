const body = document.querySelector(`body`);
const pageLink = document.querySelector(`.page-link`);
const photoGallery = document.querySelector(`.photo-gallery`);
const movingEvents = [`dragenter`, `dragover`, `dragleave`, `drop`];

import {sendRequest, renderComponent, createElement} from './formulas';

pageLink.querySelector(`form`).addEventListener(`submit`, (evt) => {
  evt.preventDefault();
  const requestURL = evt.target.querySelector(`#link-address`).value

  sendRequest('GET', requestURL)
    .then(data => {
      const stringOfPhotos = createPhotos(data.galleryImages);

      renderComponent(photoGallery, createElement(stringOfPhotos), `afterBegin`);
      photoGallery.querySelector(`div`).classList.add(`photo-gallery__inner`);

      turnOnListener();
      pageLink.querySelector(`form`).reset();
    })
    .catch(err => console.log(err))
});

body.addEventListener(`drop`, (evt) => {
  if (document.querySelector(`.photo-gallery__inner`)) {
    const storage = evt.dataTransfer; // Объект DataTransfer используется для хранения данных, перетаскиваемых мышью во время операции drag and drop
    const files = [...storage.files]; // список файлов с характеристиками
    files.forEach((file) => previewFile(file));
  }
})

const turnOnListener = () => {
  const photoGalleryInner = photoGallery.querySelector(`.photo-gallery__inner`);
  const photolist = [...photoGalleryInner.children];

  photolist.forEach((item) => {
    const photo = item.querySelector(`img`);

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
        `<div class="placeholder">
          <img 
            src="${item.url}"
            data-width="${item.width}"
            data-height="${item.height}"
            data-count="${index}"
            alt="">
        </div>`
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

    const unwantedPhoto = allPhotos.find((item) => {
      const photo = item.querySelector(`img`);
      return photo.dataset.count === count;
    });

    unwantedPhoto.remove();
  }

  photoContainer.removeEventListener(`click`, onPhotoClick);
  photoContainer.remove();
}


movingEvents.forEach((eventName) => {
  body.addEventListener(eventName, (evt) => {
    evt.preventDefault()
    evt.stopPropagation()
  })
})

const previewFile = (file) => {
  const reader = new FileReader();
  reader.readAsDataURL(file);

  reader.onloadend = function() {
    const image = new Image();
    image.src = reader.result;

    image.onload = function() {
      const lastPhoto = document.querySelector(`.photo-gallery__inner`).lastChild.querySelector(`img`);
      const count = Number(lastPhoto.dataset.count) + 1;
      let droppedPhoto = createPhotoByDrop(this.width, this.height, image.src, count);
      renderComponent(document.querySelector(`.photo-gallery__inner`), createElement(droppedPhoto).firstChild);

      droppedPhoto = document.querySelector(`.photo-gallery__inner`).lastChild.querySelector(`img`);
      droppedPhoto.addEventListener(`click`, () => {
        let photoContainer = createElement(createPhotoContainer(droppedPhoto.outerHTML)).firstChild;
        renderComponent(body, photoContainer, `afterBegin`);
  
        photoContainer = document.querySelector(`.photo-container`)
        photoContainer.querySelector(`img`).style.width = `${droppedPhoto.dataset.width}px`;
        photoContainer.querySelector(`img`).style.height = `${droppedPhoto.dataset.height}px`;
        photoContainer.addEventListener(`click`, (evt) => onPhotoClick(evt))
      })
    };
  }
}

const createPhotoByDrop = (width, height, src, count) => {
  return (
    `<div class="placeholder">
      <img 
        src="${src}"
        data-width="${width}"
        data-height="${height}"
        data-count="${count}"
        alt="">
    </div>`
  );
};





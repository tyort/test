const body = document.querySelector(`body`);
const pageLink = document.querySelector(`.page-link`);
const photoGallery = document.querySelector(`.photo-gallery`);

import {sendRequest, renderComponent, createElement} from './formulas';

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


const dropArea = document.querySelector(`#drop-area`);
const movingEvents = [`dragenter`, `dragover`, `dragleave`, `drop`];

movingEvents.forEach((eventName) => {
  dropArea.addEventListener(eventName, preventDefaults)
})

function preventDefaults (evt) {
  evt.preventDefault()
  evt.stopPropagation()
}

movingEvents.slice(0, 2).forEach(eventName => {
  dropArea.addEventListener(eventName, highlight)
})
movingEvents.slice(2, 5).forEach(eventName => {
  dropArea.addEventListener(eventName, unhighlight)
})
function highlight() {
  dropArea.classList.add('highlight')
}
function unhighlight() {
  dropArea.classList.remove('highlight')
}

dropArea.addEventListener(`drop`, handleDrop)
function handleDrop(e) {
  let dt = e.dataTransfer
  let files = dt.files
  handleFiles(files)
}

function handleFiles(files) {
  files = [...files]
  initializeProgress(files.length) // <- Добавили эту строку
  files.forEach(uploadFile)
  files.forEach(previewFile)
}

function uploadFile(file, i) { // <- Добавили параметр `i`
  var url = 'http://192.168.43.222:8080'
  var xhr = new XMLHttpRequest()
  var formData = new FormData()
  xhr.open('POST', url, true)
  // Добавили следующие слушатели
  xhr.upload.addEventListener("progress", function(e) {
    updateProgress(i, (e.loaded * 100.0 / e.total) || 100)
  })
  xhr.addEventListener('readystatechange', function(e) {
    if (xhr.readyState == 4 && xhr.status == 200) {
      // Готово. Сообщаем пользователю
    }
    else if (xhr.readyState == 4 && xhr.status != 200) {
      // Ошибка. Сообщаем пользователю
    }
  })
  formData.append('file', file)
  xhr.send(formData)
}

function previewFile(file) {
  let reader = new FileReader()
  reader.readAsDataURL(file)
  reader.onloadend = function() {
    let img = document.createElement('img')
    img.src = reader.result
    document.getElementById('gallery').appendChild(img)
  }
}

let uploadProgress = [];
let progressBar = document.getElementById('progress-bar')

function initializeProgress(numFiles) {
  progressBar.value = 0
  uploadProgress = []
  for(let i = numFiles; i > 0; i--) {
    uploadProgress.push(0)
  }
}
function updateProgress(fileNumber, percent) {
  uploadProgress[fileNumber] = percent
  let total = uploadProgress.reduce((tot, curr) => tot + curr, 0) / uploadProgress.length
  progressBar.value = total
}





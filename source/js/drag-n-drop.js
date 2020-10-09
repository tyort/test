const dropArea = document.querySelector(`#drop-area`);
const movingEvents = [`dragenter`, `dragover`, `dragleave`, `drop`];
console.log(dropArea)

movingEvents.forEach((eventName) => {
  dropArea.addEventListener(eventName, (evt) => {
    evt.preventDefault()
    evt.stopPropagation()
  })
})

movingEvents.forEach((eventName, index) => {
  if (index <= 1) {
    dropArea.addEventListener(eventName, () => dropArea.classList.toggle('highlight', true));
  } else {
    dropArea.addEventListener(eventName, () => dropArea.classList.toggle('highlight', false));
  }
})

dropArea.addEventListener(`drop`, (evt) => {
  let dt = evt.dataTransfer; // Объект DataTransfer используется для хранения данных, перетаскиваемых мышью во время операции drag and drop
  let files = [...dt.files]; // список файлов с характеристиками
  files.forEach(previewFile)
})

function previewFile(file) {
  let reader = new FileReader()
  reader.readAsDataURL(file)
  reader.onloadend = function() {
    let img = document.createElement(`img`)
    img.src = reader.result
    document.getElementById(`gallery`).appendChild(img)
  }
}
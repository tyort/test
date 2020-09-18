const programs = document.querySelector(`.page-catalogue`);
const list = programs === null ? null : programs.querySelector(`.catalogue-details__list`);
const listMobile = programs === null ? null : programs.querySelector(`.catalogue-details__list--mobile`);
const actualDescriptions = programs === null ? null : programs.querySelector(`.catalogue-details__descriptions`);
let CURRENT_ITEM = `Общие`;

window.$(document).ready(() => {
  window.$(`.catalogue-details__list--mobile`).slick({
    dots: false,
    infinite: true,
    speed: 300,
    slidesToShow: 5,
    centerMode: true,
    variableWidth: false,
    swipe: true,
    focusOnSelect: true,
    centerPadding: `21%`,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          arrows: false,
          dots: false,
          infinite: true,
          speed: 300,
          slidesToShow: 1,
          centerMode: true,
          variableWidth: false,
          swipe: true,
          focusOnSelect: true,
          centerPadding: `21%`
        },
      }
    ]
  });

  window.$(`.catalogue-details__list--mobile`).on(`afterChange`, (event, slick, _currentSlide) => {
    const activeButton = [...slick.$slides].find((it) => {
      return it.classList.contains(`slick-active`);
    });

    activeButton.querySelector(`button`).textContent.trim();
    CURRENT_ITEM = activeButton.querySelector(`button`).textContent.trim();
    reRender();
  });
});

if (list) {
  list.addEventListener(`click`, onButtonClick);
}

const createItemsDescriptions = (currentProgram) => {
  [...actualDescriptions.children].forEach((item) => {
    item.classList.toggle(`visually-hidden`, true);
    if (item.querySelector(`h3`).textContent.trim() === currentProgram) {
      item.classList.toggle(`visually-hidden`, false);
    }
  });
};

const createItemsButtons = (currentProgram) => {
  [...list.children].forEach((item) => {
    item.querySelector(`button`).classList.toggle(`btn-isChecked`, false);
    if (item.querySelector(`button`).textContent.trim() === currentProgram) {
      item.querySelector(`button`).classList.toggle(`btn-isChecked`, true);
    }
  });
};

function onButtonClick(evt) {
  if (CURRENT_ITEM !== evt.target.textContent.trim() && evt.target.classList.contains(`catalogue-details__item`)) {
    CURRENT_ITEM = evt.target.textContent.trim();
    reRender();
  }
}

function reRender() {
  createItemsButtons(CURRENT_ITEM);
  createItemsDescriptions(CURRENT_ITEM);
}

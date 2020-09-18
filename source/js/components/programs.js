const programs = document.querySelector(`.page-catalogue`);
const list = programs === null ? null : programs.querySelector(`.catalogue-details__list`);
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
    centerPadding: `0`,
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
          centerPadding: `15%`
        },
      }
    ]
  });

  window.$(`.catalogue-details__list`).on(`afterChange`, (event, slick, currentSlide) => {
    [...slick.$slides].forEach((item, index) => {
      item.querySelector(`button`).classList.toggle(`btn-isChecked`, false);
      if (index === currentSlide) {
        item.querySelector(`button`).classList.toggle(`btn-isChecked`, true);
      }
    });

  });
});

if (list) {
  list.addEventListener(`click`, onButtonClick);
}

function onButtonClick(evt) {
  if (CURRENT_ITEM !== evt.target.textContent.trim() && evt.target.classList.contains(`catalogue-details__item`)) {
    CURRENT_ITEM = evt.target.textContent.trim();
    reRender(CURRENT_ITEM);
  }
}

function reRender(currentProgram) {
  [...actualDescriptions.children].forEach((item) => {
    item.classList.toggle(`visually-hidden`, true);
    if (item.querySelector(`h3`).textContent.trim() === currentProgram) {
      item.classList.toggle(`visually-hidden`, false);
    }
  });
}

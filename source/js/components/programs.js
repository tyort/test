const programs = document.querySelector(`.page-catalogue`);
const actualDescriptions = programs === null ? null : programs.querySelector(`.catalogue-details__descriptions`);

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
          centerPadding: `35%`
        }
      },
      {
        breakpoint: 630,
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
          centerPadding: `30%`
        }
      },
      {
        breakpoint: 450,
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
          centerPadding: `20%`
        }
      }
    ]
  });

  window.$(`.catalogue-details__list`).on(`afterChange`, (event, slick, currentSlide) => {
    [...programs.querySelectorAll(`.slick-cloned`)].forEach((item) => {
      item.querySelector(`button`).classList.toggle(`catalogue-details__item--isChecked`, false);
    });

    [...slick.$slides].forEach((item, index) => {
      item.querySelector(`button`).classList.toggle(`catalogue-details__item--isChecked`, false);
      if (index === currentSlide) {
        item.querySelector(`button`).classList.toggle(`catalogue-details__item--isChecked`, true);
      }
    });

    [...actualDescriptions.children].forEach((item, index) => {
      item.classList.toggle(`visually-hidden`, true);
      if (index === currentSlide) {
        item.classList.toggle(`visually-hidden`, false);
      }
    });
  });

});

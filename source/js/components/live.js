const list = document.querySelector(`.live-pictures`);
const listMobile = document.querySelector(`.live-pictures--mobile`);

window.$(document).ready(() => {
  window.$(`.live-pictures--mobile`).slick({
    dots: false,
    infinite: true,
    speed: 300,
    slidesToShow: 1,
    centerMode: true,
    variableWidth: false,
    swipe: true,
    focusOnSelect: true,
    centerPadding: `20%`,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          arrows: false,
        }
      }
    ]
  });
});

document.addEventListener(`DOMContentLoaded`, function () {
  if (window.innerWidth >= 768) {
    list.classList.toggle(`visually-hidden`, false);
    listMobile.classList.toggle(`visually-hidden`, true);

  } else {
    list.classList.toggle(`visually-hidden`, true);
    listMobile.classList.toggle(`visually-hidden`, false);
  }
});

window.addEventListener(`resize`, () => {
  if (window.innerWidth >= 768) {
    list.classList.toggle(`visually-hidden`, false);
    listMobile.classList.toggle(`visually-hidden`, true);

  } else {
    list.classList.toggle(`visually-hidden`, true);
    listMobile.classList.toggle(`visually-hidden`, false);
  }
});

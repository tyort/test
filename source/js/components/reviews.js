const reviews = document.querySelector(`.page-reviews`);
const counter = document.querySelector(`.page-reviews__counter`);

window.$(document).ready(() => {
  window.$(`.page-reviews__list`).slick({
    dots: true,
    infinite: true,
    speed: 300,
    slidesToShow: 1,
    centerMode: true,
    variableWidth: false,
    swipe: true,
    focusOnSelect: true,
    centerPadding: `0%`,
    adaptiveHeight: true
  });

  const dots = reviews.querySelector(`.slick-dots`);
  const length = [...dots.children].length;
  const slickNext = reviews.querySelector(`.slick-next`);
  const slickPrev = reviews.querySelector(`.slick-prev`);

  dots.classList.toggle(`visually-hidden`, true);
  counter.textContent = `1 / ${length}`;
  slickNext.textContent = ``;
  slickPrev.textContent = ``;

  window.$(`.page-reviews__list`).on(`afterChange`, function (event, slick, currentSlide) {
    counter.textContent = `${currentSlide + 1} / ${length}`;
  });
});



import AbstractSmartComponent from './abstract-smart-component.js';

// const sdfsdfdsf = (element) => {
//   switch (element) {
//     case `menu__nav-item--first`:
//       return document.querySelector(`#slick-slide-control00`);
//     case `menu__nav-item--second`:
//       return document.querySelector(`#slick-slide-control01`);
//     case `menu__nav-item--third`:
//       return document.querySelector(`#slick-slide-control02`);
//     case `menu__nav-item--forth`:
//       return document.querySelector(`#slick-slide-control03`);
//     default:
//       return null;
//   }
// };

const createPresentationTemplate = () => {
  return (
    `<div class="page-presentation">
        <div class="page-presentation__slider">
          <div class="page-presentation-item__view">
            <img src="img/slide-cards.svg" alt="cards">
          </div>
          <div class="page-presentation-item__view">
            <img src="img/slide-confidence.svg" alt="confidence">
          </div>
          <div class="page-presentation-item__view">
            <img src="img/slide-girl.svg" alt="girl">
          </div>
        </div>
    </div>`);
};


export default class OffersMenu extends AbstractSmartComponent {
  constructor() {
    super();
    this._getInitMap();
    this._subscribeOnEvents();
  }

  getTemplate() {
    return createPresentationTemplate();
  }

  _getInitMap() {
    window.$(document).ready(() => {
      window.$(`.page-presentation__slider`).slick({
        dots: true,
        infinite: true,
        speed: 300,
        slidesToShow: 1,
        adaptiveHeight: true,
        arrows: false,
      });
    });
  }

  _subscribeOnEvents() {}
}

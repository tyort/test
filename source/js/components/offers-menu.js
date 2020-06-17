import AbstractSmartComponent from './abstract-smart-component.js';

const getCheckedSlickSlide = (element) => {
  switch (element) {
    case `menu__nav-item--first`:
      return document.querySelector(`#slick-slide-control00`);
    case `menu__nav-item--second`:
      return document.querySelector(`#slick-slide-control01`);
    case `menu__nav-item--third`:
      return document.querySelector(`#slick-slide-control02`);
    case `menu__nav-item--forth`:
      return document.querySelector(`#slick-slide-control03`);
    default:
      return null;
  }
};

const createOffersMenuTemplate = () => {
  return (
    `<div class="page-offers-menu">
        <div class="page-offers-menu__inner">
          <div class="page-offers-menu__nav">
            <button class="menu__nav-item--first">Вклады</button>
            <button class="menu__nav-item--second">Кредиты</button>
            <button class="menu__nav-item--third">Страхование</button>
            <button class="menu__nav-item--forth">Онлайн-сервисы</button>
          </div>
          <div class="page-offers__slider">
            <div class="page-offers-item__view">
                <img src="img/slide-deposit.svg" alt="deposit" width="1170" height="410">
            </div>
            <div class="page-offers-item__view">
                <img src="img/slide-credits.svg" alt="credits" width="1170" height="410">
            </div>
            <div class="page-offers-item__view">
                <img src="img/slide-insurance.svg" alt="insurance" width="1170" height="410">
            </div>
            <div class="page-offers-item__view">
                <img src="img/slide-online.svg" alt="online" width="1170" height="410">
            </div>
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
    return createOffersMenuTemplate();
  }

  _getInitMap() {
    window.$(document).ready(() => {
      window.$(`.page-offers__slider`).slick({
        dots: true,
        infinite: true,
        speed: 300,
        slidesToShow: 1,
        adaptiveHeight: true,
        arrows: false
      });

      document.querySelector(`.slick-dots`).classList.add(`visually-hidden`);
    });
  }

  _subscribeOnEvents() {
    const element = this.getElement();

    element.querySelector(`.page-offers-menu__nav`)
        .addEventListener(`click`, (evt) => {
          getCheckedSlickSlide(evt.target.className).click();
        });
  }
}

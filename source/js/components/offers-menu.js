import AbstractSmartComponent from './abstract-smart-component.js';

const pointersNumbers = [`first`, `second`, `third`, `forth`];
const pointersNames = [`Вклады`, `Кредиты`, `Страхование`, `Онлайн-сервисы`];

const getCheckedSlickSlide = (element) => {
  const pageOffersMenu = document.querySelector(`.page-offers-menu`);

  switch (element) {
    case `menu__nav-item--first`:
      return pageOffersMenu.querySelector(`#slick-slide-control00`);
    case `menu__nav-item--second`:
      return pageOffersMenu.querySelector(`#slick-slide-control01`);
    case `menu__nav-item--third`:
      return pageOffersMenu.querySelector(`#slick-slide-control02`);
    case `menu__nav-item--forth`:
      return pageOffersMenu.querySelector(`#slick-slide-control03`);
    default:
      return null;
  }
};

const createButtons = () => {
  return pointersNumbers
      .map((item, index) => {
        const isElementChecked = index === 0 ? `#F6F7FF` : ``;
        return (
          `<button class="menu__nav-item--${item}" style="background: ${isElementChecked}">${pointersNames[index]}</button>`
        );
      })
      .join(``);
};

const createOffersMenuTemplate = () => {
  return (
    `<div class="page-offers-menu">
      <div class="page-offers-menu__nav">
        ${createButtons()}
      </div>

      <div class="page-offers__slider">

        <div class="page-offers-item__view">
          <div class="page-offers-item__view--inner">
            <div class="page-offers__service--description">
              <p class="page-offers__service--title">
                Вклады Лига Банка - это выгодная</br>инвестиция в свое будущее
              </p>
              <ul class="page-offers__service--advantages">
                <li>Проценты по вкладам до 7%</li>
                <li>Разнообразные условия</li>
                <li>Возможность ежемесячной капитализации</br>или вывод процентов на банковскую карту</li>
              </ul>
              <button class="page-offers__service--btn">Узнать подробнее</Button>
            </div>
            <div class="page-offers__service--photo piggy-pic">
              <img src="img/piggybank.svg" alt="piggybank">
            </div>
          </div>
        </div>

        <div class="page-offers-item__view">
          <div class="page-offers-item__view--inner">
            <div class="page-offers__service--description">
              <p class="page-offers__service--title">
                Лига Банк выдает кредиты</br>под любые цели
              </p>
              <ul class="page-offers__service--advantages">
                <li>Ипотечный кредит</li>
                <li>Автокредит</li>
                <li>Потребительский кредит</li>
              </ul>
              <div class="page-offers__service--link">
                <p>Рассчитайте ежемесячный платеж</p>
                <p>и ставку по кредиту воспользовавшись</p>
                <p>нашим <a href="#">кредитным калькулятором</a></p>
              </div>
            </div>
            <div class="page-offers__service--photo car-pic">
              <img src="img/car.svg" alt="car">
            </div>
          </div>
        </div>

        <div class="page-offers-item__view">
            <img src="img/slide-insurance.svg" alt="insurance" width="1170" height="410">
        </div>
        <div class="page-offers-item__view">
            <img src="img/slide-online.svg" alt="online" width="1170" height="410">
        </div>

      </div>
      
    </div>`);
};


export default class OffersMenu extends AbstractSmartComponent {
  constructor() {
    super();
    this._getInitSlider();
    this._subscribeOnEvents();
  }

  getTemplate() {
    return createOffersMenuTemplate();
  }

  _getInitSlider() {
    window.$(document).ready(() => {
      window.$(`.page-offers__slider`).slick({
        dots: true,
        infinite: true,
        speed: 300,
        slidesToShow: 1,
        adaptiveHeight: true,
        arrows: false
      });

      // document.querySelector(`.slick-dots`).classList.add(`visually-hidden`);
    });
  }

  _subscribeOnEvents() {
    const element = this.getElement();
    element.querySelector(`.page-offers-menu__nav`)
        .addEventListener(`click`, (evt) => {
          getCheckedSlickSlide(evt.target.className.trim()).click();
          Array.from(document.querySelector(`.page-offers-menu__nav`).children)
              .forEach((it) => {
                it.style.backgroundColor = `white`;
              });

          evt.target.style.backgroundColor = `#F6F7FF`;
        });
  }
}


/* <img src="img/slide-service.svg" alt="service" width="1170" height="410"> */

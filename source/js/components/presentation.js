import AbstractSmartComponent from './abstract-smart-component.js';

const createPresentationTemplate = () => {
  return (
    `<div class="page-presentation">
      <div class="page-presentation-item__view first-slide">
        <div class="page-presentation-item__view-inner">
          <div class="page-presentation__essence">
            <p class="page-presentation__offer-title">Лига Банк</p>
            <p class="page-presentation__offer-comment">Кредиты на любой случай</p>
            <a class="page-presentation__offer-btn" href="#page-calculator">Рассчитать кредит</a>
          </div>
          <picture>
            <source srcset="img/black-card.svg" media="(max-width: 767px)">
            <img src="img/credit-cards.svg" alt="logo">
          </picture>
        </div>
      </div>
      <div class="page-presentation-item__view second-slide">
        <div class="page-presentation-item__view-inner">
          <div class="page-presentation__essence">
            <p class="page-presentation__offer-title">Лига Банк</p>
            <p class="page-presentation__offer-comment">Ваша уверенность в завтрашнем дне</p>
          </div>
        </div>
      </div>
      <div class="page-presentation-item__view third-slide">
        <div class="page-presentation-item__view-inner">
          <div class="page-presentation__essence">
            <p class="page-presentation__offer-title">Лига Банк</p>
            <p class="page-presentation__offer-comment">Всегда рядом</p>
            <a class="page-presentation__offer-btn" href="#branches-map">Найти отделение</a>
          </div>
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
    return createPresentationTemplate();
  }

  _getInitSlider() {
    window.$(document).ready(() => {
      window.$(`.page-presentation`).slick({
        autoplay: true,
        autoplaySpeed: 4000,
        dots: true,
        infinite: true,
        speed: 300,
        slidesToShow: 1,
        adaptiveHeight: true,
        arrows: false
      });
    });
  }

  _subscribeOnEvents() {}
}

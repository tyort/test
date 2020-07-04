import AbstractSmartComponent from './abstract-smart-component.js';

const createPresentationTemplate = () => {
  return (
    `<div class="page-presentation">
      <div class="page-presentation-item__view first-slide">
        <div class="page-presentation-item__view--inner">
          <div class="page-presentation__essence">
            <p class="page-presentation__credits-offer--title">Лига Банк</p>
            <p class="page-presentation__credits-offer--comment">Кредиты на любой случай</p>
            <button class="page-presentation__credits-offer--btn">Рассчитать кредит</button>
          </div>
          <div class="page-presentation__credits-offer--photo">
            <img src="img/credit-cards.svg" alt="credit-cards">
          </div>
        </div>
      </div>
      <div class="page-presentation-item__view second-slide">
        <div class="page-presentation-item__view--inner">
          <div class="page-presentation__essence">
            <p class="page-presentation__confidence--title">Лига Банк</p>
            <p class="page-presentation__confidence--comment">Ваша уверенность в завтрашнем дне</p>
          </div>
        </div>
      </div>
      <div class="page-presentation-item__view third-slide">
        <div class="page-presentation-item__view--inner">
          <div class="page-presentation__essence">
            <p class="page-presentation__closeness--title">Лига Банк</p>
            <p class="page-presentation__closeness--comment">Всегда рядом</p>
            <button class="page-presentation__closeness--btn">Найти отделение</button>
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
        dots: true,
        infinite: true,
        speed: 300,
        slidesToShow: 1,
        adaptiveHeight: true,
        arrows: false,
        // autoplay: true,
        // autoplaySpeed: 4000,
      });
    });
  }

  _subscribeOnEvents() {}
}

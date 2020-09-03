import AbstractSmartComponent from './abstract-smart-component.js';

const createHeaderTemplate = () =>
  (
    `<div class="page-header">
      <div class="page-header__inner">
        <div class="page-header__inner-top">
          <a href="tel:+97226216581">+ (972) 2 – 621 – 6581</a>
          <a class="page-header__logo">
            <img src="img/logo.png" alt="логотип компании" width="137" height="48">
          </a>
          <div class="page-header__btn">Заказать звонок</div>
        </div>

        <p>Учёба, путешествие и карьера
        для еврейской молодёжи</p>
      </div>
    </div>`
  );

export default class Header extends AbstractSmartComponent {
  constructor() {
    super();
    this._showCallRequest = null;
    this._subscribeOnEvents();
  }

  getTemplate() {
    return createHeaderTemplate();
  }

  setCallRequestHandler(handler) {
    this._showCallRequest = handler;
  }

  recoveryListeners() {
    this._subscribeOnEvents();
  }

  reRender() {
    super.reRender();
  }

  _subscribeOnEvents() {
    const element = this.getElement();

    element.querySelector(`.page-header__btn`)
        .addEventListener(`click`, () => {
          this._showCallRequest();
        });
  }
}

import AbstractSmartComponent from './abstract-smart-component.js';

const createHeaderTemplate = () =>
  (
    `<div class="page-header">
      <div class="page-header__inner">
        <div class="page-header__inner-top">
          <a href="tel:88001112233">8 800 111 22 33</a>
          <div class="page-header__btn">Заказать звонок</div>
        </div>
      </div>
    </div>`
  );

export default class Header extends AbstractSmartComponent {
  constructor() {
    super();
    this._callRequest = null;
    this._subscribeOnEvents();
  }

  getTemplate() {
    return createHeaderTemplate();
  }

  setCallRequestHandler(handler) {
    this._callRequest = handler;
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
          this._callRequest();
        });
  }
}

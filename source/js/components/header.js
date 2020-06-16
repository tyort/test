import AbstractSmartComponent from './abstract-smart-component.js';

const createHeaderTemplate = () => {

  return (`<header class="page-header">
            <div class="page-header__logo">
              <img src="img/logo.svg" alt="ЛИГА Банк" width="149" height="25">
            </div>
            <ul class="main-nav">
              <li><a href="#">Услуги</a></li>
              <li><a href="#">Рассчитать кредит</a></li>
              <li><a href="#">Контакты</a></li>
              <li><a href="#">Задать вопрос</a></li>
            </ul>
            <div class="btn btn-page-header__login">
              <img src="img/login-icon.svg" alt="Войти в Интернет-банк" width="203" height="22">
            </div>
          </header>`);
};

export default class Header extends AbstractSmartComponent {
  constructor() {
    super();
    this._showRegistration = null;
    this._subscribeOnEvents();
  }

  getTemplate() {
    return createHeaderTemplate();
  }

  setShowRegistrationHandler(handler) {
    this._showRegistration = handler;
  }

  recoveryListeners() {
    this._subscribeOnEvents();
  }

  reRender() {
    super.reRender();
    this.recoveryListeners();
  }

  _subscribeOnEvents() {
    const element = this.getElement();

    element.querySelector(`.btn-page-header__login`)
        .addEventListener(`click`, () => {
          this._showRegistration();
        });
  }
}

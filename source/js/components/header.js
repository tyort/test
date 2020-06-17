import AbstractSmartComponent from './abstract-smart-component.js';

const createHeaderTemplate = () => {

  return (`<header class="page-header">
            <div class="page-header__menu-icon">
              <div class="page-header__menu-icon--lines"></div>
            </div>
            <div class="page-header__logo">
              <p>ЛИГА Банк<p>
            </div>
            <div class="main-nav">
              <ul class="main-nav__list">
                <li class="main-nav__item"><a class="main-nav__item--link" href="#">Услуги</a></li>
                <li class="main-nav__item"><a class="main-nav__item--link" href="#">Рассчитать кредит</a></li>
                <li class="main-nav__item"><a class="main-nav__item--link" href="#">Контакты</a></li>
                <li class="main-nav__item"><a class="main-nav__item--link" href="#">Задать вопрос</a></li>
              </ul>
            </div>
            <div class="main-nav--mobile">
              <ul class="main-nav--mobile__list">
                <li class="main-nav--mobile__item"><a class="main-nav--mobile__item--link" href="#">Услуги</a></li>
                <li class="main-nav--mobile__item"><a class="main-nav--mobile__item--link" href="#">Рассчитать кредит</a></li>
                <li class="main-nav--mobile__item"><a class="main-nav--mobile__item--link" href="#">Контакты</a></li>
                <li class="main-nav--mobile__item"><a class="main-nav--mobile__item--link" href="#">Задать вопрос</a></li>
              </ul>
            </div>
            <div class="btn-page-header__login">
              <p>Войти в Интернет-банк<p>
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


{/* <img src="img/logo.svg" alt="ЛИГА Банк" width="149" height="25"></img> */}
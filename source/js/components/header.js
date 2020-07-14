import AbstractSmartComponent from './abstract-smart-component.js';

const createHeaderTemplate = (options = {}) => {
  const {} = options;

  return (`<header class="page-header" id="head-of-page">
            <div class="container">
              <div class="page-header__menu-icon">
                <div class="page-header__menu-icon-lines"></div>
              </div>
              <div class="page-header__logo">
                <a class="page-header__logo-link"><img src="img/logo.svg" alt="logo"></a>
              </div>
              <div class="main-nav">
                <ul class="main-nav__list">
                  <li class="main-nav__item"><a class="main-nav__item-link" href="#">Услуги</a></li>
                  <li class="main-nav__item"><a class="main-nav__item-link" href="#">Рассчитать кредит</a></li>
                  <li class="main-nav__item"><a class="main-nav__item-link" href="#">Контакты</a></li>
                  <li class="main-nav__item"><a class="main-nav__item-link" href="#">Задать вопрос</a></li>
                </ul>
              </div>
              <div class="main-nav-mobile">
                <ul class="main-nav-mobile__list">
                  <li class="main-nav-mobile__item"><a class="main-nav-mobile__item-link" href="#">Услуги</a></li>
                  <li class="main-nav-mobile__item"><a class="main-nav-mobile__item-link" href="#">Рассчитать кредит</a></li>
                  <li class="main-nav-mobile__item"><a class="main-nav-mobile__item-link" href="#">Контакты</a></li>
                  <li class="main-nav-mobile__item"><a class="main-nav-mobile__item-link" href="#">Задать вопрос</a></li>
                </ul>
              </div>
              <button class="btn-page-header__login">
                <p>Войти в Интернет-банк<p>
              </button>
            </div>
          </header>`);
};

export default class Header extends AbstractSmartComponent {
  constructor() {
    super();
    this._showRegistration = null;
    this._onEscKeyDown = this._onEscKeyDown.bind(this);
    this._subscribeOnEvents();
  }

  getTemplate() {
    return createHeaderTemplate({});
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
          document.querySelector(`.field-login__input`).focus();
          document.querySelector(`body`).style.overflow = `hidden`;
        });

    element.querySelector(`.page-header__menu-icon`)
        .addEventListener(`click`, () => {
          document.addEventListener(`keydown`, this._onEscKeyDown);

          if (element.querySelector(`.page-header__menu-icon-lines`).classList.contains(`lines__active`)) {
            document.removeEventListener(`keydown`, this._onEscKeyDown);
          }

          element.querySelector(`.main-nav-mobile`).classList.toggle(`main-nav-mobile-active`);
          element.querySelector(`.page-header__menu-icon-lines`).classList.toggle(`lines__active`);
        });
  }

  _onEscKeyDown(evt) {
    if (evt.key === `Escape` || evt.key === `Esc`) {
      const element = this.getElement();
      element.querySelector(`.main-nav-mobile`).classList.toggle(`main-nav-mobile-active`, false);
      element.querySelector(`.page-header__menu-icon-lines`).classList.toggle(`lines__active`, false);
      document.removeEventListener(`keydown`, this._onEscKeyDown);
    }
  }
}

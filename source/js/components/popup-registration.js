import AbstractSmartComponent from './abstract-smart-component.js';

const createPopupTemplate = (options = {}) => {
  const {isPopupHidden} = options;
  const isElementHidden = isPopupHidden ? `visually-hidden` : ``;

  return (`<div class="popup-registration ${isElementHidden}">
            <form class="popup-registration__form">
              <div class="popup-registration__content-header">
                <img src="img/reglogo.svg" alt="ЛИГА Банк" width="150" height="27">
                <a href="#" class="popup-registration__close"></a>
              </div>
              <div class="field-login__field">
                <label for="block-login">Логин</label>
                <input 
                  class="field-login__input"
                  type="text"
                  name="login"
                  value=""
                  id="block-login"
                  placeholder=" "
                  autocomplete="off"
                  autofocus
                  required
                />
              </div>
              <div class="field-password__field">
                <label for="block-password">Пароль</label>
                <input 
                  class="field-password__input"
                  type="password"
                  name="password"
                  value=""
                  id="block-password"
                  placeholder=" "
                  autocomplete="off"
                  required
                />
                <a href="#" class="field-password__forgotten">Забыли пароль?</a>
                <a href="#" class="field-password__control"></a>
              </div>
              <button class="popup-registration__btn" type="submit">Войти</button>
              <a href="#" class="field-password__forgotten">Забыли пароль?</a>
            </form>
          </div>`);
};

export default class Popup extends AbstractSmartComponent {
  constructor() {
    super();
    this.isPopupHidden = true;
    this._onEscKeyDown = this._onEscKeyDown.bind(this);
    this._subscribeOnEvents();
  }

  getTemplate() {
    return createPopupTemplate({
      isPopupHidden: this.isPopupHidden
    });
  }

  recoveryListeners() {
    this._subscribeOnEvents();
  }

  reRender(request) {
    this.isPopupHidden = request.isPopupHidden;
    super.reRender();
    this.recoveryListeners();
  }

  _subscribeOnEvents() {
    const element = this.getElement();

    document.addEventListener(`keydown`, this._onEscKeyDown);

    element.querySelector(`.popup-registration__close`)
        .addEventListener(`click`, () => {
          this.reRender({isPopupHidden: true});
          document.querySelector(`body`).style.overflow = `visible`;
        });

    element.querySelector(`.field-password__control`)
        .addEventListener(`click`, () => {
          if (element.querySelector(`.field-password__input`).getAttribute(`type`) === `password`) {
            element.querySelector(`.field-password__control`).classList.add(`eye-opened`);
            element.querySelector(`.field-password__input`).setAttribute(`type`, `text`);
          } else {
            element.querySelector(`.field-password__control`).classList.remove(`eye-opened`);
            element.querySelector(`.field-password__input`).setAttribute(`type`, `password`);
          }
        });
  }

  _onEscKeyDown(evt) {
    if (evt.key === `Escape` || evt.key === `Esc`) {
      this.reRender({isPopupHidden: true});
      document.querySelector(`body`).style.overflow = `visible`;
      document.removeEventListener(`keydown`, this._onEscKeyDown);
    }
  }
}

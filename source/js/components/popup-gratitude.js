import AbstractSmartComponent from './abstract-smart-component.js';

const createPopupTemplate = (options = {}) => {
  const {isPopupHidden} = options;
  const isElementHidden = isPopupHidden ? `visually-hidden` : ``;

  return (`<div class="popup-gratitude ${isElementHidden}">
            <div class="popup-gratitude__content">
              <a href="#" class="popup-gratitude__close"></a>
              <p class="popup-gratitude__title">Спасибо за обращение в банк.</p>
              <p class="popup-gratitude__text">Наш менеджер скоро свяжется с Вами</br>по указанному номеру телефона.</p>
            </div>
          </div>`);
};

export default class Popup extends AbstractSmartComponent {
  constructor() {
    super();
    this.isPopupHidden = true;
    this._showRequest = null;
    this._onEscKeyDown = this._onEscKeyDown.bind(this);
    this._subscribeOnEvents();
  }

  getTemplate() {
    return createPopupTemplate({
      isPopupHidden: this.isPopupHidden
    });
  }

  setShowRequestHandler(handler) {
    this._showRequest = handler;
  }

  recoveryListeners() {
    this._subscribeOnEvents();
  }

  reRender(request) {
    this.isPopupHidden = request.isPopupHidden;
    this._showRequest();
    super.reRender();
    this.recoveryListeners();
  }

  _subscribeOnEvents() {
    const element = this.getElement();

    document.addEventListener(`keydown`, this._onEscKeyDown);

    element.querySelector(`.popup-gratitude__close`)
        .addEventListener(`click`, () => {
          this.reRender({isPopupHidden: true});
        });
  }

  _onEscKeyDown(evt) {
    if (evt.key === `Escape` || evt.key === `Esc`) {
      this.reRender({isPopupHidden: true});
      document.removeEventListener(`keydown`, this._onEscKeyDown);
    }
  }
}

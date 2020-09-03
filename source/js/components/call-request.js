import AbstractSmartComponent from './abstract-smart-component.js';

const createHeaderTemplate = () => {
  return (
    `<div class="page-request-popup visually-hidden">
      <div class="page-request-popup__inner">
        <a href="#" class="popup__close"></a>
        <h3>Заказать звонок</h3>
        <p>Оставьте ваши контактные данные, мы свяжемся с вами
        в течение рабочего дня и обязательно поможем найти ответ
        на ваш вопрос!</p>

        <form>
          <div class="input-container">
            <input 
              type="text"
              name="name"
              value=""
              id="block-name"
              placeholder="ИМЯ"
              autocomplete="off"
              required
            />
          </div>
          <div class="input-container">
            <input
              type="tel"
              name="phone"
              value=""
              id="block-phone"
              placeholder="ТЕЛЕФОН"
              autocomplete="off"
              required
            />
          </div>
          <button type="submit" disabled>Перезвоните мне</button>

          <div class="field-agreement">
            <input type="checkbox" name="agreement" id="agreement-inform">
            <label for="agreement-inform" tabindex="0">Нажимая на кнопку, вы даёте согласие на обработку персональных данных</label>
          </div>
        </form>
        
      </div>
    </div>`
  );
};

export default class Header extends AbstractSmartComponent {
  constructor() {
    super();
    this._showSuccessPopup = null;
    this._onEscKeyDown = this._onEscKeyDown.bind(this);
    this._subscribeOnEvents();
  }

  getTemplate() {
    return createHeaderTemplate();
  }

  setSuccessPopupHandler(handler) {
    this._showSuccessPopup = handler;
  }

  showElement() {
    const element = this.getElement();
    element.classList.toggle(`visually-hidden`, false);
    document.addEventListener(`keydown`, this._onEscKeyDown);
  }

  hideElement() {
    const element = this.getElement();
    const form = element.querySelector(`form`);
    const btn = element.querySelector(`button`);

    element.classList.toggle(`visually-hidden`, true);
    document.querySelector(`body`).style.overflow = `visible`;
    document.removeEventListener(`keydown`, this._onEscKeyDown);
    form.reset();
    btn.setAttribute(`disabled`, `disabled`);
  }

  _subscribeOnEvents() {
    const element = this.getElement();
    const form = element.querySelector(`form`);
    const agreement = element.querySelector(`.field-agreement`);
    const btn = element.querySelector(`button`);
    const phoneSample = /^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/;
    const nameSample = /^[a-zA-Zа-яёА-ЯЁ]+$/u;

    document.addEventListener(`keydown`, this._onEscKeyDown);

    element.addEventListener(`click`, (evt) => {
      if (evt.target === element || evt.target.className === `popup__close`) {
        this.hideElement();
      } else if (evt.target.className === `page-request-popup__inner`) {
        evt.stopPropagation();
      }
    });

    form.addEventListener(`submit`, (evt) => {
      evt.preventDefault();
      this.hideElement();
      this._showSuccessPopup();
    });

    form.addEventListener(`input`, (evt) => {
      if (evt.target.id === `block-phone`) {
        if (!phoneSample.test(evt.target.value)) {
          evt.target.setCustomValidity(`Напиши номер правильно`);

        } else {
          evt.target.setCustomValidity(``);
        }

      } else if (evt.target.id === `block-name`) {
        if (!nameSample.test(evt.target.value)) {
          evt.target.setCustomValidity(`Напиши ФИО правильно`);

        } else {
          evt.target.setCustomValidity(``);
        }
      }
    });

    agreement.addEventListener(`change`, (evt) => {
      if (evt.target.checked) {
        btn.removeAttribute(`disabled`);
        return;
      }
      btn.setAttribute(`disabled`, `disabled`);
    });
  }

  _onEscKeyDown(evt) {
    if (evt.key === `Escape` || evt.key === `Esc`) {
      this.hideElement();
    }
  }
}

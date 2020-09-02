import AbstractSmartComponent from './abstract-smart-component.js';

const createHeaderTemplate = (isElementHidden) => {
  const doesElementHide = isElementHidden ? `visually-hidden` : ``;
  return (
    `<div class="page-request-popup ${doesElementHide}">
      <div class="page-request-popup__inner">
        <h3>Заказать звонок</h2>
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
          <button disabled>Перезвоните мне</button>

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
    this._callRequest = null;
    this._isElementHidden = true;
    this._subscribeOnEvents();
  }

  getTemplate() {
    return createHeaderTemplate(this._isElementHidden);
  }

  recoveryListeners() {
    this._subscribeOnEvents();
  }

  reRender(properties) {
    const element = this.getElement();
    this._isElementHidden = properties.isPopupHidden;
    element.classList.toggle(`visually-hidden`, false);
  }

  _subscribeOnEvents() {
    // const element = this.getElement();
  }
}

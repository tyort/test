import AbstractSmartComponent from './abstract-smart-component.js';

const createDesireTemplate = () =>
  (
    `<div class="page-desire">
      <div class="page-desire__inner">
        <h2>Хочу поехать!</h2>
        <p>
          Оставьте свой телефон и мы свяжемся с вами,
          подберём куратора и ответим на все вопросы!
        </p>
        <form>
          <input
            type="tel"
            name="phone"
            value=""
            id="block-phone"
            placeholder="Телефон"
            autocomplete="off"
            required
          />
          <p class="error__message">Ошибка: неверный формат</p>
          <button class="recall__btn" type="submit">Перезвоните мне</button>
        </form>
      </div>
    </div>`
  );

export default class Desire extends AbstractSmartComponent {
  constructor() {
    super();
    this._subscribeOnEvents();
  }

  getTemplate() {
    return createDesireTemplate();
  }

  recoveryListeners() {
    this._subscribeOnEvents();
  }

  reRender() {
    super.reRender();
  }

  _subscribeOnEvents() {
    const element = this.getElement();
    const form = element.querySelector(`form`);
    const phoneSample = /^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/;

    form.addEventListener(`submit`, (evt) => {
      evt.preventDefault();
      form.reset();
    });

    form.addEventListener(`input`, (evt) => {
      if (!phoneSample.test(evt.target.value)) {
        evt.target.setCustomValidity(`Напиши номер правильно`);

      } else {
        evt.target.setCustomValidity(``);
      }
    });
  }

}

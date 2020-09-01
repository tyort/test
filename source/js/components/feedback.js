import AbstractSmartComponent from './abstract-smart-component.js';

const createFeedbackTemplate = () =>
  (
    `<div class="page-feedback">
      <div class="page-feedback-safety">
        <p class="page-feedback-safety__top">
          Оставьте ваши контакты, если у вас остались
          вопросы — мы на них ответим!
        </p>
        <p class="page-feedback-safety__addition">
          Мы не передаём данные третьим лицам. Ваши данные
          будут в безопасности и вам не придёт спам от нас!
        </p>
      </div>
      
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
          <p class="error__message">Ошибка: неверный формат</p>
        </div>
        <div class="input-container">
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
        </div>
        <button class="recall__btn" type="submit">Перезвоните мне</button>
      </form>
    </div>`
  );

export default class Feedback extends AbstractSmartComponent {
  constructor() {
    super();
    this._subscribeOnEvents();
  }

  getTemplate() {
    return createFeedbackTemplate();
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
    const nameSample = /^[a-zA-Zа-яёА-ЯЁ]+$/u;

    form.addEventListener(`submit`, (evt) => {
      evt.preventDefault();
      form.reset();
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
  }

}

/* eslint-disable no-alert */
import {createElement} from "../formulas.js";

const START_COST_OF_PROPERTY = 2000000;
const MIN_FIRST_PAYMENT_PERCENTAGE = 10;
const MIN_SIZE_MORTGAGE = 500000;

const createCalculationTemplate = (options = {}) => {
  const {costOfProperty, firstPayment, firstPaymentPercantage} = options;

  return (
    `<div class="page-calculation">
      <div class="container clearfix">
        <h2>Кредитный калькулятор</h2>

        <div class="page-calculation__first-step">
          <h3>Шаг 1. Цель кредита</h3>
          <select id="type-of-credit" name="credit-type">
            <option value="novalue" selected>Выберете цель кредита</option>
            <option value="mortgage">Ипотечное кредитование</option>
            <option value="automobile">Автомобильное кредитование</option>
            <option value="consumer">Потребительский кредит</option>
          </select>
        </div>

        <div class="page-calculation__our-offer">
          <h3>Наше предложение</h3>
          <div class="calculation__result">
            <div><p>1 300 000 рублей</br>Сумма ипотеки</p></div>
            <div><p>9,40%</br>Процентная ставка</p></div>
            <div><p>27 000 рублей</br>Ежемесячный платеж</p></div>
            <div><p>60 000 рублей</br>Необходимый доход</p></div>
          </div>
        </div>

        <form class="page-calculation__parameters">
          <h3>Шаг 2. Введите параметры кредита</h3>

          <fieldset>
            <label for="cost-of-property">Стоимость недвижимости</label>
            <div class="cost-of-property__scale">
              <span class="operator minus">-</span>
              <input
                autocomplete="off"
                class="cost-of-property__input"
                id="cost-of-property"
                type="text"
                value="${costOfProperty} рублей"
                required
              />
              <span class="operator plus">+</span>
            </div>
            <p>От 1 200 000 до 25 000 000 рублей</p>
          </fieldset>

          <fieldset>
            <label for="first-payment">Первоначальный взнос</label>
            <input
              class="first-payment__input"
              id="first-payment"
              type="number"
              value="${firstPayment}"
              max="${costOfProperty}"
              required
            />
            <div class="percent-slider">
              <output for="first-payment__percent" style="left: ${firstPaymentPercantage * 6.5 - 65}px">${firstPaymentPercantage}%</output>
              <input type="range" id="first-payment__percent" min="10" max="100" step="5" value="${firstPaymentPercantage}">
            </div>
          </fieldset>
        </form>
      </div>
    </div>`
  );
};

export default class Calculation {
  constructor() {
    this._element = null;
    this._costOfProperty = START_COST_OF_PROPERTY;
    this._firstPaymentPercantage = MIN_FIRST_PAYMENT_PERCENTAGE;
    this._mortgageSize = MIN_SIZE_MORTGAGE;
    this._firstPayment = this._costOfProperty * this._firstPaymentPercantage / 100;
    this._subscribeOnEvents();
  }

  getTemplate() {
    return createCalculationTemplate({
      costOfProperty: this._costOfProperty,
      firstPayment: this._firstPayment,
      firstPaymentPercantage: this._firstPaymentPercantage
    });
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }
    return this._element;
  }

  removeElement() {
    this._element = null;
  }

  recoveryListeners() {
    this._subscribeOnEvents();
  }

  reRender() {
    const oldElement = this.getElement();
    const parent = oldElement.parentElement;
    this.removeElement();
    const newElement = this.getElement();
    parent.replaceChild(newElement, oldElement);
    this.recoveryListeners();
  }

  reset() {
    this._firstPaymentPercantage = MIN_FIRST_PAYMENT_PERCENTAGE;
    this._firstPayment = this._costOfProperty * this._firstPaymentPercantage / 100;
    this.reRender();
  }

  _subscribeOnEvents() {
    const element = this.getElement();

    element.querySelector(`form`)
        .addEventListener(`submit`, (evt) => {
          evt.preventDefault();
        });

    element.querySelector(`#first-payment__percent`)
        .addEventListener(`change`, (evt) => {
          this._firstPaymentPercantage = evt.target.value;
          this._firstPayment = this._costOfProperty * this._firstPaymentPercantage / 100;
          this.reRender();
        });

    element.querySelector(`#first-payment`)
        .addEventListener(`change`, (evt) => {
          if (evt.target.value >= this._costOfProperty * MIN_FIRST_PAYMENT_PERCENTAGE / 100 && evt.target.value <= this._costOfProperty) {
            this._firstPayment = evt.target.value;
            this._firstPaymentPercantage = new window.Decimal(100).mul(this._firstPayment).div(this._costOfProperty);
            this.reRender();
          } else if (evt.target.value < this._costOfProperty * MIN_FIRST_PAYMENT_PERCENTAGE / 100) {
            this._firstPayment = this._costOfProperty * MIN_FIRST_PAYMENT_PERCENTAGE / 100;
            this._firstPaymentPercantage = new window.Decimal(100).mul(this._firstPayment).div(this._costOfProperty);
            this.reRender();
          }
        });

    const costOfProperty = element.querySelector(`#cost-of-property`);
    costOfProperty.addEventListener(`change`, (evt) => {
      if (isNaN(Number(evt.target.value))) {
        alert(`Введите числовое значение`);
      } else {
        if (Number(evt.target.value) <= 25000000 && Number(evt.target.value) >= 1200000) {
          this._costOfProperty = Number(evt.target.value);
          this.reset();
        } else {
          alert(`Не подходящее число`);
        }
      }
    });
    costOfProperty.addEventListener(`blur`, (evt) => {
      if (isNaN(Number(evt.target.value)) || Number(evt.target.value) > 25000000 || Number(evt.target.value) < 1200000) {
        costOfProperty.focus();
      } else if (Number(evt.target.value) === this._costOfProperty) {
        this.reset();
        costOfProperty.blur();
      } else {
        costOfProperty.blur();
      }
    });
    costOfProperty.addEventListener(`focus`, (evt) => {
      evt.target.value = this._costOfProperty;
      return;
    });

    element.querySelector(`.cost-of-property__scale`)
        .addEventListener(`click`, (evt) => {
          evt.preventDefault();
          if (evt.target.className !== `operator minus` && evt.target.className !== `operator plus`) {
            return;

          } else if (evt.target.className === `operator minus`) {
            this._costOfProperty -= 100000;
            if (this._costOfProperty <= 25000000 && this._costOfProperty >= 1200000) {
              this.reset();
            } else {
              alert(`Неправильная стоимость недвижимости`);
            }

          } else if (evt.target.className === `operator plus`) {
            this._costOfProperty += 100000;
            if (this._costOfProperty <= 25000000 && this._costOfProperty >= 1200000) {
              this.reset();
            } else {
              alert(`Неправильная стоимость недвижимости`);
            }
          }
        });
  }
}

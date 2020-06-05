/* eslint-disable no-alert */
import AbstractSmartComponent from './abstract-smart-component.js';

const START_COST_OF_PROPERTY = 2000000;
const MIN_FIRST_PAYMENT_PERCENTAGE = 10;
const MIN_COST_MORTGAGE = 500000;
const ENTER_KEY_CODE = 13;
const MAX_COST_OF_PROPERTY = 25000000;
const MIN_COST_OF_PROPERTY = 1200000;
const MAX_CREDIT_PERIOD = 30;
const MIN_CREDIT_PERIOD = 5;
const OPERATORS_STEP_COST = 100000;
const CAPITAL_OF_MOTHER = 470000;

const createCalculationTemplate = (options = {}) => {
  const {costOfProperty, firstPayment, firstPaymentPercantage, periodOfCredit} = options;

  return (
    `<div class="page-calculation">
      <h2>Кредитный калькулятор</h2>
      <form class="page-calculation__parameters">

        <h3>Шаг 1. Цель кредита</h3>
        <fieldset>
          <select id="type-of-credit" name="credit-type">
            <option value="novalue" selected>Выберете цель кредита</option>
            <option value="mortgage">Ипотечное кредитование</option>
            <option value="automobile">Автомобильное кредитование</option>
            <option value="consumer">Потребительский кредит</option>
          </select>
        </fieldset>
      
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
            autocomplete="off"
            class="first-payment__input"
            id="first-payment"
            type="text"
            value="${firstPayment} рублей"
            required
          />
          <div class="percent-slider">
            <output for="first-payment__percent" style="left: ${firstPaymentPercantage * 6.5 - 65}px">${firstPaymentPercantage}%</output>
            <input type="range" id="first-payment__percent" min="10" max="100" step="5" value="${firstPaymentPercantage}">
          </div>
        </fieldset>

        <fieldset>
          <label for="credit-period">Срок кредитования</label>
          <input
            autocomplete="off"
            class="credit-period__input"
            id="credit-period"
            type="text"
            value="${periodOfCredit} лет"
            required
          />
          <div class="years-slider">
            <output for="credit-period__years" style="left: ${periodOfCredit * 23 - 110}px">${periodOfCredit}лет</output>
            <input type="range" id="credit-period__years" min="5" max="30" step="1" value="${periodOfCredit}">
          </div>
        </fieldset>

        <fieldset class="mothers-capital__fieldset">
          <input type="checkbox" name="mothers-capital" id="mothers-capital__input">
          <label for="mothers-capital__input">Использовать материнский капитал</label>
        </fieldset>

      </form>
    </div>`
  );
};

export default class Calculation extends AbstractSmartComponent {
  constructor() {
    super();
    this._costOfProperty = START_COST_OF_PROPERTY;
    this._firstPaymentPercantage = MIN_FIRST_PAYMENT_PERCENTAGE;
    this._mortgageSize = MIN_COST_MORTGAGE;
    this._firstPayment = new window.Decimal(this._costOfProperty).mul(this._firstPaymentPercantage).div(100);
    this._periodOfCredit = MIN_CREDIT_PERIOD;
    this._costOfMothersCapital = 0;
    this._calculateResultHandler = null;
    this._subscribeOnEvents();
  }

  getChangedDataByView() {
    const form = this.getElement().querySelector(`form`);
    return new FormData(form);
  }

  getTemplate() {
    return createCalculationTemplate({
      costOfProperty: this._costOfProperty,
      firstPayment: this._firstPayment,
      firstPaymentPercantage: this._firstPaymentPercantage,
      periodOfCredit: this._periodOfCredit
    });
  }

  reRender() {
    super.reRender();
    this.setCalculateResultHandler(this._calculateResultHandler);
    this.recoveryListeners();
  }

  recoveryListeners() {
    this._subscribeOnEvents();
  }

  reset() {
    this._firstPaymentPercantage = MIN_FIRST_PAYMENT_PERCENTAGE;
    this._firstPayment = new window.Decimal(this._costOfProperty).mul(this._firstPaymentPercantage).div(100);
    this.reRender();
  }

  setCalculateResultHandler(handler) {
    const element = this.getElement();
    const form = element.querySelector(`form`);
    const operatorMinus = element.querySelector(`.minus`);
    const operatorPlus = element.querySelector(`.plus`);

    form.addEventListener(`change`, handler);
    operatorMinus.addEventListener(`click`, handler);
    operatorPlus.addEventListener(`click`, handler);

    this._calculateResultHandler = handler;
  }


  _subscribeOnEvents() {
    const element = this.getElement();

    element.querySelector(`form`)
        .addEventListener(`submit`, (evt) => {
          evt.preventDefault();
        });

    const costOfProperty = element.querySelector(`#cost-of-property`);

    costOfProperty.addEventListener(`change`, (evt) => {
      if (isNaN(Number(evt.target.value))) {
        alert(`Введите числовое значение`);
        this.reset();

      } else {
        if (Number(evt.target.value) <= MAX_COST_OF_PROPERTY && Number(evt.target.value) >= MIN_COST_OF_PROPERTY) {
          this._costOfProperty = Number(evt.target.value);
          this.reset();

        } else {
          alert(`Не подходящее число`);
          this.reset();
        }
      }
    });

    costOfProperty.addEventListener(`focus`, (evt) => {
      evt.target.value = this._costOfProperty;

      costOfProperty.addEventListener(`keydown`, (e) => {
        if (Number(e.target.value) === Number(this._costOfProperty) && e.keyCode === ENTER_KEY_CODE) {
          e.target.value = `${this._costOfProperty} рублей`;
          costOfProperty.blur();
        }
      });
    });

    costOfProperty.addEventListener(`blur`, (evt) => {
      if (Number(evt.target.value) === Number(this._costOfProperty)) {
        evt.target.value = `${this._costOfProperty} рублей`;
      }
    });

    element.querySelector(`.cost-of-property__scale`)
        .addEventListener(`click`, (evt) => {
          evt.preventDefault();
          if (evt.target.className !== `operator minus` && evt.target.className !== `operator plus`) {
            return;
          }

          if (evt.target.className === `operator minus`) {
            this._costOfProperty -= OPERATORS_STEP_COST;
            this._costOfProperty = this._costOfProperty >= MIN_COST_OF_PROPERTY
              ? this._costOfProperty
              : MIN_COST_OF_PROPERTY;
            this.reset();

          } else {
            this._costOfProperty += OPERATORS_STEP_COST;
            this._costOfProperty = this._costOfProperty <= MAX_COST_OF_PROPERTY
              ? this._costOfProperty
              : MAX_COST_OF_PROPERTY;
            this.reset();
          }
        });

    const firstPayment = element.querySelector(`#first-payment`);
    const onChangeCostHandler = (evt) => {
      if (isNaN(Number(evt.target.value))) {
        alert(`Введите числовое значение`);
        evt.target.value = this._firstPayment;
        this.reRender();

      } else {
        const allowableFirstPayment = new window.Decimal(this._costOfProperty).mul(MIN_FIRST_PAYMENT_PERCENTAGE).div(100);
        if (Number(evt.target.value) <= this._costOfProperty && Number(evt.target.value) >= allowableFirstPayment) {

          this._firstPayment = Number(evt.target.value);
          this._firstPaymentPercantage = new window.Decimal(this._firstPayment).mul(100).div(this._costOfProperty);
          this.reRender();

        } else if (Number(evt.target.value) > this._costOfProperty) {
          this._firstPayment = this._costOfProperty;
          this._firstPaymentPercantage = new window.Decimal(this._firstPayment).mul(100).div(this._costOfProperty);
          this.reRender();

        } else {
          this._firstPayment = allowableFirstPayment;
          this._firstPaymentPercantage = new window.Decimal(this._firstPayment).mul(100).div(this._costOfProperty);
          this.reRender();
        }
      }
    };

    firstPayment.addEventListener(`focus`, (evt) => {
      evt.target.value = this._firstPayment;

      firstPayment.addEventListener(`change`, onChangeCostHandler);
      firstPayment.addEventListener(`keydown`, (e) => {
        if (Number(e.target.value) === Number(this._firstPayment) && e.keyCode === ENTER_KEY_CODE) {
          e.target.value = `${this._firstPayment} рублей`;
          firstPayment.blur();
        }
      });
    });

    firstPayment.addEventListener(`blur`, (evt) => {
      if (Number(evt.target.value) === Number(this._firstPayment)) {
        firstPayment.removeEventListener(`change`, onChangeCostHandler);
        evt.target.value = `${this._firstPayment} рублей`;
      }
    });

    element.querySelector(`#first-payment__percent`)
        .addEventListener(`change`, (evt) => {
          this._firstPaymentPercantage = evt.target.value;
          this._firstPayment = new window.Decimal(this._costOfProperty).mul(this._firstPaymentPercantage).div(100);
          this.reRender();
        });

    const periodOfCredit = element.querySelector(`#credit-period`);
    const onChangePeriodHandler = (evt) => {
      if (isNaN(Number(evt.target.value))) {
        alert(`Введите числовое значение`);
        evt.target.value = this._periodOfCredit;
        this.reRender();

      } else {
        if (Number(evt.target.value) <= MAX_CREDIT_PERIOD && Number(evt.target.value) >= MIN_CREDIT_PERIOD) {
          this._periodOfCredit = Number(evt.target.value);
          this.reRender();

        } else if (Number(evt.target.value) > MAX_CREDIT_PERIOD) {
          this._periodOfCredit = MAX_CREDIT_PERIOD;
          this.reRender();

        } else {
          this._periodOfCredit = MIN_CREDIT_PERIOD;
          this.reRender();
        }
      }
    };

    periodOfCredit.addEventListener(`focus`, (evt) => {
      evt.target.value = this._periodOfCredit;

      periodOfCredit.addEventListener(`change`, onChangePeriodHandler);
      periodOfCredit.addEventListener(`keydown`, (e) => {
        if (Number(e.target.value) === Number(this._periodOfCredit) && e.keyCode === ENTER_KEY_CODE) {
          e.target.value = `${this._periodOfCredit} лет`;
          periodOfCredit.blur();
        }
      });
    });

    periodOfCredit.addEventListener(`blur`, (evt) => {
      if (Number(evt.target.value) === Number(this._periodOfCredit)) {
        periodOfCredit.removeEventListener(`change`, onChangePeriodHandler);
        evt.target.value = `${this._periodOfCredit} лет`;
      }
    });

    element.querySelector(`#credit-period__years`)
        .addEventListener(`change`, (evt) => {
          this._periodOfCredit = evt.target.value;
          this.reRender();
        });

    element.querySelector(`#mothers-capital__input`)
        .addEventListener(`change`, (evt) => {
          this._costOfMothersCapital = evt.target.checked ? CAPITAL_OF_MOTHER : 0;
        });
  }
}

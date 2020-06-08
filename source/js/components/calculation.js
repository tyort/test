/* eslint-disable no-alert */
import AbstractSmartComponent from './abstract-smart-component.js';
import {
  START_COST_OF_PROPERTY,
  MIN_FIRST_PAYMENT_PERCENTAGE,
  MIN_COST_MORTGAGE,
  ENTER_KEY_CODE,
  MAX_CREDIT_PERIOD,
  MIN_CREDIT_PERIOD,
  OPERATORS_STEP_COST,
  creditTypes
} from '../formulas.js';

const getActualFeaturesNames = (creditType) => {
  let creditTypeTitle = ``;
  let maxPuschaseCost = null;
  let minPuschaseCost = null;

  switch (creditType) {
    case `automobile`:
      creditTypeTitle = `Стоимость автомобиля`;
      maxPuschaseCost = 5000000;
      minPuschaseCost = 500000;
      break;
    case `consumer`:
      creditTypeTitle = `Сумма потребительского кредита`;
      maxPuschaseCost = 3000000;
      minPuschaseCost = 50000;
      break;
    default:
      creditTypeTitle = `Стоимость недвижимости`;
      maxPuschaseCost = 25000000;
      minPuschaseCost = 1200000;
      break;
  }

  return {
    creditTypeTitle,
    maxPuschaseCost,
    minPuschaseCost
  };
};

const createOptions = (options, typeOfCredit) => {
  return options
      .map((item) => {
        const isSelected = typeOfCredit === item[0] ? `selected` : ``;
        return (
          `<option value="${item[0]}" ${isSelected}>${item[1]}</option>`
        );
      })
      .join(``);
};

const createCalculationTemplate = (options = {}) => {
  const {costOfProperty, firstPayment, firstPaymentPercantage, periodOfCredit, typeOfCredit, isMotherUsed} = options;
  const addOptions = createOptions(creditTypes, typeOfCredit);
  const isElementHidden = typeOfCredit === creditTypes[0][0] ? `visually-hidden` : ``;

  return (
    `<form class="page-calculation__parameters">
      <h3>Шаг 1. Цель кредита</h3>
      <fieldset>
        <select id="type-of-credit" name="credit-type">
          ${addOptions}
        </select>
      </fieldset>
    
      <h3 class="${isElementHidden}">Шаг 2. Введите параметры кредита</h3>
      <fieldset class="${isElementHidden}">
        <label for="cost-of-property">${getActualFeaturesNames(typeOfCredit).creditTypeTitle}</label>
        <div class="cost-of-property__scale">
          <span class="operator minus">-</span>
          <input
            autocomplete="off"
            class="cost-of-property__input"
            name="cost-of-property"
            id="cost-of-property"
            type="text"
            value="${costOfProperty} рублей"
            required
          />
          <span class="operator plus">+</span>
        </div>
        <p>От ${getActualFeaturesNames(typeOfCredit).minPuschaseCost} до ${getActualFeaturesNames(typeOfCredit).maxPuschaseCost} рублей</p>
      </fieldset>

      <fieldset class="${isElementHidden}">
        <label for="first-payment">Первоначальный взнос</label>
        <input
          autocomplete="off"
          class="first-payment__input"
          name="first-payment"
          id="first-payment"
          type="text"
          value="${firstPayment} рублей"
          required
        />
        <div class="percent-slider">
          <output for="first-payment__percent" style="left: ${firstPaymentPercantage * 6.5 - 65}px">${firstPaymentPercantage}%</output>
          <input 
            type="range"
            id="first-payment__percent"
            name="first-payment-percent"
            min="10" max="100" step="5"
            value="${firstPaymentPercantage}"
          />
        </div>
      </fieldset>

      <fieldset class="${isElementHidden}">
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

      <fieldset class="${isElementHidden}">
        <input type="checkbox" name="mothers-capital" id="mothers-capital__input" ${isMotherUsed ? `checked` : ``}>
        <label for="mothers-capital__input">Использовать материнский капитал</label>
      </fieldset>
    </form>`
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
    this._isMotherUsed = false;
    this._calculateResultHandler = null;
    this._typeOfCredit = creditTypes[0][0];
    this._subscribeOnEvents();
  }

  getChangedDataByView() {
    const form = this.getElement();
    return new FormData(form);
  }

  getTemplate() {
    return createCalculationTemplate({
      costOfProperty: this._costOfProperty,
      firstPayment: this._firstPayment,
      firstPaymentPercantage: this._firstPaymentPercantage,
      periodOfCredit: this._periodOfCredit,
      typeOfCredit: this._typeOfCredit,
      isMotherUsed: this._isMotherUsed
    });
  }

  setCalculateResultHandler(handler) {
    this._calculateResultHandler = handler;
  }

  reRender() {
    super.reRender();
    this.recoveryListeners();
    this._calculateResultHandler();
  }

  recoveryListeners() {
    this._subscribeOnEvents();
  }

  reset() {
    this._firstPaymentPercantage = MIN_FIRST_PAYMENT_PERCENTAGE;
    this._firstPayment = new window.Decimal(this._costOfProperty).mul(this._firstPaymentPercantage).div(100);
    this.reRender();
  }

  _subscribeOnEvents() {
    const form = this.getElement();

    form.addEventListener(`submit`, (evt) => {
      evt.preventDefault();
    });

    form.querySelector(`#type-of-credit`)
        .addEventListener(`change`, (evt) => {
          this._typeOfCredit = evt.target.value;
          this.reset();
        });

    const costOfProperty = form.querySelector(`#cost-of-property`);

    costOfProperty.addEventListener(`change`, (evt) => {
      if (isNaN(Number(evt.target.value))) {
        alert(`Введите числовое значение`);
        this.reset();

      } else {
        if (Number(evt.target.value) <= getActualFeaturesNames(this._typeOfCredit).maxPuschaseCost && Number(evt.target.value) >= getActualFeaturesNames(this._typeOfCredit).minPuschaseCost) {
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

    form.querySelector(`.cost-of-property__scale`)
        .addEventListener(`click`, (evt) => {
          evt.preventDefault();
          if (evt.target.className !== `operator minus` && evt.target.className !== `operator plus`) {
            return;
          }

          if (evt.target.className === `operator minus`) {
            this._costOfProperty -= OPERATORS_STEP_COST;
            this._costOfProperty = this._costOfProperty >= getActualFeaturesNames(this._typeOfCredit).minPuschaseCost
              ? this._costOfProperty
              : getActualFeaturesNames(this._typeOfCredit).minPuschaseCost;
            this.reset();

          } else {
            this._costOfProperty += OPERATORS_STEP_COST;
            this._costOfProperty = this._costOfProperty <= getActualFeaturesNames(this._typeOfCredit).maxPuschaseCost
              ? this._costOfProperty
              : getActualFeaturesNames(this._typeOfCredit).maxPuschaseCost;
            this.reset();
          }
        });

    const firstPayment = form.querySelector(`#first-payment`);
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

    form.querySelector(`#first-payment__percent`)
        .addEventListener(`change`, (evt) => {
          this._firstPaymentPercantage = evt.target.value;
          this._firstPayment = new window.Decimal(this._costOfProperty).mul(this._firstPaymentPercantage).div(100);
          this.reRender();
        });

    const periodOfCredit = form.querySelector(`#credit-period`);
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

    form.querySelector(`#credit-period__years`)
        .addEventListener(`change`, (evt) => {
          this._periodOfCredit = evt.target.value;
          this.reRender();
        });

    form.querySelector(`#mothers-capital__input`)
        .addEventListener(`change`, (evt) => {
          this._isMotherUsed = evt.target.checked;
          this.reRender();
        });
  }
}

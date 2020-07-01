/* eslint-disable no-alert */
import AbstractSmartComponent from './abstract-smart-component.js';
import {START_COST_OF_PROPERTY, ENTER_KEY_CODE, creditTypes, setActualFeaturesNames, getTransformedNumber} from '../formulas.js';

const createOptions = (options, typeOfCredit) => {
  return options
      .map((item) => {
        const isSelected = typeOfCredit === item[0] ? `selected` : ``;
        return (
          `<option value="${item[0]}" ${isSelected}><span>${item[1]}</span></option>`
        );
      })
      .join(``);
};

const createCalculationTemplate = (options = {}) => {
  const {costOfProperty, firstPayment, firstPaymentPercantage, periodOfCredit, typeOfCredit, isBonusUsed, isKaskoUsed, isInsuranceUsed, isParticipantUsed} = options;
  const addOptions = createOptions(creditTypes, typeOfCredit);
  const isElementHidden = typeOfCredit === creditTypes[0][0] ? `visually-hidden` : ``;

  const costOfPropertyToLine = getTransformedNumber(costOfProperty);
  const firstPaymentToLine = getTransformedNumber(firstPayment);

  return (
    `<form class="page-calculation__parameters">
      
      <div class="page-calculation__main--choice">
        <h2>Кредитный калькулятор</h2>
        <h3>Шаг 1. Цель кредита</h3>
        <select id="type-of-credit" name="credit-type">
          ${addOptions}
        </select>
      </div>
    
      <div class="${isElementHidden} page-calculation__type--cost">
        <h3>Шаг 2. Введите параметры кредита</h3>
        <label for="cost-of-property">${setActualFeaturesNames(typeOfCredit).creditTypeTitle}</label>
        <div class="cost-of-property__scale">
          <span class="operator minus">-</span>
          <input
            autocomplete="off"
            class="cost-of-property__input"
            name="cost-of-property"
            id="cost-of-property"
            type="text"
            value="${costOfPropertyToLine} рублей"
            required
          />
          <span class="operator plus">+</span>
        </div>
        <p>От ${setActualFeaturesNames(typeOfCredit).minPuschaseCost} до ${setActualFeaturesNames(typeOfCredit).maxPuschaseCost} рублей</p>
      </div>

      ${typeOfCredit === `consumer`
      ? ``
      : `<div class="${isElementHidden} page-calculation__initial--fee">
          <label for="first-payment">Первоначальный взнос</label>
          <input
            autocomplete="off"
            class="first-payment__input"
            name="first-payment"
            id="first-payment"
            type="text"
            value="${firstPaymentToLine} рублей"
            required
          />
          <div class="percent-slider">
            <output 
              for="first-payment__percent"
            >${firstPaymentPercantage}%</output>
            <input 
              type="range"
              id="first-payment__percent"
              name="first-payment-percent"
              min="${setActualFeaturesNames(typeOfCredit).minFirstPaymentPercentage}"
              max="100" 
              step="5"
              value="${firstPaymentPercantage}"
            />
          </div>
        </div>`
    }

      <div class="${isElementHidden} page-calculation__credit--term">
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
          <output for="credit-period__years">${periodOfCredit}лет</output>
          <input 
            type="range"
            id="credit-period__years"
            min="${setActualFeaturesNames(typeOfCredit).minCreditPeriod}"
            max="${setActualFeaturesNames(typeOfCredit).maxCreditPeriod}"
            step="1"
            value="${periodOfCredit}">
        </div>
      </div>

      <div class="${isElementHidden} page-calculation__checkboxes">
${typeOfCredit === `mortgage`
      ? `<div><input type="checkbox" name="bonus" id="bonus__input" ${isBonusUsed ? `checked` : ``}>
        <label for="bonus__input">Использовать материнский капитал</label></div>`
      : ``}
${typeOfCredit === `automobile`
      ? `<div><input type="checkbox" name="kasko" id="kasko__input" ${isKaskoUsed ? `checked` : ``}>
        <label for="kasko__input">Оформить КАСКО в нашем банке</label></div>
        <div><input type="checkbox" name="insurance" id="insurance__input" ${isInsuranceUsed ? `checked` : ``}>
        <label for="insurance__input">Оформить Страхование жизни в нашем банке</label></div>`
      : ``}
${typeOfCredit === `consumer`
      ? `<div><input type="checkbox" name="participant" id="participant__input" ${isParticipantUsed ? `checked` : ``}>
      <label for="participant__input">Участник зарплатного проекта нашего банка</label></div>`
      : ``}
      </div>
    </form>`
  );
};

export default class Calculation extends AbstractSmartComponent {
  constructor() {
    super();
    this._typeOfCredit = creditTypes[0][0];
    this._costOfProperty = START_COST_OF_PROPERTY;
    this._firstPaymentPercantage = setActualFeaturesNames(this._typeOfCredit).minFirstPaymentPercentage;
    this._mortgageSize = setActualFeaturesNames(this._typeOfCredit).minMortgageCost;
    this._firstPayment = new window.Decimal(this._costOfProperty).mul(this._firstPaymentPercantage).div(100);
    this._periodOfCredit = setActualFeaturesNames(this._typeOfCredit).minCreditPeriod;
    this._isBonusUsed = false;
    this._isKaskoUsed = false;
    this._isInsuranceUsed = false;
    this._isParticipantUsed = false;
    this._calculateResultHandler = null;
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
      isBonusUsed: this._isBonusUsed,
      isKaskoUsed: this._isKaskoUsed,
      isInsuranceUsed: this._isInsuranceUsed,
      isParticipantUsed: this._isParticipantUsed
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
    this._firstPaymentPercantage = setActualFeaturesNames(this._typeOfCredit).minFirstPaymentPercentage;
    this._firstPayment = new window.Decimal(this._costOfProperty).mul(this._firstPaymentPercantage).div(100);
    this._isBonusUsed = false;
    this._isKaskoUsed = false;
    this._isInsuranceUsed = false;
    this._isParticipantUsed = false;
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
          this._costOfProperty = START_COST_OF_PROPERTY;
          this._periodOfCredit = setActualFeaturesNames(this._typeOfCredit).minCreditPeriod;
          this.reset();
        });

    const costOfProperty = form.querySelector(`#cost-of-property`);

    costOfProperty.addEventListener(`change`, (evt) => {
      const parent = evt.target.parentElement;
      const ourOffer = document.querySelector(`.page-calculation__our-offer`);

      if (isNaN(Number(evt.target.value))) {
        parent.className = `cost-of-property__scale error`;
        ourOffer.className = `page-calculation__our-offer visually-hidden`;
        evt.target.value = `Некорректное значение`;
        costOfProperty.blur();
        return;
      }

      if (Number(evt.target.value) <= setActualFeaturesNames(this._typeOfCredit).maxPuschaseCost && Number(evt.target.value) >= setActualFeaturesNames(this._typeOfCredit).minPuschaseCost) {
        parent.className = `cost-of-property__scale`;
        ourOffer.className = `page-calculation__our-offer`;
        this._costOfProperty = Number(evt.target.value);
        this.reset();

      } else {
        parent.className = `cost-of-property__scale error`;
        ourOffer.className = `page-calculation__our-offer visually-hidden`;
        evt.target.value = `Некорректное значение`;
        costOfProperty.blur();
      }
    });

    costOfProperty.addEventListener(`focus`, (evt) => {
      const ourOffer = document.querySelector(`.page-calculation__our-offer`);
      const parent = evt.target.parentElement;
      evt.target.value = this._costOfProperty;
      parent.className = `cost-of-property__scale`;
      ourOffer.className = `page-calculation__our-offer`;

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
            this._costOfProperty -= setActualFeaturesNames(this._typeOfCredit).opertorsStepCost;
            this._costOfProperty = this._costOfProperty >= setActualFeaturesNames(this._typeOfCredit).minPuschaseCost
              ? this._costOfProperty
              : setActualFeaturesNames(this._typeOfCredit).minPuschaseCost;
            this.reset();

          } else {
            this._costOfProperty += setActualFeaturesNames(this._typeOfCredit).opertorsStepCost;
            this._costOfProperty = this._costOfProperty <= setActualFeaturesNames(this._typeOfCredit).maxPuschaseCost
              ? this._costOfProperty
              : setActualFeaturesNames(this._typeOfCredit).maxPuschaseCost;
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
        const allowableFirstPayment = new window.Decimal(this._costOfProperty).mul(setActualFeaturesNames(this._typeOfCredit).minFirstPaymentPercentage).div(100);
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

    if (firstPayment !== null) {
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
    }

    const periodOfCredit = form.querySelector(`#credit-period`);
    const onChangePeriodHandler = (evt) => {
      if (isNaN(Number(evt.target.value))) {
        alert(`Введите числовое значение`);
        evt.target.value = this._periodOfCredit;
        this.reRender();

      } else {
        if (Number(evt.target.value) <= setActualFeaturesNames(this._typeOfCredit).maxCreditPeriod && Number(evt.target.value) >= setActualFeaturesNames(this._typeOfCredit).minCreditPeriod) {
          this._periodOfCredit = Number(evt.target.value);
          this.reRender();

        } else if (Number(evt.target.value) > setActualFeaturesNames(this._typeOfCredit).maxCreditPeriod) {
          this._periodOfCredit = setActualFeaturesNames(this._typeOfCredit).maxCreditPeriod;
          this.reRender();

        } else {
          this._periodOfCredit = setActualFeaturesNames(this._typeOfCredit).minCreditPeriod;
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

    if (form.querySelector(`#bonus__input`)) {
      form.querySelector(`#bonus__input`)
          .addEventListener(`change`, (evt) => {
            this._isBonusUsed = evt.target.checked;
            this.reRender();
          });
    }

    if (form.querySelector(`#kasko__input`)) {
      form.querySelector(`#kasko__input`)
          .addEventListener(`change`, (evt) => {
            this._isKaskoUsed = evt.target.checked;
            this.reRender();
          });
    }

    if (form.querySelector(`#participant__input`)) {
      form.querySelector(`#participant__input`)
          .addEventListener(`change`, (evt) => {
            this._isParticipantUsed = evt.target.checked;
            this.reRender();
          });
    }

    if (form.querySelector(`#insurance__input`)) {
      form.querySelector(`#insurance__input`)
          .addEventListener(`change`, (evt) => {
            this._isInsuranceUsed = evt.target.checked;
            this.reRender();
          });
    }
  }
}


// const getFirstNumber = () => {
//   if (clientStorage.getClients().length !== 0) {
//     const requestNumbers = clientStorage.getClients()
//         .map((it) => Number(it[`Request Number`].slice(2)))
//         .sort((a, b) => a - b);
//     return requestNumbers[requestNumbers.length - 1] + 1;

//   } else {
//     return FIRST_REQUEST_NUMBER;
//   }
// };
import AbstractSmartComponent from './abstract-smart-component.js';
import {CAPITAL_OF_MOTHER, creditTypes} from '../formulas.js';

const createOurOfferTemplate = (options = {}) => {
  const {costOfMortgage, creditType, annualPercentRate, mounthlyPayment, requiredIncome} = options;
  const isElementHidden = creditType === creditTypes[0][0] ? `visually-hidden` : ``;

  return (
    `<div class="page-calculation__our-offer ${isElementHidden}">
      ${costOfMortgage >= 500000
      ? `<h3>Наше предложение</h3>
          <div class="calculation__result">
            <div><p><span>${costOfMortgage} рублей</span></br>Сумма ипотеки</p></div>
            <div><p><span>${annualPercentRate === 8.5 ? `8,50%` : `9,40%`}</span></br>Процентная ставка</p></div>
            <div><p><span>${mounthlyPayment} рублей</span></br>Ежемесячный платеж</p></div>
            <div><p><span>${requiredIncome} рублей</span></br>Необходимый доход</p></div>
          </div>
          <button class="calculation__request-btn" type="button">Оформить заявку</button>
        </div>`
      : `<p>
          <span>Наш банк не выдает ипотечные кредиты
          меньше 200 000 рублей.</span></br>
          Попробуйте использовать другие параметры для расчета.
        <p>`
    }`
  );
};

export default class OurOffer extends AbstractSmartComponent {
  constructor() {
    super();

    this._creditType = creditTypes[0][0];
    this._propertyCost = null;
    this._firstPayment = null;
    this._firstPayPercent = null;
    this._yearsCount = null;
    this._isBonusUsed = false;
    this._costOfMortgage = null;
    this._annualPercentRate = null;
    this._mounthlyPayment = null;
    this._requiredIncome = null;
    this._createRequestHandler = null;
  }

  getTemplate() {
    return createOurOfferTemplate({
      costOfMortgage: this._costOfMortgage,
      creditType: this._creditType,
      annualPercentRate: this._annualPercentRate,
      mounthlyPayment: this._mounthlyPayment,
      requiredIncome: this._requiredIncome
    });
  }

  setCreateRequestHandler(handler) {
    this._createRequestHandler = handler;
  }

  reRender(viewInformation) {
    console.log(viewInformation);
    this._creditType = viewInformation.creditType;
    this._propertyCost = viewInformation.propertyCost;
    this._firstPayment = viewInformation.firstPayment;
    this._firstPayPercent = viewInformation.firstPayPercent;
    this._yearsCount = viewInformation.yearsCount;
    this._isBonusUsed = viewInformation.isBonusUsed;

    const mothersCapital = this._isBonusUsed ? CAPITAL_OF_MOTHER : 0;
    this._costOfMortgage = this._propertyCost - this._firstPayment - mothersCapital;

    const currentFirstPayPercent = this._firstPayment * 100 / this._costOfMortgage;
    this._annualPercentRate = currentFirstPayPercent >= 15 ? 8.5 : 9.4;

    const mounthlyPercentRate = this._annualPercentRate === 8.5 ? 0.00708 : 0.00783;
    const countOfperiods = this._yearsCount * 12;
    this._mounthlyPayment = this._costOfMortgage * mounthlyPercentRate / (1 - (1 / Math.pow((1 + mounthlyPercentRate), countOfperiods)));
    this._mounthlyPayment = Math.round(this._mounthlyPayment);

    this._requiredIncome = this._mounthlyPayment / 0.45;
    this._requiredIncome = Math.round(this._requiredIncome);

    super.reRender();
    this.recoveryListeners();
  }

  recoveryListeners() {
    this._subscribeOnEvents();
  }

  _subscribeOnEvents() {
    const element = this.getElement();

    if (element.querySelector(`.calculation__request-btn`) !== null) {
      element.querySelector(`.calculation__request-btn`)
          .addEventListener(`click`, () => {
            this._createRequestHandler();
          });
    }
  }
}

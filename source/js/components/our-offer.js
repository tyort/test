import AbstractSmartComponent from './abstract-smart-component.js';
import {CAPITAL_OF_MOTHER, creditTypes, setActualFeaturesNames} from '../formulas.js';

const createOurOfferTemplate = (options = {}) => {
  const {costOfMortgage, creditType, annualPercentRate, mounthlyPayment, requiredIncome, minCreditRequired} = options;
  const isElementHidden = creditType === creditTypes[0][0] ? `visually-hidden` : ``;

  return (
    `<div class="page-calculation__our-offer ${isElementHidden}">
      ${costOfMortgage >= minCreditRequired
      ? `<div class="calculation__result">
          <h3>Наше предложение</h3>
          <div><p><span>${costOfMortgage} рублей</span></br>${setActualFeaturesNames(creditType).sumCreditName}</p></div>
          <div><p><span>${annualPercentRate}%</span></br>Процентная ставка</p></div>
          <div><p><span>${mounthlyPayment} рублей</span></br>Ежемесячный платеж</p></div>
          <div><p><span>${requiredIncome} рублей</span></br>Необходимый доход</p></div>
          <button class="calculation__request-btn" type="button">Оформить заявку</button>
        </div>
        </div>`
      : `<div class="calculation__result--unwanted">
          <p><span>Наш банк не выдает ${setActualFeaturesNames(creditType).messageInsert}
            меньше ${minCreditRequired} рублей.</span>
          </p></br>
          <p>Попробуйте использовать другие параметры для расчета.</p>
        </div>`
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
    this._isKaskoUsed = false;
    this._isInsuranceUsed = false;
    this._isParticipantUsed = false;
    this._costOfMortgage = null;
    this._annualPercentRate = null;
    this._mounthlyPayment = null;
    this._requiredIncome = null;
    this._createRequestHandler = null;
    this._minCreditRequired = null;
  }

  getTemplate() {
    return createOurOfferTemplate({
      costOfMortgage: this._costOfMortgage,
      creditType: this._creditType,
      annualPercentRate: this._annualPercentRate,
      mounthlyPayment: this._mounthlyPayment,
      requiredIncome: this._requiredIncome,
      isBonusUsed: this._isBonusUsed,
      isKaskoUsed: this._isKaskoUsed,
      isInsuranceUsed: this._isInsuranceUsed,
      isParticipantUsed: this._isParticipantUsed,
      minCreditRequired: this._minCreditRequired
    });
  }

  setCreateRequestHandler(handler) {
    this._createRequestHandler = handler;
  }

  reRender(viewInformation) {
    this._creditType = viewInformation.creditType;
    this._propertyCost = viewInformation.propertyCost;
    this._firstPayment = viewInformation.firstPayment;
    this._firstPayPercent = viewInformation.firstPayPercent;
    this._yearsCount = viewInformation.yearsCount;
    this._isBonusUsed = viewInformation.isBonusUsed;
    this._isKaskoUsed = viewInformation.isKaskoUsed;
    this._isInsuranceUsed = viewInformation.isInsuranceUsed;
    this._isParticipantUsed = viewInformation.isParticipantUsed;

    const mothersCapital = this._isBonusUsed ? CAPITAL_OF_MOTHER : 0;
    this._costOfMortgage = this._propertyCost - this._firstPayment - mothersCapital;

    if (this._creditType === `mortgage`) {
      const currentFirstPayPercent = this._firstPayment * 100 / this._propertyCost;
      this._annualPercentRate = currentFirstPayPercent >= 15 ? 8.5 : 9.4;
      this._minCreditRequired = 500000;

    } else if (this._creditType === `automobile`) {
      this._minCreditRequired = 200000;
      this._annualPercentRate = this._propertyCost >= 2000000 ? 15 : 16;
      if (this._isKaskoUsed || this._isInsuranceUsed) {
        this._annualPercentRate = 8.5;
        if (this._isKaskoUsed && this._isInsuranceUsed) {
          this._annualPercentRate = 3.5;
        }
      }

    } else {
      this._minCreditRequired = 0;
      if (this._propertyCost < 750000) {
        this._annualPercentRate = 15;
      } else if (this._propertyCost >= 750000 && this._propertyCost < 2000000) {
        this._annualPercentRate = 12.5;
      } else {
        this._annualPercentRate = 9.5;
      }

      this._annualPercentRate = this._isParticipantUsed ? this._annualPercentRate - 0.5 : this._annualPercentRate;
    }

    let mounthlyPercentRate = this._annualPercentRate / 100 / 12;
    mounthlyPercentRate = Math.round(mounthlyPercentRate * 100000) / 100000;

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

import AbstractSmartComponent from './abstract-smart-component.js';
import {CAPITAL_OF_MOTHER, creditTypes} from '../formulas.js';

const createOurOfferTemplate = (options = {}) => {
  const {costOfMortgage, creditType} = options;
  const isElementHidden = creditType === creditTypes[0][0] ? `visually-hidden` : ``;

  return (
    `<div class="page-calculation__our-offer ${isElementHidden}">
      ${costOfMortgage >= 500000
      ? `<h3>Наше предложение</h3>
          <div class="calculation__result">
            <div><p><span>${costOfMortgage} рублей</span></br>Сумма ипотеки</p></div>
            <div><p><span>9,40%</span></br>Процентная ставка</p></div>
            <div><p><span>27 000 рублей</span></br>Ежемесячный платеж</p></div>
            <div><p><span>60 000 рублей</span></br>Необходимый доход</p></div>
          </div>
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
    this._girstPayPercent = null;
    this._yearsCount = null;
    this._isMotherUsed = false;
    this._costOfMortgage = null;
    this._banksPercentRate = null;
  }

  getTemplate() {
    return createOurOfferTemplate({
      costOfMortgage: this._costOfMortgage,
      creditType: this._creditType
    });
  }

  reRender(viewInformation) {
    this._creditType = viewInformation.creditType;
    this._propertyCost = viewInformation.propertyCost;
    this._firstPayment = viewInformation.firstPayment;
    this._girstPayPercent = viewInformation.girstPayPercent;
    this._yearsCount = viewInformation.yearsCount;
    this._isMotherUsed = viewInformation.isMotherUsed;

    const mothersCapital = this._isMotherUsed ? CAPITAL_OF_MOTHER : 0;
    this._costOfMortgage = this._propertyCost - this._firstPayment - mothersCapital;

    super.reRender();
  }
}

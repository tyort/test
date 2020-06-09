import AbstractSmartComponent from './abstract-smart-component.js';
import {setActualFeaturesNames} from '../formulas.js';


const FIRST_REQUEST_NUMBER = 11;
const creditNames = new Map([
  [`mortgage`, `Ипотека`],
  [`automobile`, `Автокредит`],
  [`consumer`, `Потребительский кредит`],
]);

const createRequestTemplate = (options = {}) => {
  const {requestNumber, creditType, propertyCost, firstPayment, yearsCount, isElementHidden} = options;
  const sdfdfdsf = creditNames.has(creditType) && !isElementHidden ? `` : `visually-hidden`;

  let requestNumberView = String(requestNumber);
  requestNumberView = (`№ 00`).slice(0, 6 - requestNumberView.length) + requestNumberView;

  return (`<div class="page-calculation__step-three ${sdfdfdsf}">
            <h3>Шаг 3. Оформление заявки</h3>
            <table class="page-calculation__request-information">
              <tr>
                <td class="request-article">Номер заявки</td>
                <td>${requestNumberView}</td>
              </tr>
              <tr>
                <td class="request-article">Цель кредита</td>
                <td>${creditNames.get(creditType)}</td>
              </tr>
              <tr>
                <td class="request-article">${setActualFeaturesNames(creditType).creditTypeTitle}</td>
                <td>${propertyCost} рублей</td>
              </tr>
    ${firstPayment
      ? `<tr>
          <td class="request-article">Первоначальный взнос</td>
          <td>${firstPayment} рублей</td>
        </tr>`
      : ``}
              <tr>
                <td class="request-article">Срок кредитования</td>
                <td>${yearsCount} лет</td>
              </tr>
            </table>
            <button class="calculation__send-btn" type="submit">Отправить</button>
          </div>`);
};


export default class Request extends AbstractSmartComponent {
  constructor() {
    super();

    this._requestNumber = FIRST_REQUEST_NUMBER;
    this._creditType = ``;
    this._firstPayment = null;
    this._propertyCost = null;
    this._yearsCount = null;
    this._isElementHidden = true;
  }

  getTemplate() {
    return createRequestTemplate({
      requestNumber: this._requestNumber,
      creditType: this._creditType,
      propertyCost: this._propertyCost,
      firstPayment: this._firstPayment,
      yearsCount: this._yearsCount,
      isElementHidden: this._isElementHidden
    });
  }

  reRender(request) {
    this._creditType = request.creditType;
    this._propertyCost = request.propertyCost;
    this._firstPayment = request.firstPayment;
    this._yearsCount = request.yearsCount;
    this._isElementHidden = request.isRequestHidden;
    super.reRender();
  }
}

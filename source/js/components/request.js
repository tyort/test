import AbstractSmartComponent from './abstract-smart-component.js';
import {setActualFeaturesNames, getTransformedNumber} from '../formulas.js';
import ClientsStorage from '../storage/storage.js';

const FIRST_REQUEST_NUMBER = 11;
const SHAKE_ANIMATION_TIMEOUT = 600;
const creditNames = new Map([
  [`mortgage`, `Ипотека`],
  [`automobile`, `Автокредит`],
  [`consumer`, `Потребительский кредит`],
]);

const clientsStorage = new ClientsStorage();

const getNextNumber = () => {
  if (clientsStorage.getClients().length !== 0) {
    const requestNumbers = clientsStorage.getClients()
        .map((it) => Number(it[`Request number`]))
        .sort((a, b) => a - b);
    return requestNumbers[requestNumbers.length - 1] + 1;
  }
  return null;
};

const createRequestTemplate = (options = {}) => {
  const {requestNumber, creditType, propertyCost, firstPayment, yearsCount, isElementHidden} = options;
  const showElement = creditNames.has(creditType) && !isElementHidden ? `` : `visually-hidden`;
  const propertyCostToLine = propertyCost ? getTransformedNumber(propertyCost) : null;
  const firstPaymentToLine = firstPayment ? getTransformedNumber(firstPayment) : null;

  let requestNumberView = String(requestNumber);
  requestNumberView = (`№ 00`).slice(0, 6 - requestNumberView.length) + requestNumberView;

  return (`<div class="page-calculation__request ${showElement}">
            <h3>Шаг 3. Оформление заявки</h3>
            <div class="page-calculation__request-information">
              <div class="page-calculation__request--line">
                <p class="request-article">Номер заявки</p>
                <p>${requestNumberView}</p>
              </div>
              <div class="page-calculation__request--line">
                <p class="request-article">Цель кредита</p>
                <p>${creditNames.get(creditType)}</p>
              </div>
              <div class="page-calculation__request--line">
                <p class="request-article">${setActualFeaturesNames(creditType).creditTypeTitle}</p>
                <p>${propertyCostToLine} рублей</p>
              </div>
    ${firstPayment
      ? `<div class="page-calculation__request--line">
          <p class="request-article">Первоначальный взнос</p>
          <p>${firstPaymentToLine} рублей</p>
        </div>`
      : ``}
              <div class="page-calculation__request--line">
                <p class="request-article">Срок кредитования</p>
                <p>${yearsCount} лет</p>
              </div>
            </div>
            <form class="page-calculation__form">
              <input 
                class="field--name__input"
                type="text"
                name="name"
                value=""
                id="block-name"
                placeholder="ФИО"
                autocomplete="off"
                required
              />
              <input
                class="field--phone__input"
                type="tel"
                name="phone"
                value=""
                id="block-phone"
                placeholder="Телефон"
                autocomplete="off"
                required
              />
              <input
                class="field--email__input"
                type="text"
                name="email"
                value=""
                id="block-email"
                placeholder="E-mail"
                autocomplete="off"
                required
              />
              <button class="calculation__send-btn" type="submit">Отправить</button>
            </form>
          </div>`);
};

export default class Request extends AbstractSmartComponent {
  constructor() {
    super();

    this._requestNumber = getNextNumber() || FIRST_REQUEST_NUMBER;
    this._creditType = ``;
    this._firstPayment = null;
    this._propertyCost = null;
    this._yearsCount = null;
    this._isElementHidden = true;
    this._showPopup = null;
    this._subscribeOnEvents();
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

  setShowPopupHandler(handler) {
    this._showPopup = handler;
  }

  recoveryListeners() {
    this._subscribeOnEvents();
  }

  reRender(request) {

    console.log(request);
    this._creditType = request.creditType;
    this._propertyCost = request.propertyCost;
    this._firstPayment = request.firstPayment;
    this._yearsCount = request.yearsCount;
    this._isElementHidden = request.isRequestHidden;
    super.reRender();
    this.recoveryListeners();
  }

  shake() {
    this.getElement().style.animation = `shake ${SHAKE_ANIMATION_TIMEOUT / 1000}s`;

    setTimeout(() => {
      this.getElement().style.animation = ``;
    }, SHAKE_ANIMATION_TIMEOUT);
  }


  _subscribeOnEvents() {
    const element = this.getElement();

    element.querySelector(`form`)
        .addEventListener(`input`, (evt) => {
          const phoneSample = /^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/;
          const mailSample = /^[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}$/i;

          if (evt.target.className === `field--phone__input`) {
            if (!phoneSample.test(evt.target.value)) {
              evt.target.setCustomValidity(`Напиши номер правильно`);

            } else {
              evt.target.setCustomValidity(``);
            }

          } else if (evt.target.className === `field--email__input`) {
            if (!mailSample.test(evt.target.value)) {
              evt.target.setCustomValidity(`Напиши email правильно`);

            } else {
              evt.target.setCustomValidity(``);
            }
          }
        });

    element.querySelector(`form`)
        .addEventListener(`submit`, (evt) => {
          evt.preventDefault();

          clientsStorage.putClient({
            'Request number': this._requestNumber.toString(),
            'Full name': element.querySelector(`#block-name`).value,
            'Phone number': element.querySelector(`#block-phone`).value.toString(),
            'E-mail': element.querySelector(`#block-email`).value
          });

          this._requestNumber += 1;

          element.querySelector(`form`).reset();
          this._showPopup();
        });


    element.querySelector(`form`)
        .addEventListener(`invalid`, () => {
          this.shake();
        }, true);
  }
}

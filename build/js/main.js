(function () {
  'use strict';

  const START_COST_OF_PROPERTY = 2000000;
  const ENTER_KEY_CODE = 13;
  const CAPITAL_OF_MOTHER = 470000;

  const creditTypes = [
    [`novalue`, `Выберете цель кредита`],
    [`mortgage`, `Ипотечное кредитование`],
    [`automobile`, `Автомобильное кредитование`],
    [`consumer`, `Потребительский кредит`],
  ];

  const renderComponent = (container, element, place) => {
    switch (place) {
      case `afterBegin`:
        container.prepend(element.getElement());
        break;
      case `afterEnd`:
        container.after(element.getElement());
        break;
      default:
        container.append(element.getElement());
    }
  };

  const createElement = (template) => {
    const newElement = document.createElement(`div`);
    newElement.innerHTML = template;
    return newElement.firstChild;
  };


  const setActualFeaturesNames = (creditType) => {
    let creditTypeTitle = ``;
    let maxPuschaseCost = null;
    let minPuschaseCost = null;
    let opertorsStepCost = null;
    let minFirstPaymentPercentage = null;
    let minMortgageCost = null;
    let maxCreditPeriod = null;
    let minCreditPeriod = null;

    switch (creditType) {
      case `automobile`:
        creditTypeTitle = `Стоимость автомобиля`;
        maxPuschaseCost = 5000000;
        minPuschaseCost = 500000;
        opertorsStepCost = 50000;
        minFirstPaymentPercentage = 20;
        minMortgageCost = 200000;
        maxCreditPeriod = 5;
        minCreditPeriod = 1;
        break;
      case `consumer`:
        creditTypeTitle = `Сумма потребительского кредита`;
        maxPuschaseCost = 3000000;
        minPuschaseCost = 50000;
        opertorsStepCost = 50000;
        minFirstPaymentPercentage = 0;
        minMortgageCost = 0;
        maxCreditPeriod = 7;
        minCreditPeriod = 1;

        break;
      default:
        creditTypeTitle = `Стоимость недвижимости`;
        maxPuschaseCost = 25000000;
        minPuschaseCost = 1200000;
        opertorsStepCost = 100000;
        minFirstPaymentPercentage = 10;
        minMortgageCost = 500000;
        maxCreditPeriod = 30;
        minCreditPeriod = 5;
        break;
    }

    return {
      creditTypeTitle,
      maxPuschaseCost,
      minPuschaseCost,
      opertorsStepCost,
      minFirstPaymentPercentage,
      minMortgageCost,
      maxCreditPeriod,
      minCreditPeriod
    };
  };

  const sliderScale = (creditType, number) => {
    let speedOfSlider = null;

    switch (creditType) {
      case `automobile`:
        speedOfSlider = number * 145 - 140;
        break;
      case `consumer`:
        speedOfSlider = number * 96 - 90;
        break;
      default:
        speedOfSlider = number * 23 - 110;
        break;
    }

    return speedOfSlider;
  };

  class AbstractComponent {
    constructor() {
      if (new.target === AbstractComponent) {
        throw new Error(`Can't instantiate AbstractComponent, only concrete one.`);
      }

      this._element = null;
    }

    getTemplate() {
      throw new Error(`Abstract method not implemented: getTemplate`);
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
  }

  class AbstractSmartComponent extends AbstractComponent {
    recoveryListeners() {
      throw new Error(`Abstract method not implemented: recoveryListeners`);
    }

    reRender() {
      const oldElement = this.getElement();
      const parent = oldElement.parentElement;
      this.removeElement();
      const newElement = this.getElement();
      parent.replaceChild(newElement, oldElement);
    }
  }

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

  class OurOffer extends AbstractSmartComponent {
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

  /* eslint-disable no-alert */

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
    const {costOfProperty, firstPayment, firstPaymentPercantage, periodOfCredit, typeOfCredit, isBonusUsed, isKaskoUsed, isInsuranceUsed, isParticipantUsed} = options;
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
        <label for="cost-of-property">${setActualFeaturesNames(typeOfCredit).creditTypeTitle}</label>
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
        <p>От ${setActualFeaturesNames(typeOfCredit).minPuschaseCost} до ${setActualFeaturesNames(typeOfCredit).maxPuschaseCost} рублей</p>
      </fieldset>

      ${typeOfCredit === `consumer`
      ? ``
      : `<fieldset class="${isElementHidden}">
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
            <output 
              for="first-payment__percent" 
              style="left: ${typeOfCredit === `automobile` ? firstPaymentPercantage * 7.2 - 145 : firstPaymentPercantage * 6.4 - 65}px"
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
        </fieldset>`
    }



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
          <output for="credit-period__years" style="left: ${sliderScale(typeOfCredit, periodOfCredit)}px">${periodOfCredit}лет</output>
          <input 
            type="range"
            id="credit-period__years"
            min="${setActualFeaturesNames(typeOfCredit).minCreditPeriod}"
            max="${setActualFeaturesNames(typeOfCredit).maxCreditPeriod}"
            step="1"
            value="${periodOfCredit}">
        </div>
      </fieldset>

      <fieldset class="${isElementHidden}">
${typeOfCredit === `mortgage`
      ? `<input type="checkbox" name="bonus" id="bonus__input" ${isBonusUsed ? `checked` : ``}>
        <label for="bonus__input">Использовать материнский капитал</label>`
      : ``}
${typeOfCredit === `automobile`
      ? `<input type="checkbox" name="kasko" id="kasko__input" ${isKaskoUsed ? `checked` : ``}>
        <label for="kasko__input">Оформить КАСКО в нашем банке</label>
        <input type="checkbox" name="insurance" id="insurance__input" ${isInsuranceUsed ? `checked` : ``}>
        <label for="insurance__input">Оформить Страхование жизни в нашем банке</label>`
      : ``}
${typeOfCredit === `consumer`
      ? `<input type="checkbox" name="participant" id="participant__input" ${isParticipantUsed ? `checked` : ``}>
        <label for="participant__input">Участник зарплатного проекта нашего банка</label>`
      : ``}
      </fieldset>
    </form>`
    );
  };

  class Calculation extends AbstractSmartComponent {
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
        if (isNaN(Number(evt.target.value))) {
          alert(`Введите числовое значение`);
          this.reset();

        } else {
          if (Number(evt.target.value) <= setActualFeaturesNames(this._typeOfCredit).maxPuschaseCost && Number(evt.target.value) >= setActualFeaturesNames(this._typeOfCredit).minPuschaseCost) {
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

  const createPageCalculationTemplate = () => {
    return (
      `<div class="page-calculation">
      <h2>Кредитный калькулятор</h2>
    </div>`
    );
  };

  class PageCalculation extends AbstractComponent {
    getTemplate() {
      return createPageCalculationTemplate();
    }
  }

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
                <td class="request-article">Стоимость недвижимости</td>
                <td>${propertyCost} рублей</td>
              </tr>
              <tr>
                <td class="request-article">Первоначальный взнос</td>
                <td>${firstPayment} рублей</td>
              </tr>
              <tr>
                <td class="request-article">Срок кредитования</td>
                <td>${yearsCount} лет</td>
              </tr>
            </table>
            <button class="calculation__send-btn" type="submit">Отправить</button>
          </div>`);
  };


  class Request extends AbstractSmartComponent {
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

  const pageCalculationComponent = new PageCalculation();
  const calculationComponent = new Calculation();
  const ourOfferComponent = new OurOffer();
  const requestComponent = new Request();

  const pageOffersMenu = document.querySelector(`.page-offers-menu`);
  renderComponent(pageOffersMenu, pageCalculationComponent, `afterEnd`);

  const pageCalculation = document.querySelector(`.page-calculation`);
  renderComponent(pageCalculation, calculationComponent);
  const titleName = pageCalculation.querySelector(`h2`);
  renderComponent(titleName, ourOfferComponent, `afterEnd`);

  const pageCalculationParameters = document.querySelector(`.page-calculation__parameters`);
  renderComponent(pageCalculationParameters, requestComponent, `afterEnd`);

  const parseFormData = (formData) => {
    let propertyCost = formData.get(`cost-of-property`);
    propertyCost = Number(propertyCost.slice(0, propertyCost.length - 7));
    let firstPayment = formData.get(`first-payment`);
    firstPayment = firstPayment
      ? Number(firstPayment.slice(0, firstPayment.length - 7))
      : null;

    let firstPayPercent = null;
    if (document.querySelector(`.percent-slider`)) {
      firstPayPercent = document.querySelector(`.percent-slider`).querySelector(`output`).textContent;
      firstPayPercent = Number(firstPayPercent.slice(0, firstPayPercent.length - 1));
    }

    let yearsCount = document.querySelector(`.years-slider`).querySelector(`output`).textContent;
    yearsCount = Number(yearsCount.slice(0, yearsCount.length - 3));

    const isBonusUsed = document.querySelector(`#bonus__input`)
      ? document.querySelector(`#bonus__input`).hasAttribute(`checked`)
      : null;

    const isKaskoUsed = document.querySelector(`#kasko__input`)
      ? document.querySelector(`#kasko__input`).hasAttribute(`checked`)
      : null;

    const isInsuranceUsed = document.querySelector(`#insurance__input`)
      ? document.querySelector(`#insurance__input`).hasAttribute(`checked`)
      : null;

    const isParticipantUsed = document.querySelector(`#participant__input`)
      ? document.querySelector(`#participant__input`).hasAttribute(`checked`)
      : null;

    return {
      'creditType': formData.get(`credit-type`),
      propertyCost,
      firstPayment,
      firstPayPercent,
      yearsCount,
      isBonusUsed,
      isKaskoUsed,
      isInsuranceUsed,
      isParticipantUsed
    };
  };

  let viewInformation = {};

  calculationComponent.setCalculateResultHandler(() => {
    const formData = calculationComponent.getChangedDataByView();
    viewInformation = parseFormData(formData);
    ourOfferComponent.reRender(viewInformation);
    requestComponent.reRender(Object.assign({}, viewInformation, {isRequestHidden: true}));
  });

  ourOfferComponent.setCreateRequestHandler(() => {
    requestComponent.reRender(Object.assign({}, viewInformation, {isRequestHidden: false}));
  });

}());

//# sourceMappingURL=main.js.map

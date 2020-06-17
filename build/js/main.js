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
    let messageInsert = ``;
    let sumCreditName = ``;

    switch (creditType) {
      case `automobile`:
        creditTypeTitle = `Стоимость автомобиля`;
        sumCreditName = `Сумма автокредита`;
        maxPuschaseCost = 5000000;
        minPuschaseCost = 500000;
        opertorsStepCost = 50000;
        minFirstPaymentPercentage = 20;
        minMortgageCost = 200000;
        maxCreditPeriod = 5;
        minCreditPeriod = 1;
        messageInsert = `автокредиты`;
        break;
      case `consumer`:
        creditTypeTitle = `Сумма потребительского кредита`;
        sumCreditName = `Cумма ипотеки`;
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
        sumCreditName = `Cумма кредита`;
        maxPuschaseCost = 25000000;
        minPuschaseCost = 1200000;
        opertorsStepCost = 100000;
        minFirstPaymentPercentage = 10;
        minMortgageCost = 500000;
        maxCreditPeriod = 30;
        minCreditPeriod = 5;
        messageInsert = `ипотечные кредиты`;
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
      minCreditPeriod,
      messageInsert,
      sumCreditName
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
    const {costOfMortgage, creditType, annualPercentRate, mounthlyPayment, requiredIncome, minCreditRequired} = options;
    const isElementHidden = creditType === creditTypes[0][0] ? `visually-hidden` : ``;

    return (
      `<div class="page-calculation__our-offer ${isElementHidden}">
      ${costOfMortgage >= minCreditRequired
      ? `<h3>Наше предложение</h3>
          <div class="calculation__result">
            <div><p><span>${costOfMortgage} рублей</span></br>${setActualFeaturesNames(creditType).sumCreditName}</p></div>
            <div><p><span>${annualPercentRate}%</span></br>Процентная ставка</p></div>
            <div><p><span>${mounthlyPayment} рублей</span></br>Ежемесячный платеж</p></div>
            <div><p><span>${requiredIncome} рублей</span></br>Необходимый доход</p></div>
          </div>
          <button class="calculation__request-btn" type="button">Оформить заявку</button>
        </div>`
      : `<p>
          <span>Наш банк не выдает ${setActualFeaturesNames(creditType).messageInsert}
          меньше ${minCreditRequired} рублей.</span></br>
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

  const worldParts = [
    [`russia`, `Россия`],
    [`cis`, `СНГ`],
    [`europe`, `Европа`]
  ];

  const cities = {
    'russia': [
      [`Саратов`, [51.533103, 46.034158]],
      [`Санкт-Петербург`, [59.939095, 30.315868]],
      [`Москва`, [55.755814, 37.617635]],
      [`Кировск`, [59.875330, 30.981457]],
      [`Тюмень`, [57.153033, 65.534328]],
      [`Омск`, [54.989342, 73.368212]]
    ],
    'cis': [
      [`Баку`, [40.369539, 49.835011]],
      [`Ташкент`, [41.311151, 69.279737]],
      [`Минск`, [53.902512, 27.561481]],
      [`Алматы`, [43.238293, 76.945465]],
    ],
    'europe': [
      [`Париж`, [48.856663, 2.351556]],
      [`Прага`, [50.080293, 14.428983]],
      [`Лондон`, [51.507351, -0.127660]],
      [`Рим`, [41.902689, 12.496176]]
    ]
  };

  const createWorldParts = (parts) => {
    return parts
        .map((item) => {
          return (
            `<div>
            <input type="checkbox" value="${item[0]}" id="${item[0]}">
            <label for="${item[0]}">${item[1]}</label>
          </div>`
          );
        })
        .join(``);
  };

  const createMapTemplate = () => {
    const worldsPart = createWorldParts(worldParts);

    return (
      `<div class="page-map">
      <div class="container">
        <div class="page-map__inner"></div>

          <div class="page-map__title">
            Отделения Лига Банка
          </div>

          <div class="page-map__contries">
            ${worldsPart}
          </div>

          <div class="page-map__view" id="YMapsID" style="width: 1170px; height: 462px;"></div>

        </div>
      </div>
    </div>`);
  };


  class Map$1 extends AbstractSmartComponent {
    constructor() {
      super();
      this._myMap = null;
      this._countries = [];
      this._getInitMap();
      this._subscribeOnEvents();
    }

    getTemplate() {
      return createMapTemplate();
    }

    changedDataByView() {
      let interestedCities = [];

      if (this._countries) {
        Object.keys(cities).forEach((it) => {
          if (this._countries.includes(it)) {
            interestedCities = [...interestedCities, ...cities[it]];
          }
        });
      }

      this._myMap.geoObjects.removeAll();

      for (let i = 0; i < interestedCities.length; i++) {
        this._myMap.geoObjects
            .add(new window.ymaps.Placemark(interestedCities[i][1], {
              balloonContent: `${interestedCities[i][0]}`
            }, {
              preset: `islands#icon`,
              iconColor: `#0095b6`
            }));
      }

    }

    _getInitMap() {
      window.addEventListener(`mapWasLoaded`, () => {
        window.ymaps.ready(() => {
          this._myMap = new window.ymaps.Map(`YMapsID`, {
            center: [55.76, 37.64],
            zoom: 10,
          }, {
            searchControlProvider: `yandex#search`
          });
        });
      });
    }


    _subscribeOnEvents() {
      const element = this.getElement();

      element.querySelector(`.page-map__contries`)
          .addEventListener(`change`, (evt) => {
            const original = new Set(this._countries);

            if (evt.target.checked) {
              original.add(evt.target.value);

            } else {
              original.delete(evt.target.value);
            }
            this._countries = [...original];
            this.changedDataByView();
          });
    }
  }

  const getCheckedSlickSlide = (element) => {
    switch (element) {
      case `menu__nav-item--first`:
        return document.querySelector(`#slick-slide-control00`);
      case `menu__nav-item--second`:
        return document.querySelector(`#slick-slide-control01`);
      case `menu__nav-item--third`:
        return document.querySelector(`#slick-slide-control02`);
      case `menu__nav-item--forth`:
        return document.querySelector(`#slick-slide-control03`);
      default:
        return null;
    }
  };

  const createOffersMenuTemplate = () => {
    return (
      `<div class="page-offers-menu">
        <div class="page-offers-menu__inner">
          <div class="page-offers-menu__nav">
            <button class="menu__nav-item--first">Вклады</button>
            <button class="menu__nav-item--second">Кредиты</button>
            <button class="menu__nav-item--third">Страхование</button>
            <button class="menu__nav-item--forth">Онлайн-сервисы</button>
          </div>
          <div class="page-offers__slider">
            <div class="page-offers-item__view">
                <img src="img/slide-deposit.svg" alt="deposit" width="1170" height="410">
            </div>
            <div class="page-offers-item__view">
                <img src="img/slide-credits.svg" alt="credits" width="1170" height="410">
            </div>
            <div class="page-offers-item__view">
                <img src="img/slide-insurance.svg" alt="insurance" width="1170" height="410">
            </div>
            <div class="page-offers-item__view">
                <img src="img/slide-online.svg" alt="online" width="1170" height="410">
            </div>
          </div>
        </div>
    </div>`);
  };


  class OffersMenu extends AbstractSmartComponent {
    constructor() {
      super();
      this._getInitMap();
      this._subscribeOnEvents();
    }

    getTemplate() {
      return createOffersMenuTemplate();
    }

    _getInitMap() {
      window.$(document).ready(() => {
        window.$(`.page-offers__slider`).slick({
          dots: true,
          infinite: true,
          speed: 300,
          slidesToShow: 1,
          adaptiveHeight: true,
          arrows: false
        });

        document.querySelector(`.slick-dots`).classList.add(`visually-hidden`);
      });
    }

    _subscribeOnEvents() {
      const element = this.getElement();

      element.querySelector(`.page-offers-menu__nav`)
          .addEventListener(`click`, (evt) => {
            getCheckedSlickSlide(evt.target.className).click();
          });
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
    const showElement = creditNames.has(creditType) && !isElementHidden ? `` : `visually-hidden`;

    let requestNumberView = String(requestNumber);
    requestNumberView = (`№ 00`).slice(0, 6 - requestNumberView.length) + requestNumberView;

    return (`<div class="page-calculation__request ${showElement}">
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
            <form class="page-calculation__form">
              <fieldset class="field--name__field">
                <input 
                  class="field--name__input"
                  type="text"
                  name="name"
                  value=""
                  id="block-name"
                  placeholder="ФИО"
                  autocomplete="off"
                  autofocus
                  required
                />
              </fieldset>
              <fieldset class="field--phone__field">
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
              </fieldset>
              <fieldset class="field--email__field">
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
              </fieldset>
              <div class="btn-section">
                <button class="calculation__send-btn" type="submit">Отправить</button>
              </div>
            </form>
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
      this._creditType = request.creditType;
      this._propertyCost = request.propertyCost;
      this._firstPayment = request.firstPayment;
      this._yearsCount = request.yearsCount;
      this._isElementHidden = request.isRequestHidden;
      super.reRender();
      this.recoveryListeners();
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
            this._requestNumber += 1;
            element.querySelector(`form`).reset();
            this._showPopup();
          });
    }
  }

  const createPopupTemplate = (options = {}) => {
    const {isPopupHidden} = options;
    const isElementHidden = isPopupHidden ? `visually-hidden` : ``;

    return (`<div class="popup-gratitude ${isElementHidden}">
            <div class="popup-gratitude__body">
              <div class="popup-gratitude__content">
                <a href="#" class="popup-gratitude__close"></a>
                <p class="popup-gratitude__title">Спасибо за обращение в банк.</p>
                <p class="popup-gratitude__text">Наш менеджер скоро свяжется с Вами</br>по указанному номеру телефона</p>
              </div>
            </div>
          </div>`);
  };

  class Popup extends AbstractSmartComponent {
    constructor() {
      super();
      this.isPopupHidden = true;
      this._showRequest = null;
      this._onEscKeyDown = this._onEscKeyDown.bind(this);
      this._subscribeOnEvents();
    }

    getTemplate() {
      return createPopupTemplate({
        isPopupHidden: this.isPopupHidden
      });
    }

    setShowRequestHandler(handler) {
      this._showRequest = handler;
    }

    recoveryListeners() {
      this._subscribeOnEvents();
    }

    reRender(request) {
      this.isPopupHidden = request.isPopupHidden;
      this._showRequest();
      super.reRender();
      this.recoveryListeners();
    }

    _subscribeOnEvents() {
      const element = this.getElement();

      document.addEventListener(`keydown`, this._onEscKeyDown);

      element.querySelector(`.popup-gratitude__close`)
          .addEventListener(`click`, () => {
            this.reRender({isPopupHidden: true});
          });
    }

    _onEscKeyDown(evt) {
      if (evt.key === `Escape` || evt.key === `Esc`) {
        this.reRender({isPopupHidden: true});
        document.removeEventListener(`keydown`, this._onEscKeyDown);
      }
    }
  }

  const createPopupTemplate$1 = (options = {}) => {
    const {isPopupHidden} = options;
    const isElementHidden = isPopupHidden ? `visually-hidden` : ``;

    return (`<div class="popup-registration ${isElementHidden}">
            <div class="popup-registration__body">
              <div class="popup-registration__content">
                <div class="popup-registration__content-header">
                  <img src="img/reglogo.svg" alt="ЛИГА Банк" width="150" height="27">
                  <a href="#" class="popup-registration__close"></a>
                </div>
                <form class="popup-registration__form">
                  <fieldset class="field--login__field">
                    <label for="block-login">Логин</label>
                    <input 
                      class="field--login__input"
                      type="text"
                      name="login"
                      value=""
                      id="block-login"
                      placeholder="Login"
                      autocomplete="off"
                      autofocus
                      required
                    />
                  </fieldset>
                  <fieldset class="field--password__field">
                    <label for="block-password">Пароль</label>
                    <input 
                      class="field--password__input"
                      type="password"
                      name="password"
                      value=""
                      id="block-password"
                      placeholder="Password"
                      autocomplete="off"
                      required
                    />
                  </fieldset>
                  <button class="popup-registration__btn" type="submit">Войти</button>
                </form>
              </div>
            </div>
          </div>`);
  };

  class Popup$1 extends AbstractSmartComponent {
    constructor() {
      super();
      this.isPopupHidden = true;
      this._onEscKeyDown = this._onEscKeyDown.bind(this);
      this._subscribeOnEvents();
    }

    getTemplate() {
      return createPopupTemplate$1({
        isPopupHidden: this.isPopupHidden
      });
    }

    recoveryListeners() {
      this._subscribeOnEvents();
    }

    reRender(request) {
      this.isPopupHidden = request.isPopupHidden;
      super.reRender();
      this.recoveryListeners();
    }

    _subscribeOnEvents() {
      const element = this.getElement();

      document.addEventListener(`keydown`, this._onEscKeyDown);

      element.querySelector(`.popup-registration__close`)
          .addEventListener(`click`, () => {
            this.reRender({isPopupHidden: true});
          });
    }

    _onEscKeyDown(evt) {
      if (evt.key === `Escape` || evt.key === `Esc`) {
        this.reRender({isPopupHidden: true});
        document.removeEventListener(`keydown`, this._onEscKeyDown);
      }
    }
  }

  const createHeaderTemplate = () => {

    return (`<header class="page-header">
            <div class="page-header__logo">
              <img src="img/logo.svg" alt="ЛИГА Банк" width="149" height="25">
            </div>
            <div class="main-nav">
              <ul class="main-nav__list">
                <li class="main-nav__item"><a class="main-nav__item--link" href="#">Услуги</a></li>
                <li class="main-nav__item"><a class="main-nav__item--link" href="#">Рассчитать кредит</a></li>
                <li class="main-nav__item"><a class="main-nav__item--link" href="#">Контакты</a></li>
                <li class="main-nav__item"><a class="main-nav__item--link" href="#">Задать вопрос</a></li>
              </ul>
            </div>
            <div class="btn btn-page-header__login">
              Войти в Интернет-банк
            </div>
          </header>`);
  };

  class Header extends AbstractSmartComponent {
    constructor() {
      super();
      this._showRegistration = null;
      this._subscribeOnEvents();
    }

    getTemplate() {
      return createHeaderTemplate();
    }

    setShowRegistrationHandler(handler) {
      this._showRegistration = handler;
    }

    recoveryListeners() {
      this._subscribeOnEvents();
    }

    reRender() {
      super.reRender();
      this.recoveryListeners();
    }

    _subscribeOnEvents() {
      const element = this.getElement();

      element.querySelector(`.btn-page-header__login`)
          .addEventListener(`click`, () => {
            this._showRegistration();
          });
    }
  }

  // const sdfsdfdsf = (element) => {
  //   switch (element) {
  //     case `menu__nav-item--first`:
  //       return document.querySelector(`#slick-slide-control00`);
  //     case `menu__nav-item--second`:
  //       return document.querySelector(`#slick-slide-control01`);
  //     case `menu__nav-item--third`:
  //       return document.querySelector(`#slick-slide-control02`);
  //     case `menu__nav-item--forth`:
  //       return document.querySelector(`#slick-slide-control03`);
  //     default:
  //       return null;
  //   }
  // };

  const createPresentationTemplate = () => {
    return (
      `<div class="page-presentation">
        <div class="page-presentation__slider">
          <div class="page-presentation-item__view">
            <img src="img/slide-cards.svg" alt="cards">
          </div>
          <div class="page-presentation-item__view">
            <img src="img/slide-confidence.svg" alt="confidence">
          </div>
          <div class="page-presentation-item__view">
            <img src="img/slide-girl.svg" alt="girl">
          </div>
        </div>
    </div>`);
  };


  class OffersMenu$1 extends AbstractSmartComponent {
    constructor() {
      super();
      this._getInitMap();
      this._subscribeOnEvents();
    }

    getTemplate() {
      return createPresentationTemplate();
    }

    _getInitMap() {
      window.$(document).ready(() => {
        window.$(`.page-presentation__slider`).slick({
          dots: true,
          infinite: true,
          speed: 300,
          slidesToShow: 1,
          adaptiveHeight: true,
          arrows: false,
        });
      });
    }

    _subscribeOnEvents() {}
  }

  const headerComponent = new Header();
  const pageCalculationComponent = new PageCalculation();
  const calculationComponent = new Calculation();
  const ourOfferComponent = new OurOffer();
  const requestComponent = new Request();
  const mapComponent = new Map$1();
  const offersMenuComponent = new OffersMenu();
  const popupGratitudeComponent = new Popup();
  const registrationComponent = new Popup$1();
  const presentationComponent = new OffersMenu$1();

  renderComponent(document.querySelector(`body`), headerComponent, `afterBegin`);
  renderComponent(document.querySelector(`body`), popupGratitudeComponent);
  renderComponent(document.querySelector(`body`), registrationComponent);

  const pageHeader = document.querySelector(`.page-header`);
  renderComponent(pageHeader, presentationComponent, `afterEnd`);

  const promo = document.querySelector(`.page-promo`);
  renderComponent(promo, offersMenuComponent, `afterEnd`);

  const pageOffersMenu = document.querySelector(`.page-offers-menu`);
  renderComponent(pageOffersMenu, pageCalculationComponent, `afterEnd`);

  const pageCalculation = document.querySelector(`.page-calculation`);
  renderComponent(pageCalculation, calculationComponent);
  const titleName = pageCalculation.querySelector(`h2`);
  renderComponent(titleName, ourOfferComponent, `afterEnd`);

  const pageCalculationParameters = document.querySelector(`.page-calculation__parameters`);
  renderComponent(pageCalculationParameters, requestComponent, `afterEnd`);

  renderComponent(pageCalculation, mapComponent, `afterEnd`);

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

  requestComponent.setShowPopupHandler(() => {
    popupGratitudeComponent.reRender({isPopupHidden: false});
  });

  popupGratitudeComponent.setShowRequestHandler(() => {
    requestComponent.reRender(Object.assign({}, viewInformation, {isRequestHidden: true}));
  });

  headerComponent.setShowRegistrationHandler(() => {
    registrationComponent.reRender({isPopupHidden: false});
  });

}());

//# sourceMappingURL=main.js.map

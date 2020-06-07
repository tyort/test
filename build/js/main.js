(function () {
  'use strict';

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
        <label for="cost-of-property">Стоимость недвижимости</label>
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
        <p>От 1 200 000 до 25 000 000 рублей</p>
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

  class Calculation extends AbstractSmartComponent {
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

    setCalculateResultHandler(handler) {
      this._calculateResultHandler = handler;
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

      form.querySelector(`.cost-of-property__scale`)
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

  const createStepThreeTemplate = () => {
    return (`<div class="page-calculation__step-three">
            <h3>Шаг 3. Оформление заявки</h3>
            <table class="page-calculation__request-information">
              <tr>
                <td class="request-article">Номер заявки</td>
                <td>№ 0010</td>
              </tr>
              <tr>
                <td class="request-article">Цель кредита</td>
                <td>Ипотека</td>
              </tr>
              <tr>
                <td class="request-article">Стоимсоть недвижимости</td>
                <td>2000000 рублей</td>
              </tr>
              <tr>
                <td class="request-article">Первоначальный взнос</td>
                <td>200000 рублей</td>
              </tr>
              <tr>
                <td class="request-article">Срок кредитования</td>
                <td>5 лет</td>
              </tr>
            </table>
            <button class="calculation__send-btn" type="submit">Отправить</button>
          </div>`);
  };


  class StepThree extends AbstractSmartComponent {
    constructor() {
      super();
    }

    getTemplate() {
      return createStepThreeTemplate();
    }
  }

  const pageCalculationComponent = new PageCalculation();
  const calculationComponent = new Calculation();
  const ourOfferComponent = new OurOffer();
  const stepThreeComponent = new StepThree();

  const pageOffersMenu = document.querySelector(`.page-offers-menu`);
  renderComponent(pageOffersMenu, pageCalculationComponent, `afterEnd`);

  const pageCalculation = document.querySelector(`.page-calculation`);
  renderComponent(pageCalculation, calculationComponent);
  const titleName = pageCalculation.querySelector(`h2`);
  renderComponent(titleName, ourOfferComponent, `afterEnd`);

  const pageCalculationParameters = document.querySelector(`.page-calculation__parameters`);
  renderComponent(pageCalculationParameters, stepThreeComponent, `afterEnd`);

  const parseFormData = (formData) => {
    let propertyCost = formData.get(`cost-of-property`);
    propertyCost = Number(propertyCost.slice(0, propertyCost.length - 7));
    let firstPayment = formData.get(`first-payment`);
    firstPayment = Number(firstPayment.slice(0, firstPayment.length - 7));
    let firstPayPercent = document.querySelector(`.percent-slider`).querySelector(`output`).textContent;
    firstPayPercent = Number(firstPayPercent.slice(0, firstPayPercent.length - 1));
    let yearsCount = document.querySelector(`.years-slider`).querySelector(`output`).textContent;
    yearsCount = Number(yearsCount.slice(0, yearsCount.length - 3));
    const isMotherUsed = document.querySelector(`#mothers-capital__input`).hasAttribute(`checked`);

    return {
      'creditType': formData.get(`credit-type`),
      propertyCost,
      firstPayment,
      firstPayPercent,
      yearsCount,
      isMotherUsed
    };
  };

  calculationComponent.setCalculateResultHandler(() => {
    const formData = calculationComponent.getChangedDataByView();
    let viewInformation = parseFormData(formData);
    ourOfferComponent.reRender(viewInformation);
  });

}());

//# sourceMappingURL=main.js.map

(function () {
  'use strict';

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

  /* eslint-disable no-alert */

  const START_COST_OF_PROPERTY = 2000000;
  const MIN_FIRST_PAYMENT_PERCENTAGE = 10;
  const MIN_COST_MORTGAGE = 500000;
  const ENTER_KEY_CODE = 13;
  const MAX_COST_OF_PROPERTY = 25000000;
  const MIN_COST_OF_PROPERTY = 1200000;
  const OPERATORS_STEP_COST = 100000;

  const createCalculationTemplate = (options = {}) => {
    const {costOfProperty, firstPayment, firstPaymentPercantage} = options;

    return (
      `<div class="page-calculation">
      <div class="container clearfix">
        <h2>Кредитный калькулятор</h2>

        <div class="page-calculation__first-step">
          <h3>Шаг 1. Цель кредита</h3>
          <select id="type-of-credit" name="credit-type">
            <option value="novalue" selected>Выберете цель кредита</option>
            <option value="mortgage">Ипотечное кредитование</option>
            <option value="automobile">Автомобильное кредитование</option>
            <option value="consumer">Потребительский кредит</option>
          </select>
        </div>

        <div class="page-calculation__our-offer">
          <h3>Наше предложение</h3>
          <div class="calculation__result">
            <div><p>1 300 000 рублей</br>Сумма ипотеки</p></div>
            <div><p>9,40%</br>Процентная ставка</p></div>
            <div><p>27 000 рублей</br>Ежемесячный платеж</p></div>
            <div><p>60 000 рублей</br>Необходимый доход</p></div>
          </div>
        </div>

        <form class="page-calculation__parameters">
          <h3>Шаг 2. Введите параметры кредита</h3>

          <fieldset>
            <label for="cost-of-property">Стоимость недвижимости</label>
            <div class="cost-of-property__scale">
              <span class="operator minus">-</span>
              <input
                autocomplete="off"
                class="cost-of-property__input"
                id="cost-of-property"
                type="text"
                value="${costOfProperty} рублей"
                required
              />
              <span class="operator plus">+</span>
            </div>
            <p>От 1 200 000 до 25 000 000 рублей</p>
          </fieldset>

          <fieldset>
            <label for="first-payment">Первоначальный взнос</label>
            <input
              autocomplete="off"
              class="first-payment__input"
              id="first-payment"
              type="text"
              value="${firstPayment} рублей"
              max="${costOfProperty}"
              required
            />
            <div class="percent-slider">
              <output for="first-payment__percent" style="left: ${firstPaymentPercantage * 6.5 - 65}px">${firstPaymentPercantage}%</output>
              <input type="range" id="first-payment__percent" min="10" max="100" step="5" value="${firstPaymentPercantage}">
            </div>
          </fieldset>
        </form>
      </div>
    </div>`
    );
  };

  class Calculation {
    constructor() {
      this._element = null;
      this._costOfProperty = START_COST_OF_PROPERTY;
      this._firstPaymentPercantage = MIN_FIRST_PAYMENT_PERCENTAGE;
      this._mortgageSize = MIN_COST_MORTGAGE;
      this._firstPayment = this._costOfProperty * this._firstPaymentPercantage / 100;
      this._subscribeOnEvents();
    }

    getTemplate() {
      return createCalculationTemplate({
        costOfProperty: this._costOfProperty,
        firstPayment: this._firstPayment,
        firstPaymentPercantage: this._firstPaymentPercantage
      });
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

    recoveryListeners() {
      this._subscribeOnEvents();
    }

    reRender() {
      const oldElement = this.getElement();
      const parent = oldElement.parentElement;
      this.removeElement();
      const newElement = this.getElement();
      parent.replaceChild(newElement, oldElement);
      this.recoveryListeners();
    }

    reset() {
      this._firstPaymentPercantage = MIN_FIRST_PAYMENT_PERCENTAGE;
      this._firstPayment = this._costOfProperty * this._firstPaymentPercantage / 100;
      this.reRender();
    }

    _subscribeOnEvents() {
      const element = this.getElement();

      element.querySelector(`form`)
          .addEventListener(`submit`, (evt) => {
            evt.preventDefault();
          });

      element.querySelector(`#first-payment__percent`)
          .addEventListener(`change`, (evt) => {
            this._firstPaymentPercantage = evt.target.value;
            this._firstPayment = this._costOfProperty * this._firstPaymentPercantage / 100;
            this.reRender();
          });

      element.querySelector(`#first-payment`)
          .addEventListener(`change`, (evt) => {
            if (evt.target.value >= this._costOfProperty * MIN_FIRST_PAYMENT_PERCENTAGE / 100 && evt.target.value <= this._costOfProperty) {
              this._firstPayment = evt.target.value;
              this._firstPaymentPercantage = new window.Decimal(100).mul(this._firstPayment).div(this._costOfProperty);
              this.reRender();
            } else if (evt.target.value < this._costOfProperty * MIN_FIRST_PAYMENT_PERCENTAGE / 100) {
              this._firstPayment = this._costOfProperty * MIN_FIRST_PAYMENT_PERCENTAGE / 100;
              this._firstPaymentPercantage = new window.Decimal(100).mul(this._firstPayment).div(this._costOfProperty);
              this.reRender();
            }
          });

      const costOfProperty = element.querySelector(`#cost-of-property`);

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

      element.querySelector(`.cost-of-property__scale`)
          .addEventListener(`click`, (evt) => {
            evt.preventDefault();
            if (evt.target.className !== `operator minus` && evt.target.className !== `operator plus`) {
              return;

            } else if (evt.target.className === `operator minus`) {
              this._costOfProperty -= OPERATORS_STEP_COST;

              if (this._costOfProperty <= MAX_COST_OF_PROPERTY && this._costOfProperty >= MIN_COST_OF_PROPERTY) {
                this.reset();

              } else {
                return;
              }

            } else if (evt.target.className === `operator plus`) {
              this._costOfProperty += OPERATORS_STEP_COST;

              if (this._costOfProperty <= MAX_COST_OF_PROPERTY && this._costOfProperty >= MIN_COST_OF_PROPERTY) {
                this.reset();

              } else {
                return;
              }
            }
          });

      const firstPayment = element.querySelector(`#first-payment`);

      firstPayment.addEventListener(`change`, (evt) => {
        if (isNaN(Number(evt.target.value))) {
          alert(`Введите числовое значение`);
          evt.target.value = `${this._firstPayment} рублей`;
          this.reRender();

        } else {
          const allowableFirstPayment = this._costOfProperty * MIN_FIRST_PAYMENT_PERCENTAGE / 100;
          if (Number(evt.target.value) <= this._costOfProperty && Number(evt.target.value) >= allowableFirstPayment) {
            this._firstPayment = Number(evt.target.value);
            this._firstPaymentPercantage = this._firstPayment * 100 / this._costOfProperty;
            this.reRender();

          } else {
            alert(`Не подходящее число`);
            evt.target.value = `${this._firstPayment} рублей`;
            this.reRender();
          }
        }
      });

      firstPayment.addEventListener(`focus`, (evt) => {
        evt.target.value = this._firstPayment;

        firstPayment.addEventListener(`keydown`, (e) => {
          if (Number(e.target.value) === Number(this._firstPayment) && e.keyCode === ENTER_KEY_CODE) {
            e.target.value = `${this._firstPayment} рублей`;
            firstPayment.blur();
          }
        });
      });

      firstPayment.addEventListener(`blur`, (evt) => {
        if (Number(evt.target.value) === Number(this._firstPayment)) {
          evt.target.value = `${this._firstPayment} рублей`;
        }
      });

    }
  }

  new window.Decimal(10).div(2);

  const pageOffersMenu = document.querySelector(`.page-offers-menu`);
  const calculationComponent = new Calculation();
  renderComponent(pageOffersMenu, calculationComponent, `afterEnd`);

}());

//# sourceMappingURL=main.js.map

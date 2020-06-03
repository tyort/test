(function (decimal_js) {
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

  const START_COST_OF_PROPERTY = 2000000;

  const createCalculationTemplate = (options = {}) => {
    const {costOfProperty, firstPayment} = options;
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
            <input 
              id="cost-of-property"
              type="number"
              value="${costOfProperty}"
              step="100000"
              min="1200000"
              max="25000000"
              required
            />
            <p>От 1 200 000 до 25 000 000 рублей</p>
          </fieldset>

          <fieldset>
            <label for="first-payment">Первоначальный взнос</label>
            <input 
              id="first-payment"
              type="number"
              value="${firstPayment}"
              required
            />
            <div class="slidecontainer">
              <input id="rng" name="rng" type="range" min="1" max="100" value="50">
              <output id="ong" for="rng">50</output>
            </div>
          </fieldset>

            <p>Срок кредитования</p>
            <select id="fwhteadf" name="sdfewfwe">
              <option value="novalue" selected>Выберете цель кредита</option>
              <option value="mortgage">Ипотечное кредитование</option>
              <option value="automobile">Автомобильное кредитование</option>
              <option value="consumer">Потребительский кредит</option>
            </select>
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
      this._firstPayment = this._costOfProperty * 0.1;
      this._subscribeOnEvents();
    }

    getTemplate() {
      return createCalculationTemplate({
        costOfProperty: this._costOfProperty,
        firstPayment: this._firstPayment
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
      this._costOfProperty = this._costOfProperty;
      this._firstPayment = START_COST_OF_PROPERTY * 0.1;
      this.reRender();
    }

    _subscribeOnEvents() {
      const element = this.getElement();

      element.querySelector(`#cost-of-property`)
          .addEventListener(`change`, (evt) => {
            if (evt.target.value <= 25000000 && evt.target.value >= 1200000) {
              this._costOfProperty = evt.target.value;
              this._firstPayment = this._costOfProperty * 0.1;
              console.log(evt.target.value);
              this.reRender();
            }
          });

      element.querySelector(`form`)
          .addEventListener(`submit`, (evt) => {
            evt.preventDefault();
          });
    }
  }

  const pageOffersMenu = document.querySelector(`.page-offers-menu`);
  const calculationComponent = new Calculation();
  renderComponent(pageOffersMenu, calculationComponent, `afterEnd`);

}(decimal_js));

//# sourceMappingURL=main.js.map

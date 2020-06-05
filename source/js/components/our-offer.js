import AbstractSmartComponent from './abstract-smart-component.js';

const createOurOfferTemplate = () => {
  return (
    `<div class="page-calculation__our-offer">
      <h3>Наше предложение</h3>
      <div class="calculation__result">
        <div><p><span>1 300 000 рублей</span></br>Сумма ипотеки</p></div>
        <div><p><span>9,40%</span></br>Процентная ставка</p></div>
        <div><p><span>27 000 рублей</span></br>Ежемесячный платеж</p></div>
        <div><p><span>60 000 рублей</span></br>Необходимый доход</p></div>
      </div>
    </div>`
  );
};

export default class OurOffer extends AbstractSmartComponent {
  constructor() {
    super();
  }

  getTemplate() {
    return createOurOfferTemplate();
  }
}

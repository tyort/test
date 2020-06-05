import AbstractSmartComponent from './abstract-smart-component.js';

const createOurOfferTemplate = () => {
  return (
    `<div class="page-calculation__our-offer">
      <h3>Наше предложение</h3>
      <div class="calculation__result">
        <div><p>1 300 000 рублей</br>Сумма ипотеки</p></div>
        <div><p>9,40%</br>Процентная ставка</p></div>
        <div><p>27 000 рублей</br>Ежемесячный платеж</p></div>
        <div><p>60 000 рублей</br>Необходимый доход</p></div>
      </div>
    </div>`
  );
};

export default class OurOffer extends AbstractSmartComponent {
  getTemplate() {
    return createOurOfferTemplate();
  }
}

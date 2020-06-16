import AbstractSmartComponent from './abstract-smart-component.js';

const createOffersMenuTemplate = () => {
  return (
    `<div class="page-offers-menu">
        <div class="page-offers-menu__inner">
          <ul class="page-offers-menu__nav">
              <img src="" alt="">
          </ul>
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


export default class OffersMenu extends AbstractSmartComponent {
  constructor() {
    super();
    this._subscribeOnEvents();
  }

  getTemplate() {
    return createOffersMenuTemplate();
  }

  _subscribeOnEvents() {}
}



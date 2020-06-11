import AbstractSmartComponent from './abstract-smart-component.js';

const createOffersMenuTemplate = () => {
  return (
    `<div class="page-offers-menu">
      <div class="container">
        <div class="page-offers-menu__inner">
        </div>
      </div>
    </div>`);
};


export default class OffersMenu extends AbstractSmartComponent {
  constructor() {
    super();
  }

  getTemplate() {
    return createOffersMenuTemplate();
  }
}



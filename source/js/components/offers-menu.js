import AbstractSmartComponent from './abstract-smart-component.js';

const createOffersMenuTemplate = () => {
  return (
    `<div class="page-offers-menu">
        <div class="page-offers-menu__inner">
          <ul class="page-offers-menu__nav">
            <li></li>
            <li></li>
            <li></li>
            <li></li>
          </ul>
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



import AbstractSmartComponent from './abstract-smart-component.js';

const createHeaderTemplate = (isElementHidden) => {
  const doesElementHide = isElementHidden ? `visually-hidden` : ``;
  return (
    `<div class="page-request-popup ${doesElementHide}">
      <div class="page-request-popup__inner">
        
      </div>
    </div>`
  );
};

export default class Header extends AbstractSmartComponent {
  constructor() {
    super();
    this._callRequest = null;
    this._isElementHidden = true;
    this._subscribeOnEvents();
  }

  getTemplate() {
    return createHeaderTemplate(this._isElementHidden);
  }

  recoveryListeners() {
    this._subscribeOnEvents();
  }

  reRender(properties) {
    const element = this.getElement();
    this._isElementHidden = properties.isPopupHidden;
    element.classList.toggle(`visually-hidden`, false);
  }

  _subscribeOnEvents() {
    // const element = this.getElement();
  }
}

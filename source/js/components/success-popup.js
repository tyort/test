import AbstractSmartComponent from './abstract-smart-component.js';

const createSuccessTemplate = () => {
  return (
    `<div class="page-success-popup visually-hidden">
      <div class="page-success-popup__inner">
        <a href="#" class="popup__close"></a>

        <img src="./img/icon-ok.png" alt="логотип успеха" width="71" height="64">

        <h3>Заявка принята</h3>

        <p>Мы приняли ваши данные и вскоре мы перезвоним
          вам для уточнения деталей!</p>

        <button>Понятно</button>
        
      </div>
    </div>`
  );
};

export default class Success extends AbstractSmartComponent {
  constructor() {
    super();
    this._onEscKeyDown = this._onEscKeyDown.bind(this);
    this._subscribeOnEvents();
  }

  getTemplate() {
    return createSuccessTemplate();
  }

  showElement() {
    const element = this.getElement();
    element.classList.toggle(`visually-hidden`, false);
    document.addEventListener(`keydown`, this._onEscKeyDown);
  }

  hideElement() {
    const element = this.getElement();

    element.classList.toggle(`visually-hidden`, true);
    document.querySelector(`body`).style.overflow = `visible`;
    document.removeEventListener(`keydown`, this._onEscKeyDown);
  }

  _subscribeOnEvents() {
    const element = this.getElement();

    document.addEventListener(`keydown`, this._onEscKeyDown);

    element.addEventListener(`click`, (evt) => {
      if (evt.target === element || evt.target.className === `popup__close` || evt.target.tagName === `BUTTON`) {
        this.hideElement();

      } else if (evt.target.className === `page-success-popup__inner`) {
        evt.stopPropagation();
      }
    });
  }

  _onEscKeyDown(evt) {
    if (evt.key === `Escape` || evt.key === `Esc`) {
      this.hideElement();
    }
  }
}

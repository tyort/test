import AbstractSmartComponent from './abstract-smart-component.js';
import {catalogueItems, ProgramsDescriptions} from '../formulas.js';


const createItemsDescriptions = (currentProgram) => {
  return catalogueItems
      .map((program, index) => {
        const isElementHidden = program[0] === currentProgram ? `` : `visually-hidden`;
        const addition = program[0] === `Академические`
          ? `<p>${ProgramsDescriptions[5]}</p>`
          : ``;

        return (
          `<li class="catalogue-details__item-description ${isElementHidden}">
            <h3>${program[0]}</h3>
            <p>${ProgramsDescriptions[index]}</p>
            ${addition}
          </li>`
        );
      })
      .join(``);
};

const createItemsButtons = (currentProgram) => {
  return catalogueItems
      .map((program) => {
        const isElementColorful = program[0] === currentProgram
          ? `linear-gradient(108.42deg, #FFC341 20.46%, #FFD701 65.31%)`
          : `#FFFFFF`;

        return (
          `<li>
            <button class="catalogue-details__item ${program[1]}" style="background: ${isElementColorful}" tabindex="0">
              ${program[0]}
            </button>
          </li>`
        );
      })
      .join(``);
};


const createCatalogueTemplate = (currentProgram) => {

  return (
    `<div class="page-catalogue">
      <div class="page-catalogue__inner">
        <h2>Программы</h2>

        <div class="block"></div>

        <div class="catalogue-details">
          <ul class="catalogue-details__list">
            ${createItemsButtons(currentProgram)}
          </ul>
          <ul class="catalogue-details__descriptions">
            ${createItemsDescriptions(currentProgram)}
          </ul>
        </div>
      </div>
    </div>`
  );
};

export default class Catalogue extends AbstractSmartComponent {
  constructor() {
    super();
    this._currentItem = `Академические`;
    this._subscribeOnEvents();
  }

  getTemplate() {
    return createCatalogueTemplate(this._currentItem);
  }

  recoveryListeners() {
    this._subscribeOnEvents();
  }

  reRender() {
    super.reRender();
  }

  _subscribeOnEvents() {
    const element = this.getElement();
    const list = element.querySelector(`.catalogue-details__list`);

    list.addEventListener(`click`, (evt) => {
      if (this._currentItem === evt.target.textContent.trim() || !evt.target.classList.contains(`catalogue-details__item`)) {
        return;
      }

      this._currentItem = evt.target.textContent.trim();
      this.reRender();
    });
  }
}

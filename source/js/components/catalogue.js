import AbstractSmartComponent from './abstract-smart-component.js';
import {catalogueItems, ProgramsDescriptions} from '../formulas.js';


const createItemDescription = (currentProgram) => {
  return catalogueItems
      .map((program, index) => {
        const isElementHidden = program[0] === currentProgram ? `` : `visually-hidden`;
        return (
          `<li class="catalogue-details__item-description ${isElementHidden}">
            <h3>${program[0]}</h3>
            <p>${ProgramsDescriptions[index]}</p>
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
        <div class="catalogue-details">
          <ul class="catalogue-details__list">
            <li class="catalogue-details__item">
              <svg width="28" height="33">
                <use xlink:href="img/sprite_auto.svg#icon-star"></use>
              </svg>
              Общие
            </li>
            <li class="catalogue-details__item">
              <svg width="36" height="35">
                <use xlink:href="img/sprite_auto.svg#icon-cap"></use>
              </svg>
              Академические
            </li>
            <li class="catalogue-details__item">
              <svg width="32" height="25">
                <use xlink:href="img/sprite_auto.svg#icon-portfolio"></use>
              </svg>
              Стажировки
            </li>
            <li class="catalogue-details__item">
              <svg width="32" height="29">
                <use xlink:href="img/sprite_auto.svg#icon-heart"></use>
              </svg>
              Волонтёрство
            </li>
            <li class="catalogue-details__item">
              <svg width="28" height="33">
                <use xlink:href="img/sprite_auto.svg#icon-candles"></use>
              </svg>
              Религиозные
            </li>
          </ul>
          <div class="catalogue-details__descriptions">
            ${createItemDescription(currentProgram)}
          </div>
        </div>
      </div>
    </div>`
  );
};

export default class Catalogue extends AbstractSmartComponent {
  constructor() {
    super();
    this._currentItem = `Общие`;
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
      if (this._currentItem === evt.target.textContent.trim()) {
        return;
      }
      this._currentItem = evt.target.textContent.trim();
      this.reRender();
    });
  }
}

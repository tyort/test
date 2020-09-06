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
        const isButtonChecked = program[0] === currentProgram
          ? `btn__isChecked`
          : ``;

        return (
          `<li>
            <button class="catalogue-details__item ${program[1]} ${isButtonChecked}">
              ${program[0]}
            </button>
          </li>`
        );
      })
      .join(``);
};

const createItemsButtonsMobile = () => {
  return catalogueItems
      .map((program) => {
        return (
          `<li>
            <button class="catalogue-details__item ${program[1]}">
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

        <div class="catalogue-details">
          <ul class="catalogue-details__list ${window.innerWidth >= 768 ? `` : `visually-hidden`}">
            ${createItemsButtons(currentProgram)}
          </ul>
          <ul class="catalogue-details__list catalogue-details__list--mobile ${window.innerWidth >= 768 ? `visually-hidden` : ``}">
            ${createItemsButtonsMobile()}
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
    this._currentItem = `Общие`;
    this._getInitSlider();
    this._onButtonClick = this._onButtonClick.bind(this);
    this._subscribeOnEvents();
  }

  getTemplate() {
    return createCatalogueTemplate(this._currentItem);
  }

  _getInitSlider() {
    window.$(document).ready(() => {
      window.$(`.catalogue-details__list--mobile`).slick({
        dots: false,
        infinite: true,
        speed: 300,
        slidesToShow: 1,
        centerMode: true,
        variableWidth: false,
        swipe: true,
        focusOnSelect: true,
        centerPadding: `20%`,
        responsive: [
          {
            breakpoint: 768,
            settings: {
              arrows: false,
            }
          }
        ]
      });

      window.$(`.catalogue-details__list--mobile`).on(`afterChange`, (event, slick, _currentSlide) => {
        const activeButton = [...slick.$slides].find((it) => {
          return it.classList.contains(`slick-active`);
        });

        activeButton.querySelector(`button`).textContent.trim();
        this._currentItem = activeButton.querySelector(`button`).textContent.trim();

        this.reRender();
      });
    });
  }

  recoveryListeners() {
    this._subscribeOnEvents();
  }

  reRender() {
    const element = this.getElement();

    const list = element.querySelector(`.catalogue-details__list`);
    list.innerHTML = createItemsButtons(this._currentItem);

    const actualDescriptions = element.querySelector(`.catalogue-details__descriptions`);
    actualDescriptions.innerHTML = createItemsDescriptions(this._currentItem);
  }

  _subscribeOnEvents() {
    const element = this.getElement();
    const list = element.querySelector(`.catalogue-details__list`);
    const listMobile = element.querySelector(`.catalogue-details__list--mobile`);

    list.addEventListener(`click`, this._onButtonClick);

    window.addEventListener(`resize`, () => {
      if (window.innerWidth >= 768) {
        list.classList.toggle(`visually-hidden`, false);
        listMobile.classList.toggle(`visually-hidden`, true);

      } else {
        list.classList.toggle(`visually-hidden`, true);
        listMobile.classList.toggle(`visually-hidden`, false);
      }
    });
  }


  _onButtonClick(evt) {
    if (this._currentItem === evt.target.textContent.trim() || !evt.target.classList.contains(`catalogue-details__item`)) {
      return;
    }

    this._currentItem = evt.target.textContent.trim();
    this.reRender();
  }
}

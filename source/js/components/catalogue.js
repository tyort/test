import AbstractComponent from './abstract-component.js';

const createCatalogueTemplate = () =>
  (
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
          <div class="catalogue-details__description">
          </div>
        </div>
      </div>
    </div>`
  );

export default class Catalogue extends AbstractComponent {
  getTemplate() {
    return createCatalogueTemplate();
  }
}

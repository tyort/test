import AbstractComponent from './abstract-component.js';

const createHeaderTemplate = () =>
  (
    `<div class="page-header">
      <div class="page-header__inner">
      </div>
    </div>`
  );

export default class Header extends AbstractComponent {
  getTemplate() {
    return createHeaderTemplate();
  }
}

import AbstractComponent from './abstract-component.js';

const createPageCalculationTemplate = () => {
  return (
    `<div class="page-calculation">
    </div>`
  );
};

export default class PageCalculation extends AbstractComponent {
  getTemplate() {
    return createPageCalculationTemplate();
  }
}

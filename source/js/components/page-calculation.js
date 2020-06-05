import AbstractComponent from './abstract-component.js';

const createPageCalculationTemplate = () => {
  return (
    `<div class="page-calculation">
      <h2>Кредитный калькулятор</h2>
    </div>`
  );
};

export default class PageCalculation extends AbstractComponent {
  getTemplate() {
    return createPageCalculationTemplate();
  }
}

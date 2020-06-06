import AbstractSmartComponent from './abstract-smart-component.js';

const createStepThreeTemplate = () => {
  return (`
  
  `);
};


export default class StepThree extends AbstractSmartComponent {
  constructor() {
    super();
  }

  getTemplate() {
    return createStepThreeTemplate();
  }
}

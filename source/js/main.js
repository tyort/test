import OurOfferComponent from "./components/our-offer.js";
import CalculationComponent from "./components/calculation.js";
import PageCalculationComponent from "./components/page-calculation.js";

import {renderComponent} from './formulas.js';

const pageCalculationComponent = new PageCalculationComponent();
const calculationComponent = new CalculationComponent();
const ourOfferComponent = new OurOfferComponent();

const pageOffersMenu = document.querySelector(`.page-offers-menu`);
renderComponent(pageOffersMenu, pageCalculationComponent, `afterEnd`);

const pageCalculation = document.querySelector(`.page-calculation`);
renderComponent(pageCalculation, calculationComponent);
const titleName = pageCalculation.querySelector(`h2`);
renderComponent(titleName, ourOfferComponent, `afterEnd`);

const parseFormData = (formData) => {
  let propertyCost = formData.get(`cost-of-property`);
  propertyCost = Number(propertyCost.slice(0, propertyCost.length - 7));
  let firstPayment = formData.get(`first-payment`);
  firstPayment = Number(firstPayment.slice(0, firstPayment.length - 7));
  let firstPayPercent = document.querySelector(`.percent-slider`).querySelector(`output`).textContent;
  firstPayPercent = Number(firstPayPercent.slice(0, firstPayPercent.length - 1));
  let yearsCount = document.querySelector(`.years-slider`).querySelector(`output`).textContent;
  yearsCount = Number(yearsCount.slice(0, yearsCount.length - 3));
  const isMotherUsed = document.querySelector(`#mothers-capital__input`).hasAttribute(`checked`);

  return {
    'creditType': formData.get(`credit-type`),
    propertyCost,
    firstPayment,
    firstPayPercent,
    yearsCount,
    isMotherUsed
  };
};

calculationComponent.setCalculateResultHandler(() => {
  const formData = calculationComponent.getChangedDataByView();
  let viewInformation = parseFormData(formData);
  ourOfferComponent.reRender(viewInformation);
});


import OurOfferComponent from "./components/our-offer.js";
import CalculationComponent from "./components/calculation.js";
import PageCalculationComponent from "./components/page-calculation.js";
import RequestComponent from "./components/request.js";
import {renderComponent} from './formulas.js';

const pageCalculationComponent = new PageCalculationComponent();
const calculationComponent = new CalculationComponent();
const ourOfferComponent = new OurOfferComponent();
const requestComponent = new RequestComponent();

const pageOffersMenu = document.querySelector(`.page-offers-menu`);
renderComponent(pageOffersMenu, pageCalculationComponent, `afterEnd`);

const pageCalculation = document.querySelector(`.page-calculation`);
renderComponent(pageCalculation, calculationComponent);
const titleName = pageCalculation.querySelector(`h2`);
renderComponent(titleName, ourOfferComponent, `afterEnd`);

const pageCalculationParameters = document.querySelector(`.page-calculation__parameters`);
renderComponent(pageCalculationParameters, requestComponent, `afterEnd`);

const parseFormData = (formData) => {
  let propertyCost = formData.get(`cost-of-property`);
  propertyCost = Number(propertyCost.slice(0, propertyCost.length - 7));
  let firstPayment = formData.get(`first-payment`);
  firstPayment = firstPayment
    ? Number(firstPayment.slice(0, firstPayment.length - 7))
    : null;

  let firstPayPercent = null;
  if (document.querySelector(`.percent-slider`) !== null) {
    firstPayPercent = document.querySelector(`.percent-slider`).querySelector(`output`).textContent;
    firstPayPercent = Number(firstPayPercent.slice(0, firstPayPercent.length - 1));
  }

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

let viewInformation = {};

calculationComponent.setCalculateResultHandler(() => {
  const formData = calculationComponent.getChangedDataByView();
  viewInformation = parseFormData(formData);
  ourOfferComponent.reRender(viewInformation);
  requestComponent.reRender(Object.assign({}, viewInformation, {isRequestHidden: true}));
});

ourOfferComponent.setCreateRequestHandler(() => {
  requestComponent.reRender(Object.assign({}, viewInformation, {isRequestHidden: false}));
});


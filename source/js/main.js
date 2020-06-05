import CalculationComponent from "./components/calculation.js";
import OurOfferComponent from "./components/our-offer.js";
import {renderComponent} from "./formulas.js";


const calculationComponent = new CalculationComponent();
const ourOfferComponent = new OurOfferComponent();

const pageOffersMenu = document.querySelector(`.page-offers-menu`);
renderComponent(pageOffersMenu, calculationComponent, `afterEnd`);

const pageCalculation = document.querySelector(`.page-calculation`);
renderComponent(pageCalculation, ourOfferComponent, `afterBegin`);

calculationComponent.setCalculateResultHandler(() => {
  console.log(`Привет`);
  ourOfferComponent.reRender();
  // const formData = calculationComponent.getChangedDataByView();
  // let pointModel = parseFormData(formData);
});


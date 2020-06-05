import CalculationComponent from "./components/calculation.js";
import OurOfferComponent from "./components/our-offer.js";
import {renderComponent} from "./formulas.js";


const calculationComponent = new CalculationComponent();
const ourOfferComponent = new OurOfferComponent();

const pageOffersMenu = document.querySelector(`.page-offers-menu`);
renderComponent(pageOffersMenu, calculationComponent, `afterEnd`);

const calculationFirstStep = document.querySelector(`.page-calculation__first-step`);
renderComponent(calculationFirstStep, ourOfferComponent, `afterEnd`);



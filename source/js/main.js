import CalculationComponent from "./components/calculation.js";
import {renderComponent} from "./formulas.js";

const pageOffersMenu = document.querySelector(`.page-offers-menu`);
const calculationComponent = new CalculationComponent();
renderComponent(pageOffersMenu, calculationComponent, `afterEnd`);


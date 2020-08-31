import Catalogue from "./components/catalogue";
import {renderComponent} from './formulas.js';


const main = document.querySelector(`main`);
const catalogue = new Catalogue();
renderComponent(main, catalogue);

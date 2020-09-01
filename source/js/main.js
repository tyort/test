import Catalogue from "./components/catalogue";
import Header from "./components/header";
import Desire from "./components/desire";
import {renderComponent} from './formulas.js';


const body = document.querySelector(`body`);
const main = document.querySelector(`main`);
const catalogue = new Catalogue();
const header = new Header();
const desire = new Desire();
renderComponent(body, header, `afterBegin`);
renderComponent(main, catalogue);
renderComponent(main, desire);

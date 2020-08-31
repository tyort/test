import Catalogue from "./components/catalogue";
import Header from "./components/header";
import {renderComponent} from './formulas.js';


const body = document.querySelector(`body`);
const main = document.querySelector(`main`);
const catalogue = new Catalogue();
const header = new Header();
renderComponent(body, header, `afterBegin`);
renderComponent(main, catalogue);

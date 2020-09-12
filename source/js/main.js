import Catalogue from "./components/catalogue";
import './components/desire';
import './components/details';
import './components/popups';
import './components/live';
import './components/questions';
import './components/reviews';
import {renderComponent} from './formulas.js';

const body = document.querySelector(`body`);
const about = body.querySelector(`.page-about`);
const catalogue = new Catalogue();
renderComponent(about, catalogue, `afterEnd`);



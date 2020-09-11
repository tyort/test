import Catalogue from "./components/catalogue";
import Desire from "./components/desire";
// import Feedback from "./components/feedback";
import "./components/popups";
import './components/live';
import './components/questions';
import './components/reviews';
import {renderComponent} from './formulas.js';

const body = document.querySelector(`body`);
const about = body.querySelector(`.page-about`);
const catalogue = new Catalogue();
const desire = new Desire();
// const feedback = new Feedback();
renderComponent(about, desire, `afterEnd`);
renderComponent(about, catalogue, `afterEnd`);
// renderComponent(main, feedback);



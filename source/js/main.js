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

const requestPopup = document.querySelector(`.page-request-popup`);
const successPopup = document.querySelector(`.page-success-popup`);

window.addEventListener(`resize`, () => {
  if (window.innerWidth >= 768) {
    if (!requestPopup.classList.contains(`visually-hidden`) || !successPopup.classList.contains(`visually-hidden`)) {
      body.style.overflow = `hidden`;
    }

  } else if (window.innerWidth < 768) {
    if (!requestPopup.classList.contains(`visually-hidden`) || !successPopup.classList.contains(`visually-hidden`)) {
      body.style.overflow = `visible`;
    }
  }
});



import Catalogue from "./components/catalogue";
import Header from "./components/header";
import Desire from "./components/desire";
import Feedback from "./components/feedback";
import CallRequest from "./components/call-request";
import SuccessPopup from "./components/success-popup";
import {renderComponent} from './formulas.js';


const body = document.querySelector(`body`);
const main = document.querySelector(`main`);
const catalogue = new Catalogue();
const header = new Header();
const desire = new Desire();
const feedback = new Feedback();
const callRequest = new CallRequest();
const successPopup = new SuccessPopup();
renderComponent(body, header, `afterBegin`);
// renderComponent(main, catalogue);
// renderComponent(main, desire);
// renderComponent(main, feedback);
renderComponent(body, callRequest, `afterBegin`);
renderComponent(body, successPopup, `afterBegin`);

header.setCallRequestHandler(() => {
  callRequest.showElement();
  if (window.innerWidth >= 728) {
    body.style.overflow = `hidden`;
  }
});

callRequest.setSuccessPopupHandler(() => {
  successPopup.showElement();
  if (window.innerWidth >= 728) {
    body.style.overflow = `hidden`;
  }
});

window.addEventListener(`resize`, () => {
  if (window.innerWidth >= 728) {
    if (!callRequest.getElement().classList.contains(`visually-hidden`) || !successPopup.getElement().classList.contains(`visually-hidden`)) {
      body.style.overflow = `hidden`;
    }

  } else if (window.innerWidth < 728) {
    if (!callRequest.getElement().classList.contains(`visually-hidden`) || !successPopup.getElement().classList.contains(`visually-hidden`)) {
      body.style.overflow = `visible`;
    }
  }
});


import OurOfferComponent from "./components/our-offer.js";
import CalculationComponent from "./components/calculation.js";
import PageCalculationComponent from "./components/page-calculation.js";
import MapComponent from "./components/map.js";
import OffersMenuComponent from "./components/offers-menu.js";
import RequestComponent from "./components/request.js";
import PopupGratitudeComponent from "./components/popup-gratitude.js";
import RegistrationComponent from "./components/popup-registration.js";
import HeaderComponent from "./components/header.js";
import PresentationComponent from "./components/presentation.js";
import {renderComponent, getTransformedLine, creditTypes} from './formulas.js';

const headerComponent = new HeaderComponent();
const pageCalculationComponent = new PageCalculationComponent();
const calculationComponent = new CalculationComponent();
const ourOfferComponent = new OurOfferComponent();
const requestComponent = new RequestComponent();
const mapComponent = new MapComponent();
const offersMenuComponent = new OffersMenuComponent();
const popupGratitudeComponent = new PopupGratitudeComponent();
const registrationComponent = new RegistrationComponent();
const presentationComponent = new PresentationComponent();

renderComponent(document.querySelector(`.page-content__inner`), headerComponent, `afterBegin`);
renderComponent(document.querySelector(`.page-content__inner`), popupGratitudeComponent);
renderComponent(document.querySelector(`.page-content__inner`), registrationComponent);

const pageHeader = document.querySelector(`.page-header`);
renderComponent(pageHeader, presentationComponent, `afterEnd`);

const pagePresentation = document.querySelector(`.page-presentation`);
renderComponent(pagePresentation, offersMenuComponent, `afterEnd`);

const pageOffersMenu = document.querySelector(`.page-offers-menu`);
renderComponent(pageOffersMenu, pageCalculationComponent, `afterEnd`);

const pageCalculation = document.querySelector(`.page-calculation`);
renderComponent(pageCalculation, calculationComponent);
renderComponent(pageCalculation, ourOfferComponent);
renderComponent(pageCalculation, mapComponent, `afterEnd`);
renderComponent(pageCalculation, requestComponent, `afterEnd`);

const parseFormData = (formData) => {
  let propertyCost = formData.get(`cost-of-property`);
  propertyCost = getTransformedLine(propertyCost.slice(0, propertyCost.length - 7));

  let firstPayment = formData.get(`first-payment`);
  firstPayment = firstPayment
    ? getTransformedLine(firstPayment.slice(0, firstPayment.length - 7))
    : null;

  let firstPayPercent = null;
  if (document.querySelector(`.percent-slider`)) {
    firstPayPercent = document.querySelector(`.percent-slider`).querySelector(`output`).textContent;
    firstPayPercent = Number(firstPayPercent.slice(0, firstPayPercent.length - 1));
  }

  let yearsCount = document.querySelector(`.years-slider`).querySelector(`output`).textContent;
  yearsCount = Number(yearsCount.slice(0, yearsCount.length - 3));

  const isBonusUsed = document.querySelector(`#bonus__input`)
    ? document.querySelector(`#bonus__input`).hasAttribute(`checked`)
    : null;

  const isKaskoUsed = document.querySelector(`#kasko__input`)
    ? document.querySelector(`#kasko__input`).hasAttribute(`checked`)
    : null;

  const isInsuranceUsed = document.querySelector(`#insurance__input`)
    ? document.querySelector(`#insurance__input`).hasAttribute(`checked`)
    : null;

  const isParticipantUsed = document.querySelector(`#participant__input`)
    ? document.querySelector(`#participant__input`).hasAttribute(`checked`)
    : null;

  let creditType = document.querySelector(`.undisclosed-list`).textContent.trim();
  creditType = creditTypes.find((it) => it[1] === creditType)[0];

  return {
    creditType,
    propertyCost,
    firstPayment,
    firstPayPercent,
    yearsCount,
    isBonusUsed,
    isKaskoUsed,
    isInsuranceUsed,
    isParticipantUsed
  };
};

let viewInformation = {};

calculationComponent.setCalculateResultHandler(() => {
  const formData = calculationComponent.getChangedDataByView();
  viewInformation = parseFormData(formData);
  ourOfferComponent.reRender(viewInformation);
  requestComponent.reRender(Object.assign({}, viewInformation, {isRequestHidden: true}));
});

ourOfferComponent.setCreateRequestHandler(() => {
  requestComponent.reRender(Object.assign({}, viewInformation, {isRequestHidden: false}));
});

requestComponent.setShowPopupHandler(() => {
  popupGratitudeComponent.reRender({isPopupHidden: false});
});

popupGratitudeComponent.setShowRequestHandler(() => {
  requestComponent.reRender(Object.assign({}, viewInformation, {isRequestHidden: true}));
});

headerComponent.setShowRegistrationHandler(() => {
  registrationComponent.reRender({isPopupHidden: false});
});



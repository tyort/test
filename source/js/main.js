import OurOfferComponent from "./components/our-offer.js";
import CalculationComponent from "./components/calculation.js";
import PageCalculationComponent from "./components/page-calculation.js";
import MapComponent from "./components/map.js";
import OffersMenuComponent from "./components/offers-menu.js";
import RequestComponent from "./components/request.js";
import PopupGratitudeComponent from "./components/popup-gratitude.js";
import {renderComponent} from './formulas.js';

const pageCalculationComponent = new PageCalculationComponent();
const calculationComponent = new CalculationComponent();
const ourOfferComponent = new OurOfferComponent();
const requestComponent = new RequestComponent();
const mapComponent = new MapComponent();
const offersMenuComponent = new OffersMenuComponent();
const popupGratitudeComponent = new PopupGratitudeComponent();

renderComponent(document.querySelector(`body`), popupGratitudeComponent);

const promo = document.querySelector(`.page-promo`);
renderComponent(promo, offersMenuComponent, `afterEnd`);

const pageOffersMenu = document.querySelector(`.page-offers-menu`);
renderComponent(pageOffersMenu, pageCalculationComponent, `afterEnd`);

const pageCalculation = document.querySelector(`.page-calculation`);
renderComponent(pageCalculation, calculationComponent);
const titleName = pageCalculation.querySelector(`h2`);
renderComponent(titleName, ourOfferComponent, `afterEnd`);

const pageCalculationParameters = document.querySelector(`.page-calculation__parameters`);
renderComponent(pageCalculationParameters, requestComponent, `afterEnd`);

renderComponent(pageCalculation, mapComponent, `afterEnd`);

const parseFormData = (formData) => {
  let propertyCost = formData.get(`cost-of-property`);
  propertyCost = Number(propertyCost.slice(0, propertyCost.length - 7));
  let firstPayment = formData.get(`first-payment`);
  firstPayment = firstPayment
    ? Number(firstPayment.slice(0, firstPayment.length - 7))
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

  return {
    'creditType': formData.get(`credit-type`),
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



export const catalogueItems = [
  [`Общие`, `item-star`],
  [`Академические`, `item-cap`],
  [`Стажировки`, `item-portfolio`],
  [`Волонтёрство`, `item-heart`],
  [`Религиозные`, `item-candles`],
];

export const renderComponent = (container, element, place) => {
  switch (place) {
    case `afterBegin`:
      container.prepend(element.getElement());
      break;
    case `afterEnd`:
      container.after(element.getElement());
      break;
    default:
      container.append(element.getElement());
  }
};

export const createElement = (template) => {
  const newElement = document.createElement(`div`);
  newElement.innerHTML = template;
  return newElement.firstChild;
};

export const onEscKeyDown = (evt) => {
  if (evt.key === `Escape` || evt.key === `Esc`) {
    hideElement();
  }
};

export const hideElement = () => {
  const requestPopup = document.querySelector(`.page-request-popup`);
  const successPopup = document.querySelector(`.page-success-popup`);

  successPopup.classList.toggle(`visually-hidden`, true);
  requestPopup.classList.toggle(`visually-hidden`, true);
  document.removeEventListener(`keydown`, onEscKeyDown);
  document.querySelector(`body`).style.overflow = `visible`;
};

export const phoneSample = /^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/;
export const nameSample = /^[a-zA-Zа-яёА-ЯЁ]+$/u;

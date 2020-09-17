(function () {
  'use strict';

  const programs = document.querySelector(`.page-catalogue`);
  const list = programs.querySelector(`.catalogue-details__list`);
  const listMobile = programs.querySelector(`.catalogue-details__list--mobile`);
  const actualDescriptions = programs.querySelector(`.catalogue-details__descriptions`);
  let CURRENT_ITEM = `Общие`;

  window.$(document).ready(() => {
    window.$(`.catalogue-details__list--mobile`).slick({
      dots: false,
      infinite: true,
      speed: 300,
      slidesToShow: 1,
      centerMode: true,
      variableWidth: false,
      swipe: true,
      focusOnSelect: true,
      centerPadding: `21%`,
      responsive: [
        {
          breakpoint: 768,
          settings: {
            arrows: false,
          }
        }
      ]
    });

    window.$(`.catalogue-details__list--mobile`).on(`afterChange`, (event, slick, _currentSlide) => {
      const activeButton = [...slick.$slides].find((it) => {
        return it.classList.contains(`slick-active`);
      });

      activeButton.querySelector(`button`).textContent.trim();
      CURRENT_ITEM = activeButton.querySelector(`button`).textContent.trim();
      reRender();
    });
  });

  list.addEventListener(`click`, onButtonClick);

  document.addEventListener(`DOMContentLoaded`, () => {
    if (window.innerWidth >= 768) {
      list.classList.toggle(`visually-hidden`, false);
      listMobile.classList.toggle(`visually-hidden`, true);

    } else {
      list.classList.toggle(`visually-hidden`, true);
      listMobile.classList.toggle(`visually-hidden`, false);
    }
  });

  window.addEventListener(`resize`, () => {
    if (window.innerWidth >= 768) {
      list.classList.toggle(`visually-hidden`, false);
      listMobile.classList.toggle(`visually-hidden`, true);

    } else {
      list.classList.toggle(`visually-hidden`, true);
      listMobile.classList.toggle(`visually-hidden`, false);
    }
  });

  const createItemsDescriptions = (currentProgram) => {
    [...actualDescriptions.children].forEach((item) => {
      item.classList.toggle(`visually-hidden`, true);
      if (item.querySelector(`h3`).textContent.trim() === currentProgram) {
        item.classList.toggle(`visually-hidden`, false);
      }
    });
  };

  const createItemsButtons = (currentProgram) => {
    [...list.children].forEach((item) => {
      item.querySelector(`button`).classList.toggle(`btn-isChecked`, false);
      if (item.querySelector(`button`).textContent.trim() === currentProgram) {
        item.querySelector(`button`).classList.toggle(`btn-isChecked`, true);
      }
    });
  };

  function onButtonClick(evt) {
    if (CURRENT_ITEM !== evt.target.textContent.trim() && evt.target.classList.contains(`catalogue-details__item`)) {
      CURRENT_ITEM = evt.target.textContent.trim();
      reRender();
    }
  }

  function reRender() {
    createItemsButtons(CURRENT_ITEM);
    createItemsDescriptions(CURRENT_ITEM);
  }

  class LocalStorageUtil {
    constructor() {
      this.keyName = `clients`;
    }

    getClients() {
      const clients = localStorage.getItem(this.keyName);
      if (clients !== null) {
        return JSON.parse(clients);
      }
      return [];
    }

    putClient(clientInformation) {
      const clients = this.getClients();
      const index = clients.findIndex((it) => it[`Phone number`] === clientInformation[`Phone number`]);

      if (index === -1) {
        clients.push(clientInformation);

      } else {
        clients.splice(index, 1, clientInformation);
      }

      localStorage.setItem(this.keyName, JSON.stringify(clients));
    }
  }

  const onEscKeyDown = (evt) => {
    if (evt.key === `Escape` || evt.key === `Esc`) {
      hideElement();
    }
  };

  const hideElement = () => {
    const requestPopup = document.querySelector(`.page-request-popup`);
    const successPopup = document.querySelector(`.page-success-popup`);

    successPopup.classList.toggle(`visually-hidden`, true);
    requestPopup.classList.toggle(`visually-hidden`, true);
    document.removeEventListener(`keydown`, onEscKeyDown);
    document.querySelector(`body`).style.overflow = `visible`;
  };

  const phoneSample = /^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/;
  const nameSample = /^[a-zA-Zа-яёА-ЯЁ]+$/u;

  const body = document.querySelector(`body`);
  const pageDesire = document.querySelector(`.page-desire`);
  const form = pageDesire.querySelector(`form`);
  const successPopup = document.querySelector(`.page-success-popup`);

  const clientsStorage = new LocalStorageUtil();

  form.addEventListener(`input`, (evt) => {
    if (!phoneSample.test(evt.target.value)) {
      evt.target.setCustomValidity(`Напиши номер правильно`);

    } else {
      evt.target.setCustomValidity(``);
    }
  });

  form.addEventListener(`submit`, (evt) => {
    evt.preventDefault();

    clientsStorage.putClient({
      'Full name': Date.now().toString(),
      'Phone number': form.querySelector(`.block-phone`).value.toString(),
    });

    hideElement();
    form.reset();

    successPopup.classList.toggle(`visually-hidden`, false);
    document.addEventListener(`keydown`, onEscKeyDown);
    body.style.overflow = `hidden`;
  });

  const body$1 = document.querySelector(`body`);
  const pageFeedback = document.querySelector(`.page-details__feedback`);
  const form$1 = pageFeedback.querySelector(`form`);
  const successPopup$1 = document.querySelector(`.page-success-popup`);

  const clientsStorage$1 = new LocalStorageUtil();

  window.addEventListener(`mapWasLoaded`, () => {
    window.ymaps.ready(init);
  });

  form$1.addEventListener(`submit`, (evt) => {
    evt.preventDefault();

    clientsStorage$1.putClient({
      'Full name': form$1.querySelector(`.block-name`).value,
      'Phone number': form$1.querySelector(`.block-phone`).value.toString(),
    });

    hideElement();
    form$1.reset();

    successPopup$1.classList.toggle(`visually-hidden`, false);
    document.addEventListener(`keydown`, onEscKeyDown);
    body$1.style.overflow = `hidden`;
  });

  form$1.addEventListener(`input`, (evt) => {
    if (evt.target.className === `block-phone`) {
      if (!phoneSample.test(evt.target.value)) {
        evt.target.setCustomValidity(`Напиши номер правильно`);

      } else {
        evt.target.setCustomValidity(``);
      }

    } else if (evt.target.className === `block-name`) {
      if (!nameSample.test(evt.target.value)) {
        evt.target.setCustomValidity(`Напиши ФИО правильно`);

      } else {
        evt.target.setCustomValidity(``);
      }
    }
  });

  function init() {
    let myMap = new window.ymaps.Map(`YMapsID`, {
      center: [55.028723, 82.926924],
      zoom: 18,
    }, {
      searchControlProvider: `yandex#search`
    });

    const myPlacemark = new window.ymaps.Placemark([55.028522, 82.928281], {
      hintContent: `Адрес куратора`,
    }, {
      iconLayout: `default#image`,
      iconImageHref: `img/icon-map-marker.png`,
      iconImageSize: [18, 28],
      iconImageOffset: [-9, -28],
    });

    myMap.geoObjects
        .add(myPlacemark);
  }

  const body$2 = document.querySelector(`body`);
  const pageHeader = document.querySelector(`.page-header`);
  const requestPopup = document.querySelector(`.page-request-popup`);
  const successPopup$2 = document.querySelector(`.page-success-popup`);
  const form$2 = requestPopup.querySelector(`form`);
  const agreement = requestPopup.querySelector(`.field-agreement`);
  const btn = requestPopup.querySelector(`button`);

  const clientsStorage$2 = new LocalStorageUtil();

  pageHeader.querySelector(`.page-header__btn`)
      .addEventListener(`click`, () => {
        requestPopup.classList.toggle(`visually-hidden`, false);
        document.addEventListener(`keydown`, onEscKeyDown);
        body$2.style.overflow = `hidden`;
      });

  requestPopup.addEventListener(`click`, (evt) => {
    if (evt.target === requestPopup || evt.target.className === `popup-close`) {
      hideElement();
    } else if (evt.target.className === `page-request-popup__inner`) {
      evt.stopPropagation();
    }
  });

  form$2.addEventListener(`submit`, (evt) => {
    evt.preventDefault();

    clientsStorage$2.putClient({
      'Full name': form$2.querySelector(`.block-name`).value,
      'Phone number': form$2.querySelector(`.block-phone`).value.toString(),
    });

    hideElement();
    form$2.reset();

    if (!btn.hasAttribute(`disabled`)) {
      btn.setAttribute(`disabled`, `disabled`);
    }

    successPopup$2.classList.toggle(`visually-hidden`, false);
    document.addEventListener(`keydown`, onEscKeyDown);
    body$2.style.overflow = `hidden`;
  });

  form$2.addEventListener(`input`, (evt) => {
    if (evt.target.className === `block-phone`) {
      if (!phoneSample.test(evt.target.value)) {
        evt.target.setCustomValidity(`Напиши номер правильно`);

      } else {
        evt.target.setCustomValidity(``);
      }

    } else if (evt.target.className === `block-name`) {
      if (!nameSample.test(evt.target.value)) {
        evt.target.setCustomValidity(`Напиши ФИО правильно`);

      } else {
        evt.target.setCustomValidity(``);
      }
    }
  });

  agreement.addEventListener(`change`, (evt) => {
    if (evt.target.checked) {
      btn.removeAttribute(`disabled`);
      return;
    }
    btn.setAttribute(`disabled`, `disabled`);
  });

  successPopup$2.addEventListener(`click`, (evt) => {
    if (evt.target === successPopup$2 || evt.target.className === `popup-close` || evt.target.tagName === `BUTTON`) {
      hideElement();

    } else if (evt.target.className === `page-success-popup__inner`) {
      evt.stopPropagation();
    }
  });

  const list$1 = document.querySelector(`.live-pictures`);
  const listMobile$1 = document.querySelector(`.live-pictures--mobile`);

  window.$(document).ready(() => {
    window.$(`.live-pictures--mobile`).slick({
      dots: true,
      infinite: true,
      speed: 300,
      slidesToShow: 1,
      centerMode: true,
      variableWidth: false,
      swipe: true,
      focusOnSelect: true,
      centerPadding: `0%`,
      adaptiveHeight: true,
      responsive: [
        {
          breakpoint: 768,
          settings: {
            arrows: false,
          }
        }
      ]
    });
  });

  document.addEventListener(`DOMContentLoaded`, function () {
    if (window.innerWidth >= 768) {
      list$1.classList.toggle(`visually-hidden`, false);
      listMobile$1.classList.toggle(`visually-hidden`, true);

    } else {
      list$1.classList.toggle(`visually-hidden`, true);
      listMobile$1.classList.toggle(`visually-hidden`, false);
    }
  });

  window.addEventListener(`resize`, () => {
    if (window.innerWidth >= 768) {
      list$1.classList.toggle(`visually-hidden`, false);
      listMobile$1.classList.toggle(`visually-hidden`, true);

    } else {
      list$1.classList.toggle(`visually-hidden`, true);
      listMobile$1.classList.toggle(`visually-hidden`, false);
    }
  });

  const faq = document.querySelector(`.page-questions__faq`);
  const list$2 = faq.querySelector(`ol`);

  const questions = [...list$2.querySelectorAll(`li`)];

  questions.forEach((question) => {
    question.addEventListener(`click`, () => {
      question.classList.toggle(`active`);

      const paragraph = question.querySelector(`p`);

      if (question.classList.contains(`active`)) {
        paragraph.classList.toggle(`visually-hidden`, false);

      } else {
        paragraph.classList.toggle(`visually-hidden`, true);
      }
    });
  });

  const reviews = document.querySelector(`.page-reviews`);
  const counter = document.querySelector(`.page-reviews__counter`);

  window.$(document).ready(() => {
    window.$(`.page-reviews__list`).slick({
      dots: true,
      infinite: true,
      speed: 300,
      slidesToShow: 1,
      centerMode: true,
      variableWidth: false,
      swipe: true,
      focusOnSelect: true,
      centerPadding: `0%`,
      adaptiveHeight: true
    });

    const dots = reviews.querySelector(`.slick-dots`);
    const length = [...dots.children].length;
    const slickNext = reviews.querySelector(`.slick-next`);
    const slickPrev = reviews.querySelector(`.slick-prev`);

    dots.classList.toggle(`visually-hidden`, true);
    counter.textContent = `1 / ${length}`;
    slickNext.textContent = ``;
    slickPrev.textContent = ``;

    window.$(`.page-reviews__list`).on(`afterChange`, function (event, slick, currentSlide) {
      counter.textContent = `${currentSlide + 1} / ${length}`;
    });
  });

}());

//# sourceMappingURL=main.js.map

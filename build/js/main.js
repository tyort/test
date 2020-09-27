(function () {
  'use strict';

  const programs = document.querySelector(`.page-catalogue`);
  const actualDescriptions = programs === null ? null : programs.querySelector(`.catalogue-details__descriptions`);
  const programsList = document.querySelector(`.catalogue-details__list`);

  window.$(document).ready(() => {
    window.$(`.catalogue-details__list--mobile`).slick({
      dots: false,
      infinite: true,
      speed: 300,
      slidesToShow: 5,
      centerMode: true,
      variableWidth: false,
      swipe: true,
      focusOnSelect: true,
      centerPadding: `0`,
      responsive: [
        {
          breakpoint: 768,
          settings: {
            arrows: false,
            dots: false,
            infinite: true,
            speed: 300,
            slidesToShow: 1,
            centerMode: true,
            variableWidth: false,
            swipe: true,
            focusOnSelect: true,
            centerPadding: `35%`
          }
        },
        {
          breakpoint: 630,
          settings: {
            arrows: false,
            dots: false,
            infinite: true,
            speed: 300,
            slidesToShow: 1,
            centerMode: true,
            variableWidth: false,
            swipe: true,
            focusOnSelect: true,
            centerPadding: `30%`
          }
        },
        {
          breakpoint: 450,
          settings: {
            arrows: false,
            dots: false,
            infinite: true,
            speed: 300,
            slidesToShow: 1,
            centerMode: true,
            variableWidth: false,
            swipe: true,
            focusOnSelect: true,
            centerPadding: `20%`
          }
        }
      ]
    });

    window.$(`.catalogue-details__list`).on(`afterChange`, (event, slick, currentSlide) => {
      [...programs.querySelectorAll(`.slick-cloned`)].forEach((item) => {
        item.querySelector(`button`).classList.toggle(`catalogue-details__item--isChecked`, false);
      });

      [...slick.$slides].forEach((item, index) => {
        item.querySelector(`button`).classList.toggle(`catalogue-details__item--isChecked`, false);
        if (index === currentSlide) {
          item.querySelector(`button`).classList.toggle(`catalogue-details__item--isChecked`, true);
        }
      });

      [...actualDescriptions.children].forEach((item, index) => {
        item.classList.toggle(`visually-hidden`, true);
        if (index === currentSlide) {
          item.classList.toggle(`visually-hidden`, false);
        }
      });
    });
  });

  document.addEventListener(`keydown`, (evt) => {
    const items = [...programsList.querySelectorAll(`li`)];

    if (evt.key === `Enter`) {
      items.forEach((program) => {
        if (window.$(program).is(`:focus`)) {
          program.querySelector(`button`).click();
        }
      });
    }
  }, true);

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
  const form = pageDesire === null ? null : pageDesire.querySelector(`form`);
  const successPopup = document.querySelector(`.page-success-popup`);

  const clientsStorage = new LocalStorageUtil();


  if (form) {
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
        'Phone number': form.querySelector(`input[name="phone"]`).value.toString(),
      });

      hideElement();
      form.reset();

      successPopup.classList.toggle(`visually-hidden`, false);
      document.addEventListener(`keydown`, onEscKeyDown);
      body.style.overflow = `hidden`;
    });
  }

  const body$1 = document.querySelector(`body`);
  const pageFeedback = document.querySelector(`.page-details__feedback`);
  const form$1 = pageFeedback === null ? null : pageFeedback.querySelector(`form`);
  const successPopup$1 = document.querySelector(`.page-success-popup`);

  const clientsStorage$1 = new LocalStorageUtil();
  let yaMapsShown = false;

  window.addEventListener(`mapWasLoaded`, () => {
    window.$(window).scroll(function () {
      if (!yaMapsShown) {
        if (window.$(window).height() + window.$(window).scrollTop() > window.$(`#YMapsID`).offset().top) {
          yaMapsShown = true;
          window.ymaps.ready(init);
        }
      }
    });
  });

  if (form$1) {
    form$1.addEventListener(`submit`, (evt) => {
      evt.preventDefault();

      clientsStorage$1.putClient({
        'Full name': form$1.querySelector(`input[name="name"]`).value,
        'Phone number': form$1.querySelector(`input[name="phone"]`).value.toString(),
      });

      hideElement();
      form$1.reset();

      successPopup$1.classList.toggle(`visually-hidden`, false);
      document.addEventListener(`keydown`, onEscKeyDown);
      body$1.style.overflow = `hidden`;
    });

    form$1.addEventListener(`input`, (evt) => {
      if (evt.target.name === `phone`) {
        if (!phoneSample.test(evt.target.value)) {
          evt.target.setCustomValidity(`Напиши номер правильно`);

        } else {
          evt.target.setCustomValidity(``);
        }

      } else if (evt.target.name === `name`) {
        if (!nameSample.test(evt.target.value)) {
          evt.target.setCustomValidity(`Напиши ФИО правильно`);

        } else {
          evt.target.setCustomValidity(``);
        }
      }
    });
  }

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
  const form$2 = requestPopup === null ? null : requestPopup.querySelector(`form`);
  const agreement = requestPopup === null ? null : requestPopup.querySelector(`.field-agreement`);
  const btn = requestPopup === null ? null : requestPopup.querySelector(`button`);

  const clientsStorage$2 = new LocalStorageUtil();

  if (pageHeader) {
    pageHeader.querySelector(`.page-header__btn`)
        .addEventListener(`click`, () => {
          requestPopup.classList.toggle(`visually-hidden`, false);
          requestPopup.querySelector(`input[name="name"]`).focus();
          document.addEventListener(`keydown`, onEscKeyDown);
          body$2.style.overflow = `hidden`;
        });
  }

  if (requestPopup) {
    requestPopup.addEventListener(`click`, (evt) => {
      if (evt.target === requestPopup || evt.target.className === `popup-close`) {
        hideElement();
        form$2.reset();

      } else if (evt.target.className === `page-request-popup__inner`) {
        evt.stopPropagation();
      }
    });

    form$2.addEventListener(`submit`, (evt) => {
      evt.preventDefault();

      clientsStorage$2.putClient({
        'Full name': form$2.querySelector(`input[name="name"]`).value,
        'Phone number': form$2.querySelector(`input[name="phone"]`).value.toString(),
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
      if (evt.target.name === `phone`) {
        if (!phoneSample.test(evt.target.value)) {
          evt.target.setCustomValidity(`Напиши номер правильно`);

        } else {
          evt.target.setCustomValidity(``);
        }

      } else if (evt.target.name === `name`) {
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
  }

  if (successPopup$2) {
    successPopup$2.addEventListener(`click`, (evt) => {
      if (evt.target === successPopup$2 || evt.target.className === `popup-close` || evt.target.tagName === `BUTTON`) {
        hideElement();

      } else if (evt.target.className === `page-success-popup__inner`) {
        evt.stopPropagation();
      }
    });
  }

  const list = document.querySelector(`.live-pictures`);
  const listMobile = document.querySelector(`.live-pictures--mobile`);

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


  if (list) {
    document.addEventListener(`DOMContentLoaded`, function () {
      if (window.innerWidth > 767) {
        list.classList.toggle(`visually-hidden`, false);
        listMobile.classList.toggle(`visually-hidden`, true);

      } else {
        list.classList.toggle(`visually-hidden`, true);
        listMobile.classList.toggle(`visually-hidden`, false);
      }
    });

    window.addEventListener(`resize`, () => {
      if (window.innerWidth > 767) {
        list.classList.toggle(`visually-hidden`, false);
        listMobile.classList.toggle(`visually-hidden`, true);

      } else {
        list.classList.toggle(`visually-hidden`, true);
        listMobile.classList.toggle(`visually-hidden`, false);
      }
    });
  }

  const faq = document.querySelector(`.page-questions__faq`);
  const list$1 = faq === null ? null : faq.querySelector(`ol`);

  if (list$1) {
    const questions = [...list$1.querySelectorAll(`li`)];

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
  }

  document.addEventListener(`keydown`, (evt) => {
    const questions = [...list$1.querySelectorAll(`li`)];

    if (evt.key === `Enter`) {
      questions.forEach((question) => {
        if (window.$(question).is(`:focus`)) {
          question.classList.toggle(`active`);
        }

        const paragraph = question.querySelector(`p`);

        if (question.classList.contains(`active`)) {
          paragraph.classList.toggle(`visually-hidden`, false);

        } else {
          paragraph.classList.toggle(`visually-hidden`, true);
        }
      });
    }
  }, true);

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

    const dots = reviews === null ? null : reviews.querySelector(`.slick-dots`);
    const length = dots === null ? null : [...dots.children].length;
    const slickNext = reviews === null ? null : reviews.querySelector(`.slick-next`);
    const slickPrev = reviews === null ? null : reviews.querySelector(`.slick-prev`);

    if (dots) {
      dots.classList.toggle(`visually-hidden`, true);
      counter.textContent = `1 / ${length}`;
      slickNext.textContent = ``;
      slickPrev.textContent = ``;

      window.$(`.page-reviews__list`).on(`afterChange`, function (event, slick, currentSlide) {
        counter.textContent = `${currentSlide + 1} / ${length}`;
      });
    }
  });

}());

//# sourceMappingURL=main.js.map

(function () {
  'use strict';

  const catalogueItems = [
    [`Общие`, `item-star`],
    [`Академические`, `item-cap`],
    [`Стажировки`, `item-portfolio`],
    [`Волонтёрство`, `item-heart`],
    [`Религиозные`, `item-candles`],
  ];

  const ProgramsDescriptions = [
    `Жаркий Израиль для каждого приготовил занятие по душе: пляжный отдых на
  Средиземном и Красном море, паломнические туры по святыням сразу трех религий,
  мощную «экскурсионку» по следам древнейших цивилизаций и, конечно, лечение на Мертвом море.`,
    `Провести семестр или год за рубежом, знакомясь с различными культурами
  и идеями, традициями и стилем жизни — вот что такое учеба за границей!
  Израиль — это не только центр религиозного мира, это также академический
  центр, живая лаборатория идей и творческого исследования.`,
    `Более 400 русскоязычных студентов, участников различных программ Маса компании Тлалим в 
  течение года получают возможность пройти стажировку в израильских компаниях.
  Стажировка дает с возможность оказаться внутри профессионального мира своей специальности
  в Израиле, получить новые знания и опыт, установить личные и деловые контакты.
  При успешном завершении стажировки у студентов получают рекомендации.`,
    `Маса предлагает уникальные возможности для волонтерской деятельности по всему Израилю.
  Вы сможете внести свой неоценимый вклад в развитие  израильского общества, сотрудничая
  с различными общинами и социально уязвимыми группами населения. Программы волонтерства
  фокусируются на создании и укреплении общин; помощи молодежи, находящейся в группе риска;
  поддержке мирного сосуществования евреев, арабов и других местных общин.`,
    `Евреи придают большое значение браку, полагая, что именно брак способствует развитию
  личности. Сексуальные связи вне брака, как и разводы, не поощряются.Смешанные браки
  иудаизм не запрещает, но и не одобряет. Причина этого не только в том, что подобные
  союзы сложны из-за различия культур, но и потому, что национальность у евреев передается
  по матери, то есть евреем считается ребенок матери-еврейки. Существует ряд религиозных
  предписаний, регулирующих семейную жизнь - правило семейной чистоты, правила развода и так далее.`,
    `Может быть, Вы заинтересованы в изучении социологии, мира, юриспруденции, биологии,
  сравнительной религии, законодательного и делового администрирования или искусства?
  Здесь, в Израиле, Вы сможете изучить все это в удивительной университетской среде.`
  ];

  const renderComponent = (container, element, place) => {
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

  const createElement = (template) => {
    const newElement = document.createElement(`div`);
    newElement.innerHTML = template;
    return newElement.firstChild;
  };

  const onEscKeyDown = (evt) => {
    if (evt.key === `Escape` || evt.key === `Esc`) {
      hideElement();
    }
  };

  const hideElement = () => {
    const requestPopup = document.querySelector(`.page-request-popup`);
    const successPopup = document.querySelector(`.page-success-popup`);
    const form = requestPopup.querySelector(`form`);
    const btn = requestPopup.querySelector(`button`);

    successPopup.classList.toggle(`visually-hidden`, true);
    requestPopup.classList.toggle(`visually-hidden`, true);
    document.removeEventListener(`keydown`, onEscKeyDown);
    document.querySelector(`body`).style.overflow = `visible`;
    form.reset();

    if (!btn.hasAttribute(`disabled`)) {
      btn.setAttribute(`disabled`, `disabled`);
    }
  };

  const phoneSample = /^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/;
  const nameSample = /^[a-zA-Zа-яёА-ЯЁ]+$/u;

  class AbstractComponent {
    constructor() {
      if (new.target === AbstractComponent) {
        throw new Error(`Can't instantiate AbstractComponent, only concrete one.`);
      }

      this._element = null;
    }

    getTemplate() {
      throw new Error(`Abstract method not implemented: getTemplate`);
    }

    getElement() {
      if (!this._element) {
        this._element = createElement(this.getTemplate());
      }
      return this._element;
    }

    removeElement() {
      this._element = null;
    }
  }

  class AbstractSmartComponent extends AbstractComponent {
    recoveryListeners() {
      throw new Error(`Abstract method not implemented: recoveryListeners`);
    }

    reRender() {
      const oldElement = this.getElement();
      const parent = oldElement.parentElement;
      this.removeElement();
      const newElement = this.getElement();
      parent.replaceChild(newElement, oldElement);
      this.recoveryListeners();
    }
  }

  const createItemsDescriptions = (currentProgram) => {
    return catalogueItems
        .map((program, index) => {
          const isElementHidden = program[0] === currentProgram ? `` : `visually-hidden`;
          const addition = program[0] === `Академические`
            ? `<p>${ProgramsDescriptions[5]}</p>`
            : ``;

          return (
            `<li class="catalogue-details__item-description ${isElementHidden}">
            <h3>${program[0]}</h3>
            <p>${ProgramsDescriptions[index]}</p>
            ${addition}
          </li>`
          );
        })
        .join(``);
  };

  const createItemsButtons = (currentProgram) => {
    return catalogueItems
        .map((program) => {
          const isButtonChecked = program[0] === currentProgram
            ? `btn__isChecked`
            : ``;

          return (
            `<li>
            <button class="catalogue-details__item ${program[1]} ${isButtonChecked}">
              ${program[0]}
            </button>
          </li>`
          );
        })
        .join(``);
  };

  const createItemsButtonsMobile = () => {
    return catalogueItems
        .map((program) => {
          return (
            `<li>
            <button class="catalogue-details__item ${program[1]}">
              ${program[0]}
            </button>
          </li>`
          );
        })
        .join(``);
  };


  const createCatalogueTemplate = (currentProgram) => {

    return (
      `<div class="page-catalogue">
      <div class="page-catalogue__inner">
        <h2>Программы</h2>

        <div class="catalogue-details">
          <ul class="catalogue-details__list ${window.innerWidth >= 768 ? `` : `visually-hidden`}">
            ${createItemsButtons(currentProgram)}
          </ul>
          <ul class="catalogue-details__list catalogue-details__list--mobile ${window.innerWidth >= 768 ? `visually-hidden` : ``}">
            ${createItemsButtonsMobile()}
          </ul>
          <ul class="catalogue-details__descriptions">
            ${createItemsDescriptions(currentProgram)}
          </ul>
        </div>
      </div>
    </div>`
    );
  };

  class Catalogue extends AbstractSmartComponent {
    constructor() {
      super();
      this._currentItem = `Общие`;
      this._getInitSlider();
      this._onButtonClick = this._onButtonClick.bind(this);
      this._subscribeOnEvents();
    }

    getTemplate() {
      return createCatalogueTemplate(this._currentItem);
    }

    _getInitSlider() {
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
          this._currentItem = activeButton.querySelector(`button`).textContent.trim();

          this.reRender();
        });
      });
    }

    recoveryListeners() {
      this._subscribeOnEvents();
    }

    reRender() {
      const element = this.getElement();

      const list = element.querySelector(`.catalogue-details__list`);
      list.innerHTML = createItemsButtons(this._currentItem);

      const actualDescriptions = element.querySelector(`.catalogue-details__descriptions`);
      actualDescriptions.innerHTML = createItemsDescriptions(this._currentItem);
    }

    _subscribeOnEvents() {
      const element = this.getElement();
      const list = element.querySelector(`.catalogue-details__list`);
      const listMobile = element.querySelector(`.catalogue-details__list--mobile`);

      list.addEventListener(`click`, this._onButtonClick);

      window.addEventListener(`resize`, () => {
        if (window.innerWidth >= 768) {
          list.classList.toggle(`visually-hidden`, false);
          listMobile.classList.toggle(`visually-hidden`, true);

        } else {
          list.classList.toggle(`visually-hidden`, true);
          listMobile.classList.toggle(`visually-hidden`, false);
        }
      });
    }


    _onButtonClick(evt) {
      if (this._currentItem === evt.target.textContent.trim() || !evt.target.classList.contains(`catalogue-details__item`)) {
        return;
      }

      this._currentItem = evt.target.textContent.trim();
      this.reRender();
    }
  }

  const pageDesire = document.querySelector(`.page-desire`);
  const form = pageDesire.querySelector(`form`);

  form.addEventListener(`submit`, (evt) => {
    evt.preventDefault();
    form.reset();
  });

  form.addEventListener(`input`, (evt) => {
    if (!phoneSample.test(evt.target.value)) {
      evt.target.setCustomValidity(`Напиши номер правильно`);

    } else {
      evt.target.setCustomValidity(``);
    }
  });

  const pageFeedback = document.querySelector(`.page-details__feedback`);
  const form$1 = pageFeedback.querySelector(`form`);


  form$1.addEventListener(`submit`, (evt) => {
    evt.preventDefault();
    form$1.reset();
  });

  form$1.addEventListener(`input`, (evt) => {
    if (evt.target.id === `block-phone`) {
      if (!phoneSample.test(evt.target.value)) {
        evt.target.setCustomValidity(`Напиши номер правильно`);

      } else {
        evt.target.setCustomValidity(``);
      }

    } else if (evt.target.id === `block-name`) {
      if (!nameSample.test(evt.target.value)) {
        evt.target.setCustomValidity(`Напиши ФИО правильно`);

      } else {
        evt.target.setCustomValidity(``);
      }
    }
  });

  const body = document.querySelector(`body`);
  const pageHeader = document.querySelector(`.page-header`);
  const requestPopup = document.querySelector(`.page-request-popup`);
  const successPopup = document.querySelector(`.page-success-popup`);
  const form$2 = requestPopup.querySelector(`form`);
  const agreement = requestPopup.querySelector(`.field-agreement`);
  const btn = requestPopup.querySelector(`button`);

  pageHeader.querySelector(`.page-header__btn`)
      .addEventListener(`click`, () => {
        requestPopup.classList.toggle(`visually-hidden`, false);
        document.addEventListener(`keydown`, onEscKeyDown);
        body.style.overflow = `hidden`;
      });

  requestPopup.addEventListener(`click`, (evt) => {
    if (evt.target === requestPopup || evt.target.className === `popup__close`) {
      hideElement();
    } else if (evt.target.className === `page-request-popup__inner`) {
      evt.stopPropagation();
    }
  });

  form$2.addEventListener(`submit`, (evt) => {
    evt.preventDefault();
    hideElement();

    successPopup.classList.toggle(`visually-hidden`, false);
    document.addEventListener(`keydown`, onEscKeyDown);
    body.style.overflow = `hidden`;
  });

  form$2.addEventListener(`input`, (evt) => {
    if (evt.target.id === `block-phone`) {
      if (!phoneSample.test(evt.target.value)) {
        evt.target.setCustomValidity(`Напиши номер правильно`);

      } else {
        evt.target.setCustomValidity(``);
      }

    } else if (evt.target.id === `block-name`) {
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

  successPopup.addEventListener(`click`, (evt) => {
    if (evt.target === successPopup || evt.target.className === `popup__close` || evt.target.tagName === `BUTTON`) {
      hideElement();

    } else if (evt.target.className === `page-success-popup__inner`) {
      evt.stopPropagation();
    }
  });

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

  document.addEventListener(`DOMContentLoaded`, function () {
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

  const faq = document.querySelector(`.page-questions__faq`);
  const list$1 = faq.querySelector(`ol`);

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

  const body$1 = document.querySelector(`body`);
  const about = body$1.querySelector(`.page-about`);
  const catalogue = new Catalogue();
  renderComponent(about, catalogue, `afterEnd`);

}());

//# sourceMappingURL=main.js.map

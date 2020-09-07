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
          centerPadding: `20%`,
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

  const createHeaderTemplate = () =>
    (
      `<div class="page-header">
      <div class="page-header__inner">
        <div class="page-header__inner-top clearfix">
          <a class="page-header__phone" href="tel:+97226216581">+ (972) 2 – 621 – 6581</a>
          <a class="page-header__logo">
            <img src="img/logo.png" alt="логотип компании" width="137" height="48">
          </a>
          <div class="page-header__btn">Заказать звонок</div>
        </div>

        <p>Учёба, путешествие и карьера
        для еврейской молодёжи</p>
      </div>
    </div>`
    );

  class Header extends AbstractSmartComponent {
    constructor() {
      super();
      this._showCallRequest = null;
      this._subscribeOnEvents();
    }

    getTemplate() {
      return createHeaderTemplate();
    }

    setCallRequestHandler(handler) {
      this._showCallRequest = handler;
    }

    recoveryListeners() {
      this._subscribeOnEvents();
    }

    reRender() {
      super.reRender();
    }

    _subscribeOnEvents() {
      const element = this.getElement();

      element.querySelector(`.page-header__btn`)
          .addEventListener(`click`, () => {
            this._showCallRequest();
          });
    }
  }

  const createDesireTemplate = () =>
    (
      `<div class="page-desire">
      <div class="page-desire__inner">
        <h2>Хочу поехать!</h2>
        <p>
          Оставьте свой телефон и мы свяжемся с вами,
          подберём куратора и ответим на все вопросы!
        </p>
        <form>
          <div class="input-container">
            <input
              type="tel"
              name="phone"
              value=""
              id="block-phone"
              placeholder="Телефон"
              autocomplete="off"
              required
            />
            <p class="error__message">Ошибка: неверный формат</p>
          </div>
          <button class="recall__btn" type="submit">Перезвоните мне</button>
        </form>
      </div>
    </div>`
    );

  class Desire extends AbstractSmartComponent {
    constructor() {
      super();
      this._subscribeOnEvents();
    }

    getTemplate() {
      return createDesireTemplate();
    }

    recoveryListeners() {
      this._subscribeOnEvents();
    }

    reRender() {
      super.reRender();
    }

    _subscribeOnEvents() {
      const element = this.getElement();
      const form = element.querySelector(`form`);
      const phoneSample = /^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/;

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
    }

  }

  const createFeedbackTemplate = () =>
    (
      `<div class="page-feedback">
      <div class="page-feedback-safety">
        <p class="page-feedback-safety__top">
          Оставьте ваши контакты, если у вас остались
          вопросы — мы на них ответим!
        </p>
        <p class="page-feedback-safety__addition">
          Мы не передаём данные третьим лицам. Ваши данные
          будут в безопасности и вам не придёт спам от нас!
        </p>
      </div>
      
      <form>
        <div class="input-container">
          <input
            type="text"
            name="name"
            value=""
            id="block-name"
            placeholder="ИМЯ"
            autocomplete="off"
            required
            />
          <p class="error__message">Ошибка: неверный формат</p>
        </div>
        <div class="input-container">
          <input
            type="tel"
            name="phone"
            value=""
            id="block-phone"
            placeholder="Телефон"
            autocomplete="off"
            required
          />
          <p class="error__message">Ошибка: неверный формат</p>
        </div>
        <button class="recall__btn" type="submit">Перезвоните мне</button>
      </form>
    </div>`
    );

  class Feedback extends AbstractSmartComponent {
    constructor() {
      super();
      this._subscribeOnEvents();
    }

    getTemplate() {
      return createFeedbackTemplate();
    }

    recoveryListeners() {
      this._subscribeOnEvents();
    }

    reRender() {
      super.reRender();
    }

    _subscribeOnEvents() {
      const element = this.getElement();
      const form = element.querySelector(`form`);
      const phoneSample = /^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/;
      const nameSample = /^[a-zA-Zа-яёА-ЯЁ]+$/u;

      form.addEventListener(`submit`, (evt) => {
        evt.preventDefault();
        form.reset();
      });

      form.addEventListener(`input`, (evt) => {
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
    }

  }

  const createHeaderTemplate$1 = () => {
    return (
      `<div class="page-request-popup visually-hidden">
      <div class="page-request-popup__inner">
        <a href="#" class="popup__close"></a>
        <h3>Заказать звонок</h3>
        <p>Оставьте ваши контактные данные, мы свяжемся с вами
        в течение рабочего дня и обязательно поможем найти ответ
        на ваш вопрос!</p>

        <form>
          <div class="input-container">
            <input 
              type="text"
              name="name"
              value=""
              id="block-name"
              placeholder="ИМЯ"
              autocomplete="off"
              required
            />
          </div>
          <div class="input-container">
            <input
              type="tel"
              name="phone"
              value=""
              id="block-phone"
              placeholder="ТЕЛЕФОН"
              autocomplete="off"
              required
            />
          </div>
          <button type="submit" disabled>Перезвоните мне</button>

          <div class="field-agreement">
            <input type="checkbox" name="agreement" id="agreement-inform">
            <label for="agreement-inform" tabindex="0">Нажимая на кнопку, вы даёте согласие на обработку персональных данных</label>
          </div>
        </form>
        
      </div>
    </div>`
    );
  };

  class Header$1 extends AbstractSmartComponent {
    constructor() {
      super();
      this._showSuccessPopup = null;
      this._onEscKeyDown = this._onEscKeyDown.bind(this);
      this._subscribeOnEvents();
    }

    getTemplate() {
      return createHeaderTemplate$1();
    }

    setSuccessPopupHandler(handler) {
      this._showSuccessPopup = handler;
    }

    showElement() {
      const element = this.getElement();
      element.classList.toggle(`visually-hidden`, false);
      document.addEventListener(`keydown`, this._onEscKeyDown);
    }

    hideElement() {
      const element = this.getElement();
      const form = element.querySelector(`form`);
      const btn = element.querySelector(`button`);

      element.classList.toggle(`visually-hidden`, true);
      document.querySelector(`body`).style.overflow = `visible`;
      document.removeEventListener(`keydown`, this._onEscKeyDown);
      form.reset();
      btn.setAttribute(`disabled`, `disabled`);
    }

    _subscribeOnEvents() {
      const element = this.getElement();
      const form = element.querySelector(`form`);
      const agreement = element.querySelector(`.field-agreement`);
      const btn = element.querySelector(`button`);
      const phoneSample = /^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/;
      const nameSample = /^[a-zA-Zа-яёА-ЯЁ]+$/u;

      document.addEventListener(`keydown`, this._onEscKeyDown);

      element.addEventListener(`click`, (evt) => {
        if (evt.target === element || evt.target.className === `popup__close`) {
          this.hideElement();
        } else if (evt.target.className === `page-request-popup__inner`) {
          evt.stopPropagation();
        }
      });

      form.addEventListener(`submit`, (evt) => {
        evt.preventDefault();
        this.hideElement();
        this._showSuccessPopup();
      });

      form.addEventListener(`input`, (evt) => {
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
    }

    _onEscKeyDown(evt) {
      if (evt.key === `Escape` || evt.key === `Esc`) {
        this.hideElement();
      }
    }
  }

  const createSuccessTemplate = () => {
    return (
      `<div class="page-success-popup visually-hidden">
      <div class="page-success-popup__inner">
        <a href="#" class="popup__close"></a>

        <img src="./img/icon-ok.png" alt="логотип успеха" width="71" height="64">

        <h3>Заявка принята</h3>

        <p>Мы приняли ваши данные и вскоре мы перезвоним
          вам для уточнения деталей!</p>

        <button>Понятно</button>
        
      </div>
    </div>`
    );
  };

  class Success extends AbstractSmartComponent {
    constructor() {
      super();
      this._onEscKeyDown = this._onEscKeyDown.bind(this);
      this._subscribeOnEvents();
    }

    getTemplate() {
      return createSuccessTemplate();
    }

    showElement() {
      const element = this.getElement();
      element.classList.toggle(`visually-hidden`, false);
      document.addEventListener(`keydown`, this._onEscKeyDown);
    }

    hideElement() {
      const element = this.getElement();

      element.classList.toggle(`visually-hidden`, true);
      document.querySelector(`body`).style.overflow = `visible`;
      document.removeEventListener(`keydown`, this._onEscKeyDown);
    }

    _subscribeOnEvents() {
      const element = this.getElement();

      document.addEventListener(`keydown`, this._onEscKeyDown);

      element.addEventListener(`click`, (evt) => {
        if (evt.target === element || evt.target.className === `popup__close` || evt.target.tagName === `BUTTON`) {
          this.hideElement();

        } else if (evt.target.className === `page-success-popup__inner`) {
          evt.stopPropagation();
        }
      });
    }

    _onEscKeyDown(evt) {
      if (evt.key === `Escape` || evt.key === `Esc`) {
        this.hideElement();
      }
    }
  }

  const body = document.querySelector(`body`);
  const main = document.querySelector(`main`);
  const catalogue = new Catalogue();
  const header = new Header();
  const desire = new Desire();
  const feedback = new Feedback();
  const callRequest = new Header$1();
  const successPopup = new Success();
  renderComponent(body, header, `afterBegin`);
  renderComponent(main, catalogue);
  renderComponent(main, desire);
  // renderComponent(main, feedback);
  renderComponent(body, callRequest, `afterBegin`);
  renderComponent(body, successPopup, `afterBegin`);

  header.setCallRequestHandler(() => {
    callRequest.showElement();
    if (window.innerWidth >= 768) {
      body.style.overflow = `hidden`;
    }
  });

  callRequest.setSuccessPopupHandler(() => {
    successPopup.showElement();
    if (window.innerWidth >= 768) {
      body.style.overflow = `hidden`;
    }
  });

  window.addEventListener(`resize`, () => {
    if (window.innerWidth >= 768) {
      if (!callRequest.getElement().classList.contains(`visually-hidden`) || !successPopup.getElement().classList.contains(`visually-hidden`)) {
        body.style.overflow = `hidden`;
      }

    } else if (window.innerWidth < 768) {
      if (!callRequest.getElement().classList.contains(`visually-hidden`) || !successPopup.getElement().classList.contains(`visually-hidden`)) {
        body.style.overflow = `visible`;
      }
    }
  });

}());

//# sourceMappingURL=main.js.map

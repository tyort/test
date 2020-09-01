(function () {
  'use strict';

  const catalogueItems = [
    [`Общие`, `icon-star`],
    [`Академические`, `icon-cap`],
    [`Стажировки`, `icon-portfolio`],
    [`Волонтёрство`, `icon-heart`],
    [`Религиозные`, `icon-candles`],
  ];

  const ProgramsDescriptions = [
    `Жаркий Израиль для каждого приготовил занятие по душе: пляжный отдых на
  Средиземном и Красном море, паломнические туры по святыням сразу трех религий,
  мощную «экскурсионку» по следам древнейших цивилизаций и, конечно, лечение на Мертвом море.`,
    `Провести семестр или год за рубежом, знакомясь с различными культурами
  и идеями, традициями и стилем жизни — вот что такое учеба за границей!
  Израиль — это не только центр религиозного мира, это также академический
  центр, живая лаборатория идей и творческого исследования. Может быть,
  Вы заинтересованы в изучении социологии, мира, юриспруденции, биологии,
  сравнительной религии, законодательного и делового администрирования или искусства?
  Здесь, в Израиле, Вы сможете изучить все это в удивительной университетской среде.`,
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

  const createItemDescription = (currentProgram) => {
    return catalogueItems
        .map((program, index) => {
          const isElementHidden = program[0] === currentProgram ? `` : `visually-hidden`;
          return (
            `<li class="catalogue-details__item-description ${isElementHidden}">
            <h3>${program[0]}</h3>
            <p>${ProgramsDescriptions[index]}</p>
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
          <ul class="catalogue-details__list">
            <li class="catalogue-details__item">
              <svg width="28" height="33">
                <use xlink:href="img/sprite_auto.svg#icon-star"></use>
              </svg>
              Общие
            </li>
            <li class="catalogue-details__item">
              <svg width="36" height="35">
                <use xlink:href="img/sprite_auto.svg#icon-cap"></use>
              </svg>
              Академические
            </li>
            <li class="catalogue-details__item">
              <svg width="32" height="25">
                <use xlink:href="img/sprite_auto.svg#icon-portfolio"></use>
              </svg>
              Стажировки
            </li>
            <li class="catalogue-details__item">
              <svg width="32" height="29">
                <use xlink:href="img/sprite_auto.svg#icon-heart"></use>
              </svg>
              Волонтёрство
            </li>
            <li class="catalogue-details__item">
              <svg width="28" height="33">
                <use xlink:href="img/sprite_auto.svg#icon-candles"></use>
              </svg>
              Религиозные
            </li>
          </ul>
          <div class="catalogue-details__descriptions">
            ${createItemDescription(currentProgram)}
          </div>
        </div>
      </div>
    </div>`
    );
  };

  class Catalogue extends AbstractSmartComponent {
    constructor() {
      super();
      this._currentItem = `Общие`;
      this._subscribeOnEvents();
    }

    getTemplate() {
      return createCatalogueTemplate(this._currentItem);
    }

    recoveryListeners() {
      this._subscribeOnEvents();
    }

    reRender() {
      super.reRender();
    }

    _subscribeOnEvents() {
      const element = this.getElement();
      const list = element.querySelector(`.catalogue-details__list`);
      list.addEventListener(`click`, (evt) => {
        if (this._currentItem === evt.target.textContent.trim()) {
          return;
        }
        this._currentItem = evt.target.textContent.trim();
        this.reRender();
      });
    }
  }

  const createHeaderTemplate = () =>
    (
      `<div class="page-header">
      <div class="page-header__inner">
      </div>
    </div>`
    );

  class Header extends AbstractComponent {
    getTemplate() {
      return createHeaderTemplate();
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

  const body = document.querySelector(`body`);
  const main = document.querySelector(`main`);
  const catalogue = new Catalogue();
  const header = new Header();
  const desire = new Desire();
  const feedback = new Feedback();
  renderComponent(body, header, `afterBegin`);
  renderComponent(main, catalogue);
  renderComponent(main, desire);
  renderComponent(main, feedback);

}());

//# sourceMappingURL=main.js.map

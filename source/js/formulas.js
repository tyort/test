export const catalogueItems = [
  [`Общие`, `item-star`],
  [`Академические`, `item-cap`],
  [`Стажировки`, `item-portfolio`],
  [`Волонтёрство`, `item-heart`],
  [`Религиозные`, `item-candles`],
];

export const ProgramsDescriptions = [
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

export const getTransformedNumber = (number) => {
  const numberAsString = number.toString();
  return numberAsString.replace(/(\d{1,3}(?=(?:\d\d\d)+(?!\d)))/g, `$1` + ` `);
};

export const getTransformedLine = (numberAsLine) => {
  return Number(numberAsLine.replace(/\s+/g, ``).trim());
};

export const onEscKeyDown = (evt) => {
  if (evt.key === `Escape` || evt.key === `Esc`) {
    hideElement();
  }
};

export const hideElement = () => {
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



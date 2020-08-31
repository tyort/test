export const START_COST_OF_PROPERTY = 2000000;
export const ENTER_KEY_CODE = 13;
export const MIN_CREDIT_PERIOD = 5;
export const CAPITAL_OF_MOTHER = 470000;

export const catalogueItems = [
  [`Общие`, `icon-star`],
  [`Академические`, `icon-cap`],
  [`Стажировки`, `icon-portfolio`],
  [`Волонтёрство`, `icon-heart`],
  [`Религиозные`, `icon-candles`],
];

export const ProgramsDescriptions = [
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


export const removeAtributeSelected = (element) => {
  const options = element.querySelectorAll(`option`);
  options.forEach((it) => {
    if (it.hasAttribute(`selected`)) {
      it.removeAttribute(`selected`);
    }
  });
};

export const setAtributeSelected = (element, currentValue) => {
  const options = element.querySelectorAll(`option`);
  options.forEach((it) => {
    if (it.value === currentValue) {
      it.setAttribute(`selected`, `selected`);
    }
  });
};


export const setActualFeaturesNames = (creditType) => {
  let creditTypeTitle = ``;
  let maxPuschaseCost = null;
  let minPuschaseCost = null;
  let opertorsStepCost = null;
  let minFirstPaymentPercentage = null;
  let minMortgageCost = null;
  let maxCreditPeriod = null;
  let minCreditPeriod = null;
  let messageInsert = ``;
  let sumCreditName = ``;

  switch (creditType) {
    case `automobile`:
      creditTypeTitle = `Стоимость автомобиля`;
      sumCreditName = `Сумма автокредита`;
      maxPuschaseCost = 5000000;
      minPuschaseCost = 500000;
      opertorsStepCost = 50000;
      minFirstPaymentPercentage = 20;
      minMortgageCost = 200000;
      maxCreditPeriod = 5;
      minCreditPeriod = 1;
      messageInsert = `автокредиты`;
      break;
    case `consumer`:
      creditTypeTitle = `Сумма потребительского кредита`;
      sumCreditName = `Cумма кредита`;
      maxPuschaseCost = 3000000;
      minPuschaseCost = 50000;
      opertorsStepCost = 50000;
      minFirstPaymentPercentage = 0;
      minMortgageCost = 0;
      maxCreditPeriod = 7;
      minCreditPeriod = 1;

      break;
    default:
      creditTypeTitle = `Стоимость недвижимости`;
      sumCreditName = `Cумма ипотеки`;
      maxPuschaseCost = 25000000;
      minPuschaseCost = 1200000;
      opertorsStepCost = 100000;
      minFirstPaymentPercentage = 10;
      minMortgageCost = 500000;
      maxCreditPeriod = 30;
      minCreditPeriod = 5;
      messageInsert = `ипотечные кредиты`;
      break;
  }

  return {
    creditTypeTitle,
    maxPuschaseCost,
    minPuschaseCost,
    opertorsStepCost,
    minFirstPaymentPercentage,
    minMortgageCost,
    maxCreditPeriod,
    minCreditPeriod,
    messageInsert,
    sumCreditName
  };
};

export const sliderScale = (creditType, number) => {
  let speedOfSlider = null;

  switch (creditType) {
    case `automobile`:
      speedOfSlider = number * 145 - 140;
      break;
    case `consumer`:
      speedOfSlider = number * 96 - 90;
      break;
    default:
      speedOfSlider = number * 23 - 110;
      break;
  }

  return speedOfSlider;
};


export const getTransformedNumber = (number) => {
  const numberAsString = number.toString();
  return numberAsString.replace(/(\d{1,3}(?=(?:\d\d\d)+(?!\d)))/g, `$1` + ` `);
};

export const getTransformedLine = (numberAsLine) => {
  return Number(numberAsLine.replace(/\s+/g, ``).trim());
};


import AbstractSmartComponent from './abstract-smart-component.js';

const worldParts = [
  [`russia`, `Россия`],
  [`cis`, `СНГ`],
  [`europe`, `Европа`]
];

const cities = {
  'russia': [
    [`Саратов`, [51.533103, 46.034158]],
    [`Санкт-Петербург`, [59.939095, 30.315868]],
    [`Москва`, [55.755814, 37.617635]],
    [`Кировск`, [59.875330, 30.981457]],
    [`Тюмень`, [57.153033, 65.534328]],
    [`Омск`, [54.989342, 73.368212]]
  ],
  'cis': [
    [`Баку`, [40.369539, 49.835011]],
    [`Ташкент`, [41.311151, 69.279737]],
    [`Минск`, [53.902512, 27.561481]],
    [`Алматы`, [43.238293, 76.945465]],
  ],
  'europe': [
    [`Париж`, [48.856663, 2.351556]],
    [`Прага`, [50.080293, 14.428983]],
    [`Лондон`, [51.507351, -0.127660]],
    [`Рим`, [41.902689, 12.496176]]
  ]
};

const createWorldParts = (parts) => {
  return parts
      .map((item) => {
        return (
          `<div>
            <input type="checkbox" value="${item[0]}" id="${item[0]}">
            <label for="russia">${item[1]}</label>
          </div>`
        );
      })
      .join(``);
};

const createMapTemplate = () => {
  const worldsPart = createWorldParts(worldParts);

  return (
    `<div class="page-map">
      <div class="container">
        <div class="page-map__inner"></div>

          <div class="page-map__title">
            Отделения Лига Банка
          </div>

          <div class="page-map__contries">
            ${worldsPart}
          </div>

          <div class="page-map__view" id="YMapsID" style="width: 1170px; height: 462px;"></div>

        </div>
      </div>
    </div>`);
};


export default class Map extends AbstractSmartComponent {
  constructor() {
    super();
    this._myMap = null;
    this._countries = [];
    this._getInitMap();
    this._subscribeOnEvents();
  }

  getTemplate() {
    return createMapTemplate();
  }

  changedDataByView() {
    let interestedCities = [];

    if (this._countries) {
      Object.keys(cities).forEach((it) => {
        if (this._countries.includes(it)) {
          interestedCities = [...interestedCities, ...cities[it]];
        }
      });
    }

    this._myMap.geoObjects.removeAll();

    for (let i = 0; i < interestedCities.length; i++) {
      this._myMap.geoObjects
          .add(new window.ymaps.Placemark(interestedCities[i][1], {
            balloonContent: `${interestedCities[i][0]}`
          }, {
            preset: `islands#icon`,
            iconColor: `#0095b6`
          }));
    }

  }

  _getInitMap() {
    window.addEventListener(`mapWasLoaded`, () => {
      window.ymaps.ready(() => {
        this._myMap = new window.ymaps.Map(`YMapsID`, {
          center: [55.76, 37.64],
          zoom: 10,
        }, {
          searchControlProvider: `yandex#search`
        });
      });
    });
  }


  _subscribeOnEvents() {
    const element = this.getElement();

    element.querySelector(`.page-map__contries`)
        .addEventListener(`change`, (evt) => {
          const original = new Set(this._countries);

          if (evt.target.checked) {
            original.add(evt.target.value);

          } else {
            original.delete(evt.target.value);
          }
          this._countries = [...original];
          this.changedDataByView();
        });
  }
}

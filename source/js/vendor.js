import $ from "jquery";
window.$ = $;
import 'slick-carousel';
import LazyLoad from "vanilla-lazyload";

const yandexMapsScript = document.createElement(`script`);
const key = `6b492866-f739-4d69-9dbc-9ff50d70ea08`;

yandexMapsScript.src = `https://api-maps.yandex.ru/2.1/?apikey=${key}&lang=ru_RU`;

document.body.appendChild(yandexMapsScript);

yandexMapsScript.addEventListener(`load`, function () {
  window.dispatchEvent(new Event(`mapWasLoaded`));
});

// eslint-disable-next-line no-unused-vars
const myLazyLoad = new LazyLoad({
  // eslint-disable-next-line camelcase
  elements_selector: `.lazyload`
});

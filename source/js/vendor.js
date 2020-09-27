import $ from "jquery";
window.$ = $;
import 'slick-carousel';

let YaMapsShown = false;

window.$(document).ready(function () {
  window.$(window).scroll(function () {
    if (!YaMapsShown) {
      if (window.$(window).scrollTop() + window.$(window).height() > window.$(document).height() - 700) {
        showYaMaps();
        YaMapsShown = true;
      }
    }
  });
});

function showYaMaps() {
  const yandexMapsScript = document.createElement(`script`);
  const key = `6b492866-f739-4d69-9dbc-9ff50d70ea08`;
  yandexMapsScript.type = `text/javascript`;
  yandexMapsScript.src = `https://api-maps.yandex.ru/2.1/?apikey=${key}&lang=ru_RU`;
  document.body.appendChild(yandexMapsScript);
}



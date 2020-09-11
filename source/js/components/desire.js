const pageDesire = document.querySelector(`.page-desire`);
const form = pageDesire.querySelector(`form`);
import {phoneSample} from '../formulas';

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

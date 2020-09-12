
const pageFeedback = document.querySelector(`.page-feedback`);
const form = pageFeedback.querySelector(`form`);
import {phoneSample, nameSample} from '../formulas';


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


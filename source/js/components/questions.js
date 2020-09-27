const faq = document.querySelector(`.page-questions__faq`);
const list = faq === null ? null : faq.querySelector(`ol`);

if (list) {
  const questions = [...list.querySelectorAll(`li`)];

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
}

document.addEventListener(`keydown`, (evt) => {
  const questions = [...list.querySelectorAll(`li`)];

  if (evt.key === `Enter`) {
    questions.forEach((question) => {
      if (window.$(question).is(`:focus`)) {
        question.classList.toggle(`active`);
      }

      const paragraph = question.querySelector(`p`);

      if (question.classList.contains(`active`)) {
        paragraph.classList.toggle(`visually-hidden`, false);

      } else {
        paragraph.classList.toggle(`visually-hidden`, true);
      }
    });
  }
}, true);

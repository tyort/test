const faq = document.querySelector(`.page-questions__faq`);
const list = faq.querySelector(`ol`);

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


import AbstractSmartComponent from './abstract-smart-component.js';

const createStepThreeTemplate = () => {
  return (`<div class="page-calculation__step-three">
            <h3>Шаг 3. Оформление заявки</h3>
            <table class="page-calculation__request-information">
              <tr>
                <td class="request-article">Номер заявки</td>
                <td>№ 0010</td>
              </tr>
              <tr>
                <td class="request-article">Цель кредита</td>
                <td>Ипотека</td>
              </tr>
              <tr>
                <td class="request-article">Стоимсоть недвижимости</td>
                <td>2000000 рублей</td>
              </tr>
              <tr>
                <td class="request-article">Первоначальный взнос</td>
                <td>200000 рублей</td>
              </tr>
              <tr>
                <td class="request-article">Срок кредитования</td>
                <td>5 лет</td>
              </tr>
            </table>
            <button class="calculation__send-btn" type="submit">Отправить</button>
          </div>`);
};


export default class StepThree extends AbstractSmartComponent {
  constructor() {
    super();
  }

  getTemplate() {
    return createStepThreeTemplate();
  }
}

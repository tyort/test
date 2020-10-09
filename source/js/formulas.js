export const renderComponent = (container, element, place) => {
  switch (place) {
    case `afterBegin`:
      container.prepend(element);
      break;
    case `afterEnd`:
      container.after(element);
      break;
    default:
      container.append(element);
  }
};

export const createElement = (template) => {
  const newElement = document.createElement(`div`);
  newElement.innerHTML = template;
  return newElement;
};

export const onEscKeyDown = (evt) => {
  if (evt.key === `Escape` || evt.key === `Esc`) {
    hideElement();
  }
};

export function sendRequest(method, url, itemData = null) {
  const headers = {
    'Content-Type': 'application/json'
  }

  return fetch(url, {
    method: method,
    itemData: JSON.stringify(itemData),
    headers: headers
  })
    .then(response => {
      if (response.ok) {
        return response.json()
      }

      return response.json()
        .then(error => {
          const e = new Error('Что-то пошло не так')
          e.data = error
          throw e
        })
    })
}

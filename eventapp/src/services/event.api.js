const baseURL = 'http://localhost:3000';
const path = 'events';

export const getAllEvents = () =>
  fetch([baseURL, path].join('/')).then((response) => response.json());

export const addNewEvent = (newEvent) =>
  fetch([baseURL, path].join('/'), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify(newEvent),
  }).then((response) => response.json());

export const deleteEvent = (event) =>
  fetch([baseURL, path, event.id].join('/'), {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  }).then((response) => response.json());

export const editEvent = (editEvent) =>
  fetch([baseURL, path, editEvent.id].join('/'), {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify(editEvent),
  }).then((response) => response.json());

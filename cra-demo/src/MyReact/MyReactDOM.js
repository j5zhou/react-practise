import React from 'react';
import MyReact from '../MyReact/MyReact';

const render = function (currentElement, parentElement) {
  console.log('cur', currentElement);
  if (
    typeof currentElement === 'string' ||
    typeof currentElement === 'number'
  ) {
    const currentTextNode = document.createTextNode(currentElement);
    parentElement.appendChild(currentTextNode);
    return;
  }

  if (currentElement.type.prototype instanceof MyReact.Component) {
    const curInstance = new currentElement.type(currentElement.props);
    curInstance.parentDOMele = parentElement;
    const renderElement = curInstance.render();
    curInstance.preVDOM = renderElement;
    render(renderElement, parentElement);
    return;
  }

  const cur = document.createElement(currentElement.type);

  Object.keys(currentElement.props).forEach((key) => {
    if (key === 'style') {
      Object.keys(currentElement.props[key]).forEach((styleProp) => {
        cur.style[styleProp] = currentElement.props[key][styleProp];
      });
    } else if (key === 'className') {
      cur.classList.add(currentElement.props[key]);
    } else if (key.startsWith('on')) {
      let curEvent = key.toLowerCase().substring(2);
      cur.addEventListener(curEvent, currentElement.props[key]);
    } else if (key === 'children') {
      const curchildren = currentElement.props[key];
      if (Array.isArray(curchildren)) {
        curchildren.forEach((element) => {
          render(element, cur);
        });
      } else if (typeof curchildren === 'string') {
        const currentTextNode = document.createTextNode(curchildren);
        cur.appendChild(currentTextNode);
      } else {
        render(curchildren, cur);
      }
    } else {
      cur.setAttribute(key, currentElement.props[key]);
    }
  });

  parentElement.appendChild(cur);
};

const MyReactDOM = {
  render,
};

export default MyReactDOM;

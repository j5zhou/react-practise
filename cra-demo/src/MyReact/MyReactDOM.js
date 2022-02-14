import React from 'react';

const render = function (currentElement, parentElement) {
  console.log(currentElement);

  if (currentElement.type.prototype instanceof React.Component) {
    const curInstance = new currentElement.type();
    const renderElement = curInstance.render();
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

const MyReact = {
  render,
};

export default MyReact;

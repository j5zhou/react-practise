const update = function (currentElement, parentElement, isRoot) {
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
    update(renderElement, parentElement);
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
          update(element, cur);
        });
      } else if (typeof curchildren === 'string') {
        const currentTextNode = document.createTextNode(curchildren);
        cur.appendChild(currentTextNode);
      } else {
        update(curchildren, cur);
      }
    } else {
      cur.setAttribute(key, currentElement.props[key]);
    }
  });
  if (isRoot) {
    parentElement.lastChild.replaceWith(cur);
  } else {
    parentElement.appendChild(cur);
  }
};

class Component {
  constructor(props) {
    this.props = props;
  }

  setState(newState) {
    setTimeout(() => {
      this.state = { ...this.state, ...newState };
      // console.log('nextVDOM', this.render());
      // console.log('preVDOM', this.preVDOM);
      update(this.render(), this.parentDOMele, true);
    }, 0);
  }
}

const MyReact = {
  Component,
};

export default MyReact;

// let state = {
//   a: 1,
//   b: 2,
// };
// const preState = state;
// //state.a = state.a + 1; // mutable

// //const nextState = state;

// // imutable waly
// const nextState = {
//   ...preState,
//   a: preState.a + 1,
// };
// console.log('TEST', state);

// console.log(preState === nextState);

// const state = [1, 2, 3];

// const newState = state.map((item) => item * 2);

// state.push(4);
// const newState3 = state; //mutalbe
// const temp = [...state];
// temp.push(4);
// const newState2 = temp; // imutable

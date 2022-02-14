import React from 'react';
import ReactDOM from 'react-dom';
import MyReactDOM from './MyReact/MyReactDOM';
import './index.css';
// import App from './App';
import reportWebVitals from './reportWebVitals';

class MyApp extends React.Component {
  render() {
    return (
      <section
        className="my-section"
        onClick={() => {
          alert('hello');
        }}
        id="id"
      >
        <h1>
          <span style={{ color: 'red' }}>Hello</span>
        </h1>
        <button>Add</button>
      </section>
    );
  }
}

// MyApp vs <MyApp/>  vs   React.createElement(MyApp, {})

MyReactDOM.render(<MyApp />, document.getElementById('root'));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

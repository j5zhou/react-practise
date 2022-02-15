import React from 'react';
import ReactDOM from 'react-dom';
import MyReactDOM from './MyReact/MyReactDOM';
import MyReact from './MyReact/MyReact';
import './index.css';
// import App from './App';
import reportWebVitals from './reportWebVitals';

class MyTitle extends MyReact.Component {
  render() {
    return <h1>{this.props.title}</h1>;
  }
}
class MyApp extends MyReact.Component {
  state = {
    counter: 0,
    name: 'patrick',
  };

  hanldeAdd = () => {
    console.log(this);
    this.setState({
      counter: this.state.counter + 1,
    });
    this.setState({
      counter: this.state.counter + 1,
    });
    // this.setState({
    //   counter: this.state.counter + 1,
    // });
    console.log('hello');
  };

  render() {
    return (
      <section className="my-section" id="id">
        <MyTitle title={this.props.title} />
        <h1>
          <span style={{ color: 'red' }}>Counter : {this.state.counter}</span>
        </h1>
        <button onClick={this.hanldeAdd}>Add</button>
      </section>
    );
  }
}

// MyApp vs <MyApp/>  vs   React.createElement(MyApp, {})

MyReactDOM.render(<MyApp title="MyApp5" />, document.getElementById('root'));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

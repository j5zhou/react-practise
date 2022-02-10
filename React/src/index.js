import React from 'react';
import ReactDOM from 'react-dom';
import Logo from './Logo';
import Header from './components/Header';

class HelloMessage extends React.Component {
  state = { name: 'Jane!!!!' };
  render() {
    return (
      <div>
        <Header></Header>
        <Logo></Logo> Hello! {this.props.name} From {this.state.name}
      </div>
    );
  }
}

ReactDOM.render(
  <HelloMessage name="Taylor" />,
  document.getElementById('hello-example')
);

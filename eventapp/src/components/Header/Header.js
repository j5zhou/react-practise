import React from 'react';
import './Header.css';
import EventCounter from '../EventCounter/EventCounter';
export default class Header extends React.Component {
  hanldeNavClick = (e, pageInfo) => {
    e.preventDefault();
    this.props.hanldePageChange(pageInfo);
  };
  render() {
    const { pagesInfo } = this.props;
    return (
      <header className="app-header">
        <nav className="app-header__nav">
          <EventCounter></EventCounter>

          {Object.keys(pagesInfo).map((key) => (
            <a
              href={key}
              key={key}
              onClick={(e) => this.hanldeNavClick(e, key)}
            >
              {key}
            </a>
          ))}
        </nav>
      </header>
    );
  }
}

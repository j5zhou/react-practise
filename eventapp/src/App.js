import React from 'react';
import EventApp from './components/EventApp/EventApp';
import './App.css';

import Header from './components/Header/Header';

const PAGESINFO = {
  EventManager: 'EventManager',
  UpComingEvent: 'UpComingEvent',
};
class App extends React.Component {
  state = {
    currentPage: PAGESINFO.EventManager,
    pagesInfo: PAGESINFO,
  };

  hanldePageChange = (newPageInfo) => {
    this.setState({
      currentPage: newPageInfo,
    });
  };

  render() {
    const { currentPage, pagesInfo } = this.state;

    let curPage = null;
    switch (currentPage) {
      case PAGESINFO.EventManager:
        curPage = <EventApp></EventApp>;
        break;
      case PAGESINFO.UpComingEvent:
        curPage = <h1>TEST</h1>;
        break;
      default:
    }

    return (
      <div className="App">
        <Header
          pagesInfo={pagesInfo}
          hanldePageChange={this.hanldePageChange}
        ></Header>
        {curPage}
      </div>
    );
  }
}

export default App;

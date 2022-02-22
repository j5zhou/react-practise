import React from 'react';

class EventTable extends React.Component {
  render() {
    const { renderHeader, dataCol, renderFooter } = this.props;

    const header = renderHeader ? (
      <header className="event-app__header">{renderHeader()}</header>
    ) : null;
    const footer = renderFooter ? <tfoot>{renderFooter()}</tfoot> : null;

    return (
      <section className="event-app">
        {header}

        <table className="event-app__table">
          <thead>
            <tr>
              {dataCol?.map((col, index) => (
                <th key={`${col}`}>{col}</th>
              ))}
            </tr>
          </thead>
          <tbody>{this.props.children}</tbody>
          {footer}
        </table>
      </section>
    );
  }
}

export default EventTable;

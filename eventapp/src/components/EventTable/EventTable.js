import React from 'react';

function EventTable(props){
    const { renderHeader, dataCol, renderFooter } = props;

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
          <tbody>{props.children}</tbody>
          {footer}
        </table>
      </section>
    );
  }

export default EventTable;

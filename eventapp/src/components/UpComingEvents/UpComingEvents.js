import React from 'react';
import { withEventData } from '../../hoc/withEventData';

import EventDataRow from '../EventDataRow/EventDataRow';
import EventTable from '../EventTable/EventTable';
import WithEventData from '../WithEventData/WithEventData';
class UpComingEvent extends React.Component {
  state = {
    dataCol: ['Event Name', 'Start Date', 'End Date'],
  };
  renderHeader = () => {
    return <h5>UpComingEvent</h5>;
  };

  render() {
    const { events } = this.props;
    return (
      <EventTable renderHeader={this.renderHeader} dataCol={this.state.dataCol}>
        {events
          ?.filter((event) => {
            if (event.isInTheFuture()) {
              return true;
            } else {
              return false;
            }
          })
          .map((event) => {
            return <EventDataRow key={event.id} event={event}></EventDataRow>;
          })}
      </EventTable>
    );
  }
}
// HOC HELLO
// const UpComingEventPage =withScanData(withError(withUser(withEventData(UpComingEvent))));
// const UpComingEventPage = withEventData(UpComingEvent);

const UpComingEventPage = () => (
  <WithEventData
    renderChildren={(events) => {
      return <UpComingEvent events={events} />;
    }}
  ></WithEventData>
);

export default UpComingEventPage;

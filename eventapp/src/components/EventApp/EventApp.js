import React from 'react';
import { getAllEvents } from '../../services/event.api';
import {
  convertTimestampToDateValue,
  convertDateValueToTimeStamp,
} from '../../utils/date.helper';
class EventApp extends React.Component {
  state = {
    events: [],
    dataCol: ['Event Name', 'Start Date', 'End Date', 'Actions'],
    isShowAddEventRow: false,
    newEvent: {
      eventName: '',
      startDate: '',
      endDate: '',
    },
  };
  componentDidMount() {
    getAllEvents().then((data) => {
      this.setState({
        events: data,
      });
    });
  }

  hanldeAddEvent = () => {
    this.setState({
      isShowAddEventRow: true,
    });
  };
  hanldeOnChange = ({ target: { name, value, type } }) => {
    this.setState({
      newEvent: {
        ...this.state.newEvent,
        [name]: type === 'date' ? convertDateValueToTimeStamp(value) : value,
      },
    });
  };

  render() {
    return (
      <section className="event-app">
        <header className="event-app__header">
          <button onClick={this.hanldeAddEvent}>Add Event</button>
        </header>
        <table className="event-app__table">
          <thead>
            <tr>
              {this.state.dataCol?.map((col, index) => (
                <th key={`${col}`}>{col}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {this.state.events?.map((event) => (
              <tr key={event.id}>
                <td>
                  <input type="text" disabled value={event.eventName} />
                </td>
                <td>
                  <input
                    type="date"
                    disabled
                    value={convertTimestampToDateValue(event.startDate)}
                  />
                </td>
                <td>
                  <input
                    type="date"
                    disabled
                    value={convertTimestampToDateValue(event.endDate)}
                  />
                </td>
                <td>
                  <button>Edit</button>
                  <button>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            {this.state.isShowAddEventRow ? (
              <tr>
                <td>
                  <input
                    type="text"
                    name="eventName"
                    value={this.state.newEvent.eventName}
                    onChange={this.hanldeOnChange}
                  />
                </td>
                <td>
                  <input
                    onChange={this.hanldeOnChange}
                    type="date"
                    value={convertTimestampToDateValue(
                      this.state.newEvent.startDate
                    )}
                    name="startDate"
                  />
                </td>
                <td>
                  <input
                    onChange={this.hanldeOnChange}
                    name="endDate"
                    type="date"
                    value={convertTimestampToDateValue(
                      this.state.newEvent.endDate
                    )}
                  />
                </td>
                <td>
                  <button
                    onClick={() => {
                      console.log('click');
                      this.setState({
                        newEvent: {
                          ...this.state.newEvent,
                          eventName: 'Hello',
                        },
                      });
                    }}
                  >
                    Save
                  </button>
                  <button>Close</button>
                </td>
              </tr>
            ) : null}
          </tfoot>
        </table>
      </section>
    );
  }
}

export default EventApp;

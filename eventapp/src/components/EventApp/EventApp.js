import React from 'react';
import {
  getAllEvents,
  addNewEvent,
  deleteEvent,
} from '../../services/event.api';

import { EventData } from '../../models/EventData';

class EventApp extends React.Component {
  state = {
    events: [],
    dataCol: ['Event Name', 'Start Date', 'End Date', 'Actions'],
    isShowAddEventRow: false,
    newEvent: new EventData('', '' + Date.now(), '' + Date.now()),
  };

  fetchAllEvents = () => {
    getAllEvents().then((data) => {
      const events = data.map(({ eventName, startDate, endDate, id }) => {
        const newEvent = new EventData(eventName, startDate, endDate, id);
        newEvent.isEditing = false;
        newEvent.editEvent = new EventData(eventName, startDate, endDate, id);
        return newEvent;
      });

      this.setState({
        events,
      });
    });
  };

  componentDidMount() {
    this.fetchAllEvents();
  }

  hanldeAddEvent = () => {
    this.setState({
      isShowAddEventRow: true,
    });
  };
  hanldeOnChange = ({ target: { name, value } }) => {
    this.setState({
      newEvent: {
        ...this.state.newEvent,
        [name]: value,
      },
    });
  };

  hanldeDelete = (id) => {
    deleteEvent(id)
      .then(() => {
        this.fetchAllEvents();
      })
      .catch((error) => {
        console.warn(error);
      });
  };

  handleClose = () => {
    this.setState({
      isShowAddEventRow: false,
      newEvent: new EventData('', '' + Date.now(), '' + Date.now()),
    });
  };

  hanldeSaveAddNew = () => {
    const { eventName, startDate, endDate } = this.state.newEvent;
    const newEvent = new EventData(eventName, startDate, endDate);
    newEvent.parseTimeStamp();
    if (newEvent.isValidForSave()) {
      addNewEvent(newEvent).then((data) => {
        //this.setState({ events: [data, ...this.state.events] });
        this.fetchAllEvents();
      });
      this.handleClose();
    } else {
      alert('inValid');
    }
  };
  hanldeEdit = (id) => {
    this.setState({
      events: this.state.events.map((event) => {
        if (event.id === id) {
          return { ...event, isEditing: true };
        } else {
          return event;
        }
      }),
    });
  };

  hanldeOnChangeEdit = ({ target: { name, value } }, id) => {
    this.setState({
      events: this.state.events.map((event) => {
        if (event.id === id) {
          return { ...event, editEvent: { ...event.editEvent, [name]: value } };
        } else {
          return event;
        }
      }),
    });
  };

  hanldeCancel = (id) => {
    this.setState({
      events: this.state.events.map((event) => {
        if (event.id === id) {
          return { ...event, isEditing: false };
        } else {
          return event;
        }
      }),
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
            {this.state.events?.map((event) =>
              event.isEditing ? (
                <tr key={event.id}>
                  <td>
                    <input
                      type="text"
                      name="eventName"
                      value={event.editEvent.eventName}
                      onChange={(e) => this.hanldeOnChangeEdit(e, event.id)}
                    />
                  </td>
                  <td>
                    <input
                      type="date"
                      name="startDate"
                      value={event.editEvent.startDate}
                    />
                  </td>
                  <td>
                    <input
                      type="date"
                      name="endDate"
                      value={event.editEvent.endDate}
                    />
                  </td>
                  <td>
                    <button>Save</button>
                    <button onClick={() => this.hanldeCancel(event.id)}>
                      Cancel
                    </button>
                  </td>
                </tr>
              ) : (
                <tr key={event.id}>
                  <td>
                    <input type="text" disabled value={event.eventName} />
                  </td>
                  <td>
                    <input type="date" disabled value={event.startDate} />
                  </td>
                  <td>
                    <input type="date" disabled value={event.endDate} />
                  </td>
                  <td>
                    <button onClick={() => this.hanldeEdit(event.id)}>
                      Edit
                    </button>
                    <button onClick={() => this.hanldeDelete(event.id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              )
            )}
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
                    value={this.state.newEvent.startDate}
                    name="startDate"
                  />
                </td>
                <td>
                  <input
                    onChange={this.hanldeOnChange}
                    name="endDate"
                    type="date"
                    value={this.state.newEvent.endDate}
                  />
                </td>
                <td>
                  <button onClick={this.hanldeSaveAddNew}>Save</button>
                  <button onClick={this.handleClose}>Close</button>
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

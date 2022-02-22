import React from 'react';
import './EventApp.css';
import { withEventData } from '../../hoc/withEventData';

import { EventData } from '../../models/EventData';
import EventEditRow from '../EventEditRow/EventEditRow';
import EventRow from '../EventRow/EventRow';
import EventAddRow from '../EventAddRow/EventAddRow';
import EventDataRow from '../EventDataRow/EventDataRow';
import Button from '../Button/Button';

class EventApp extends React.Component {
  state = {
    dataCol: ['Event Name', 'Start Date', 'End Date', 'Actions'],
    isShowAddEventRow: false,
    newEvent: new EventData('', '' + Date.now(), '' + Date.now()),
  };

  hanldeAddEvent = () => {
    this.setState({
      isShowAddEventRow: true,
    });
  };
  hanldeOnChange = (newEvent) => {
    this.setState({
      newEvent: {
        ...newEvent,
      },
    });
  };

  handleCloseAddNew = () => {
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
      this.props.handleAddEvent(newEvent).then((data) => {
        this.handleCloseAddNew();
      });
    } else {
      alert('inValid');
    }
  };

  handleEditSave = (editEventObj) => {
    this.props.handleUpdateEvent(editEventObj).then((data) => {
      this.props.handleSetEdit(editEventObj, false);
    });
  };

  render() {
    const {
      events,
      handleOnChangeEditEvent,
      handleDeleteEvent,
      handleSetEdit,
    } = this.props;
    return (
      <section className="event-app">
        <header className="event-app__header">
          <Button onClick={this.hanldeAddEvent}>Add Event</Button>
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
            {events?.map((event) =>
              event.isEditing ? (
                <EventDataRow
                  key={event.id}
                  event={event.editEvent}
                  actions={[
                    {
                      actionName: 'Save',
                      actionFn: this.handleEditSave,
                    },
                    {
                      actionName: 'Cancel',
                      actionFn: () => handleSetEdit(event, false),
                    },
                  ]}
                  handleOnchange={handleOnChangeEditEvent}
                ></EventDataRow>
              ) : (
                <EventDataRow
                  key={event.id}
                  event={event}
                  actions={[
                    {
                      actionName: 'Edit',
                      actionFn: () => handleSetEdit(event, true),
                    },
                    {
                      actionName: 'Delete',
                      actionFn: handleDeleteEvent,
                    },
                  ]}
                ></EventDataRow>
              )
            )}
          </tbody>
          <tfoot>
            {this.state.isShowAddEventRow ? (
              <EventDataRow
                event={this.state.newEvent}
                actions={[
                  {
                    actionName: 'Save',
                    actionFn: this.hanldeSaveAddNew,
                  },
                  {
                    actionName: 'Close',
                    actionFn: this.handleCloseAddNew,
                  },
                ]}
                handleOnchange={this.hanldeOnChange}
              ></EventDataRow>
            ) : null}
          </tfoot>
        </table>
      </section>
    );
  }
}

const EventManger = withEventData(EventApp);

export default EventManger;

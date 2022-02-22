import React from 'react';
import {
  getAllEvents,
  addNewEvent,
  deleteEvent,
  editEvent,
} from '../services/event.api';
import { EventData } from '../models/EventData';

export const withEventData = (WrappedComponent) => {
  return class NewComponent extends React.Component {
    state = {
      events: [],
    };
    componentDidMount() {
      this.fetchAllEvents();
    }
    generateEditEventstate = (event) => {
      event.isEditing = false;
      event.editEvent = new EventData(
        event.eventName,
        event.startDate,
        event.endDate,
        event.id
      );
    };
    fetchAllEvents = () => {
      getAllEvents().then((data) => {
        const events = data.map(({ eventName, startDate, endDate, id }) => {
          const newEvent = new EventData(eventName, startDate, endDate, id);
          this.generateEditEventstate(newEvent);
          return newEvent;
        });

        this.setState({
          events,
        });
      });
    };

    handleUpdateEvent = (updateEvent) => {
      return editEvent(updateEvent).then((data) => {
        this.setState({
          events: this.state.events.map((event) => {
            if (event.id === data.id) {
              return {
                ...event,
                ...data,
              };
            } else {
              return event;
            }
          }),
        });
      });
    };

    handleDeleteEvent = (deletedEvent) => {
      return deleteEvent(deletedEvent).then((data) => {
        this.setState({
          events: this.state.events.filter((event) => {
            if (event.id === deletedEvent.id) {
              return false;
            } else {
              return true;
            }
          }),
        });
      });
    };
    handleAddEvent = (addEvent) => {
      return addNewEvent(addEvent).then(
        ({ eventName, startDate, endDate, id }) => {
          const newEvent = new EventData(eventName, startDate, endDate, id);
          this.generateEditEventstate(newEvent);
          this.setState({
            events: [...this.state.events, newEvent],
          });
        }
      );
    };

    handleSetEdit = (setEditEvent, isEdit) => {
      this.setState({
        events: this.state.events.map((event) => {
          if (event.id === setEditEvent.id) {
            return { ...event, isEditing: isEdit };
          } else {
            return event;
          }
        }),
      });
    };

    handleOnChangeEditEvent = (editEvent) => {
      console.log(editEvent);
      this.setState({
        events: this.state.events.map((event) => {
          if (event.id === editEvent.id) {
            return {
              ...event,
              editEvent: { ...editEvent },
            };
          } else {
            return event;
          }
        }),
      });
    };

    handleOnChangeEvent = (changeEvent) => {
      this.setState({
        events: this.state.events.map((event) => {
          if (event.id === changeEvent.id) {
            return {
              ...changeEvent,
            };
          } else {
            return event;
          }
        }),
      });
    };

    render() {
      const { events } = this.state;
      return (
        <WrappedComponent
          {...this.props}
          handleSetEdit={this.handleSetEdit}
          handleOnChangeEvent={this.handleOnChangeEvent}
          handleOnChangeEditEvent={this.handleOnChangeEditEvent}
          handleAddEvent={this.handleAddEvent}
          handleDeleteEvent={this.handleDeleteEvent}
          handleUpdateEvent={this.handleUpdateEvent}
          events={events}
        ></WrappedComponent>
      );
    }
  };
};

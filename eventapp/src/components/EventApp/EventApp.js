import React, { useEffect, useState } from 'react';
import './EventApp.css';
import { withEventData } from '../../hoc/withEventData';

import { EventData } from '../../models/EventData';

import EventDataRow from '../EventDataRow/EventDataRow';
import EventTable from '../EventTable/EventTable';
import Button from '../Button/Button';
import { getAllEvents, addNewEvent,
  deleteEvent,
  editEvent, } from '../../services/event.api';
import useEventData from '../../hooks/useEventData';



function EventApp(props) {


  const [dataCol, setDataCol] = useState(['Event Name', 'Start Date', 'End Date', 'Actions']);
  const [isShowAddEventRow, setIsShowAddEventRow] = useState(false);
  const [newEvent, setNewEvent] = useState(new EventData('', '' + Date.now(), '' + Date.now()));
  //const [events,setEvents] = useState([]);

  const {
    events,
    generateEditEventstate,
    handleUpdateEvent,
    handleDeleteEvent,
    handleAddEvent,
    handleSetEdit,
    handleOnChangeEditEvent,
} = useEventData();
  //-------------------------------------------------------------
  const hanldeAddEvent = () => {
    setIsShowAddEventRow(true);
  };
  const hanldeOnChange = (newEvent) => {
    setNewEvent(newEvent);
  };
  const handleCloseAddNew = () => {
    setIsShowAddEventRow(false);
    setNewEvent(new EventData('', '' + Date.now(), '' + Date.now()));
  };

  const hanldeSaveAddNew = () => {
    const { eventName, startDate, endDate } = newEvent;
    const myNewEvent = new EventData(eventName, startDate, endDate);
    myNewEvent.parseTimeStamp();
    if (myNewEvent.isValidForSave()) {
      handleAddEvent(myNewEvent).then((data) => {
        handleCloseAddNew();
      });
    } else {
      alert('inValid');
    }
  };

  const handleEditSave = (editEventObj) => {
      handleUpdateEvent(editEventObj).then((data) => {
      //handleSetEdit(editEventObj, false);
    });
  };

  const renderHeader = () => <Button onClick={hanldeAddEvent}>Add Event</Button>;
  const renderFooter = () => {
    if (isShowAddEventRow) {
      return (
        <EventDataRow
          event={newEvent}
          actions={[
            {
              actionName: 'Save',
              actionFn: hanldeSaveAddNew,
            },
            {
              actionName: 'Close',
              actionFn: handleCloseAddNew,
            },
          ]}
          handleOnchange={hanldeOnChange}
        ></EventDataRow>
      );
    } else {
      return null;
    }
  };
  console.log("realluy:",events);
  return (
    <EventTable
      dataCol={dataCol}
      renderFooter={renderFooter}
      renderHeader={renderHeader}
    >
      {events?.map((event) =>
        event.isEditing ? (
          <EventDataRow
            key={event.id}
            event={event.editEvent}
            actions={[
              {
                actionName: 'Save',
                actionFn: handleEditSave,
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
    </EventTable>
  );
}

//const EventManger = withEventData(EventApp);

export default EventApp;

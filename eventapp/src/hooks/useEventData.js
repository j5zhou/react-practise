import React, { useEffect, useState } from 'react';
import { EventData } from '../models/EventData';
import { getAllEvents, addNewEvent,
    deleteEvent,
    editEvent, } from "../services/event.api";

import { setEvents } from '../redux/eventSlice';
import { useSelector, useDispatch } from 'react-redux'


export default function useEventData(){

    const events = useSelector(state => state.event.value);
    const dispatch = useDispatch();

    //const [events,setEvents] = useState([])
    const generateEditEventstate = (event) => {
        
        event.isEditing = false;
        event.editEvent = new EventData(
          event.eventName,
          event.startDate,
          event.endDate,
          event.id
        );
        
      };
    const handleUpdateEvent = (updateEvent) => {
        
        return editEvent(updateEvent).then((data) => {
            dispatch(setEvents(events.map((event) => {
              if (event.id === data.id) {
                return {
                  ...event,
                  ...data,
                  isEditing:false,
                };
              } else {
                return event;
              }
            }),
          ));
          
        });
        
      };
    const handleDeleteEvent = (deletedEvent) => {
        
        return deleteEvent(deletedEvent).then((data) => {
            dispatch(setEvents(events.filter((event) => {
              if (event.id === deletedEvent.id) {
                return false;
              } else {
                return true;
              }
            }),
          ));
        });
        
      };
    
      // API CALL
      const handleAddEvent = (addEvent) => {
        
        return addNewEvent(addEvent).then(
          ({ eventName, startDate, endDate, id }) => {
            const newEvent = new EventData(eventName, startDate, endDate, id);
            generateEditEventstate(newEvent);
            dispatch(setEvents([...events, newEvent]));
          }
        );
        
      };
    
      const handleSetEdit = (setEditEvent, isEdit) => {
          
        dispatch(setEvents(events.map((event) => {
            if (event.id === setEditEvent.id) {
              return { ...event, isEditing: isEdit };
            } else {
              return event;
            }
          }),
        ));
        
      };
    
      const handleOnChangeEditEvent = (editEvent) => {
          
        console.log(editEvent);
        dispatch(setEvents(events.map((event) => {
            if (event.id === editEvent.id) {
              return {
                ...event,
                editEvent: { ...editEvent },
              };
            } else {
              return event;
            }
          })
        ));
        
      };
      //component did mount
      useEffect(()=>{
          
        const { fetchResult, controller } = getAllEvents();
        fetchResult.then((data) => {
          const tmp_events = data.map(({ eventName, startDate, endDate, id }) => {
            const newEvent = new EventData(eventName, startDate, endDate, id);
            generateEditEventstate(newEvent);
            return newEvent;
          });
          dispatch(setEvents(tmp_events));
        });
        //unmount
        return ()=>{
          controller.abort();
        }
      },[]);
    
    return {
        events,
        generateEditEventstate,
        handleUpdateEvent,
        handleDeleteEvent,
        handleAddEvent,
        handleSetEdit,
        handleOnChangeEditEvent,
    }
}
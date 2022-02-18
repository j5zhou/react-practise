import React from 'react';
import Button from '../Button/Button';

class EventDataRow extends React.Component {
  render() {
    const {
      event,
      handleOnchange,
      actions: [actionOne, actionTwo],
    } = this.props;
    console.log(handleOnchange);

    return (
      <tr key={event.id}>
        <td>
          <input
            type="text"
            name="eventName"
            disabled={handleOnchange ? false : true}
            value={event.eventName}
            onChange={
              handleOnchange ? (e) => handleOnchange(e, event) : () => {}
            }
          />
        </td>
        <td>
          <input
            type="date"
            name="startDate"
            value={event.startDate}
            disabled={handleOnchange ? false : true}
            onChange={
              handleOnchange ? (e) => handleOnchange(e, event) : () => {}
            }
          />
        </td>
        <td>
          <input
            type="date"
            name="endDate"
            value={event.endDate}
            disabled={handleOnchange ? false : true}
            onChange={
              handleOnchange ? (e) => handleOnchange(e, event) : () => {}
            }
          />
        </td>
        <td>
          <Button onClick={() => actionOne.actionFn(event)}>
            {actionOne.actionName}
          </Button>
          <Button onClick={() => actionTwo.actionFn(event)}>
            {actionTwo.actionName}
          </Button>
        </td>
      </tr>
    );
  }
}

export default EventDataRow;

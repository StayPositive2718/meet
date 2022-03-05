import React, { Component } from 'react';
import Event from './Event.js';

class EventList extends Component {
  render() {
    const { events } = this.props;
    return (
      <ul className="eventlist">
        {events.map(event =>
          <li key={event.id}>
            <Event event={event} />
          </li>)}
      </ul>
    );
  }
}

export default EventList;
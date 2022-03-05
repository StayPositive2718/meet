import React, { Component } from 'react';

import EventList from './EventList.js';
import CitySearch from './CitySearch.js';
import NumberOfEvents from './NumberOfEvents';

import './nprogress.css';
import './App.css';
import { extractLocations, getEvents } from './api.js';

class App extends Component {
  state = {
    events: [],
    locations: [],
    eventcount: 10,
    currentLocation: 'all'
  }

  componentDidMount() {
    this.mounted = true;
    getEvents().then((events) => {
      if (this.mounted) {
        this.setState({
          events: events.slice(0, this.state.eventcount),
          locations: extractLocations(events)
        });
      }
    });
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  updateEvents = (location) => {
    getEvents().then((events) => {
      const locationEvents = (location === 'all') ?
        events :
        events.filter((event) => event.location === location);
      if (this.mounted) {
        this.setState({
          events: locationEvents.slice(0, this.state.eventcount),
          currentLocation: location
        });
      }
    });
  }
  setEventCount = (eventcount) => {
    this.setState({
      eventcount: eventcount
    });
    this.updateEvents(this.state.currentLocation);
  }

  render() {
    return (
      <div className="App">
        <CitySearch locations={this.state.locations} updateEvents={this.updateEvents} />
        <EventList events={this.state.events} />
        <NumberOfEvents setEventCount={this.setEventCount} placeholder={this.state.eventcount} />
      </div>
    );
  }
}

export default App;

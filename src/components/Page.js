import React, {PureComponent} from 'react';
import Calendar from './Calendar';
import EventDetailOverlay from './EventDetailOverlay';
import {filterEventsByDay, getEventFromEvents, getDisplayDate} from '../utils';
import DATA_SET from '../utils/data';

import './Page.css';

const DayNavigator = ({dateDisplay, onPrev, onNext}) => {
    return (
        <nav className="page__nav">
            <button
                className="page__nav-button page__prev-day"
                title="Go to previous day"
                onClick={onPrev}
            />
            <h2 className="page__date">{dateDisplay}</h2>
            <button
                className="page__nav-button page__next-day"
                title="Go to next day"
                onClick={onNext}
            />
        </nav>
    );
};

export default class Page extends PureComponent {
    state = {
        // unfiltered list of events
        events: DATA_SET,

        // The currently selected day represented by numerical timestamp
        day: Date.now(),

        // The currently selected event in the agenda
        // (mainly to trigger event detail overlay)
        selectedEventId: undefined
    }

    removeNoScroll() {
        //remove class so calendar is scrollable once overlay is closed
        let page = document.querySelector('body')
            page.classList.remove('no-scroll')
    }

    _handleSelectEvent(selectedEventId) {
        this.setState({selectedEventId});
    }

    
    _handleEventDetailOverlayClose(e) {
        this.setState({selectedEventId: undefined});
        this.removeNoScroll();
    }

    _handleKeyDown(e) {
        //close overlay on ESC
        if (e.keyCode === 27) {
            this.setState({selectedEventId: undefined})
        }
        this.removeNoScroll();
    }

    _handlePrev() {
        // TODO: Update this.state.day to go back 1 day so previous button works
        this.setState({day: this.state.day - 86400000})
    }

    _handleNext() {
        // TODO: Update this.state.day to go forward 1 day so next button works
        this.setState({day: this.state.day + 86400000})
    }

    render() {
        let {events, day, selectedEventId} = this.state;
        let filteredEvents = filterEventsByDay(events, day);
        let selectedEvent = getEventFromEvents(events, selectedEventId);
        let eventDetailOverlay;

        if (selectedEvent) {
           let page = document.querySelector('body')
           page.classList.add('no-scroll')
            eventDetailOverlay = (
                <EventDetailOverlay
                    event={selectedEvent}
                    onClose={this._handleEventDetailOverlayClose.bind(this)}
                    onEsc={this._handleKeyDown.bind(this)}
                />
            );
        }

        return (
            <div className="page">
                <header className="page__header">
                    <h1 className="page__title">Daily Agenda</h1>
                </header>
                <DayNavigator
                    dateDisplay={getDisplayDate(day)}
                    onPrev={this._handlePrev.bind(this)}
                    onNext={this._handleNext.bind(this)}
                />
                <Calendar events={filteredEvents} onSelectEvent={this._handleSelectEvent.bind(this)} />
                {eventDetailOverlay}
            </div>
        );
    }
}

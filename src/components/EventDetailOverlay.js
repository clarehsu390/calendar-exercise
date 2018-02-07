import React, {PureComponent, PropTypes} from 'react';
import {EVENT_PROP_TYPE} from './constants';
import {getDisplayDate, getDisplayHour} from '../utils';

import './EventDetailOverlay.css';

export default class EventDetailOverlay extends PureComponent {
    static propTypes = {
        event: EVENT_PROP_TYPE.isRequired,
        onClose: PropTypes.func.isRequired,
        onEsc: PropTypes.func.isRequired,
        onToggle: PropTypes.func.isRequired
    }

    componentDidMount() {
        let {onEsc, onClose, onToggle} = this.props;
        let calendar = document.querySelector('.calendar')
        document.addEventListener('keydown', onEsc)
        calendar.addEventListener('click', onClose)

        
    }

    render() {
        let {event, onClose, onEsc} = this.props;
        let {title, description, start, color, hours} = event;
        let displayDate = getDisplayDate(start);
        let startHour = (new Date(start)).getHours();

        // TODO: Fix. If hours was other than 1 the UI would break
        let endHour = startHour + hours;

        let startHourDisplay = getDisplayHour(startHour);
        let endHourDisplay = getDisplayHour(endHour);

        let displayDateTime = `${displayDate} ${startHourDisplay} - ${endHourDisplay}`;

        // TODO: The event label color should match the event color
        // TODO: Add appropriate ARIA tags to overlay/dialog
        // TODO: Support clicking outside of the overlay to close it
        // TODO: Support clicking ESC to close it
        return (
            <section className="event-detail-overlay" role="dialog" aria-labelledby="dialog-title" aria-describedby="dialog-description">
                <div className="event-detail-overlay__container">
                    <button
                        className="event-detail-overlay__close"
                        title="Close detail view"
                        aria-label="Close Navigation"
                        onClick={onClose}
                    />
                    <div>
                        {displayDateTime}
                        <span
                            className="event-detail-overlay__color"
                            title={`Event label color: ${color}`}
                        />
                    </div>
                    <h1 className="event-detail-overlay__title">
                        {title}
                    </h1>
                    <p>{description}</p>
                </div>
            </section>
        );
    }
}

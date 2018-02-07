import React, {PureComponent, PropTypes} from 'react';
import {EVENT_PROP_TYPE} from './constants';

import './TimeSlotEvent.css';

export default class TimeSlotEvent extends PureComponent {
    static propTypes = {
        event: EVENT_PROP_TYPE.isRequired,
        onSelect: PropTypes.func.isRequired,
    }

    render() {
        let {
            event: {title, color, start},
            onSelect,
        } = this.props;

        let startTime = (new Date(start))
        let now = (new Date())

        if (now > startTime) {
            return (
                <button className={`time-slot-event time-slot-event--${color} faded`} onClick={onSelect}>
                    {title}
                </button>
            );
        } else {
            return (
                <button className={`time-slot-event time-slot-event--${color}`} onClick={onSelect}>
                    {title}
                </button>
            );
        }
        
        // TODO: Need a way to determine that the event is in the past so that it
        // can be displayed faded-out
    
        
    }
}

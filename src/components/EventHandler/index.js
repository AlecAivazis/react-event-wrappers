/* common react imports */
import React from 'react/addons'
/* misc third party imports */
import {capitalize} from 'lodash'


/**
 * Wrapper component to add event handlers.  Must wrap exactly one child.
 * @example
 * <EventHandler events={['mouseUp', 'mouseDown']}>
 *   <MyComponent />
 * </EventHandler>
 */
class EventHandler extends React.Component {
    constructor(...constructor_args) {
        // instantiate `this`
        super(...constructor_args)
        // ensure we are wrapping only one child
        React.Children.only(this.props.children)
    }

    render() {
        // use `this.props.events` as list of events
        let events = this.props.events
        // unless it is a string
        if (typeof events === 'string') {
            // in which case use you need to wrap it in an array
            events = [events]
        }

        // e.g. ['onMouseDown', 'onMouseUp']
        const on_capitalized_events = events.map(
            event => 'on' + capitalize(event)
        )

        let listeners = {}
        for (const event of on_capitalized_events) {
            if (this.props.children.type.prototype[event]) {
                listeners[event] = this.props.children[event]
                // .type.prototype[event]
                    // ???
                    // .bind(this.props.children)
            }
        }

        return (<div {...listeners}>
            {this.props.children}
        </div>)
    }
}


// export decorator
export default EventHandler


// end of file

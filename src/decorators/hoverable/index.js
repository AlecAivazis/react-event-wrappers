// local imports
import {makeEventDecorator} from 'util'


/**
 * Decorator for adding `hover` prop to a React component.
 */
export const hoverable = makeEventDecorator({
    state_vars: {
        hover: false,
    },
    event_handlers: {
        onMouseEnter: function () {
            this.setState({hover: true})
        },
        onMouseLeave: function () {
            this.setState({hover: false})
        },
    },
    display_name_prefix: 'Hoverable',
})


// end of file

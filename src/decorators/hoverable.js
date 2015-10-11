// local imports
import {makeEventDecorator} from 'util'


/**
 * Decorator for adding `hover` prop to a React component.
 */
export default makeEventDecorator({
    state_vars: {
        hover: false,
    },
    event_handlers: {
        onMouseEnter() {
            this.setState({hover: true})
        },
        onMouseLeave() {
            this.setState({hover: false})
        },
    },
    display_name_prefix: 'Hoverable',
})


// end of file

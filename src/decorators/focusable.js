// local imports
import {makeEventDecorator} from 'util'


/**
 * Decorator for adding `focus` prop to a React component.
 */
export default makeEventDecorator({
    state_vars: {
        focus: false,
    },
    event_handlers: {
        onFocus() {
            this.setState({focus: true})
        },
        onBlur() {
            this.setState({focus: false})
        },
    },
    display_name_prefix: 'Focusable',
})


// end of file

// local imports
import {makeEventDecorator} from 'util'


/**
 * Decorator for adding `focus` prop to a React component.
 */
export default const makeEventDecorator({
    state_vars: {
        focus: false,
    },
    event_handlers: {
        onFocus: function () {
            this.setState({focus: true})
        },
        onBlur: function () {
            this.setState({focus: false})
        },
    },
    display_name_prefix: 'Focusable',
})


// end of file

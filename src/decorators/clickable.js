// local imports
import {makeEventDecorator} from 'util'


/**
 * Decorator for adding `click` prop to a React component.
 */
export default makeEventDecorator({
    state_vars: {
        click: false,
    },
    event_handlers: {
        onMouseDown: function () {
            this.setState({click: true})
        },
        onMouseUp: function () {
            this.setState({click: false})
        },
    },
    display_name_prefix: 'Clickable',
})


// end of file

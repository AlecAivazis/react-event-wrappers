// local imports
import {makeEventDecorator} from 'util'


/**
 * Decorator for adding `click` prop to a React component.
 */
export default makeEventDecorator({
    initial_state: {
        click: false,
    },
    event_handlers: {
        onMouseDown() {
            this.setState({click: true})
        },
        onMouseUp() {
            this.setState({click: false})
        },
    },
    display_name_prefix: 'Clickable',
})


// end of file

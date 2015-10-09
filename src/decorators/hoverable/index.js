// local imports
import {makeEventDecorator} from 'util'


/**
 * Decorator for adding `hover` prop to a React component.
 */
export const hoverable = makeEventDecorator({
    state_var: 'hover',
    state_var_initial: false,
    to_true_event: 'onMouseEnter',
    to_false_event: 'onMouseLeave',
    display_name_prefix: 'Hoverable',
})


// end of file

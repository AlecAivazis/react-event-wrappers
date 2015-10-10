// react imports
import React from 'react'


/**
 * Returns a decorator that adds event handlers to components.
 */
export default function makeEventDecorator({state_vars, events, display_name_prefix}) {
    // return the decorator (which takes the wrapped component as its only arg)
    return (Wrapped) => {
        // the component which wraps the wrapped component
        class Wrapper extends React.Component {
            constructor(...args) {
                // instantiate this
                super(...args)
                // set initial state
                this.state = Object.keys(state_vars).reduce((state, key) => {
                    const state_var = state_vars[key]
                    return {
                        ...state,
                        [state_var.name]: state_var.initial,
                    }
                }, {})
            }

            render() {
                // props to put on the wrapper component
                const wrapper_props = Object.keys(events).reduce((props, key) => {
                    const event = events[key]
                    return {
                        ...props,
                        [event.name]: event.handler.bind(this),
                    }
                }, {})
                // props to put on the wrapped component
                const wrapped_props = {
                    ...this.props,
                    ...this.state,
                }

                return (
                    <div {...wrapper_props}>
                        <Wrapped {...wrapped_props} />
                    </div>
                )
            }
        }

        // displayed name of wrapped component
        const wrapped_name = Wrapped.displayName
            || Wrapped.name
            || 'Component'
        // overwrite display name of wrapper component to be more informative
        Wrapper.displayName = `${display_name_prefix}${wrapped_name}`

        // return wrapper component
        return Wrapper
    }
}


// end of file

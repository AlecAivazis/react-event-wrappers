// react imports
import React from 'react'


/**
 * Returns a decorator that adds event handlers to components.
 */
export function makeEventDecorator(options) {
    const {
        state_var,
        state_var_initial,
        to_true_event,
        to_false_event,
        display_name_prefix,
    } = options

    // return the decorator (which takes the wrapped component as its only arg)
    return (WrappedComponent) => {
        // the component which wraps the wrapped component
        class WrapperComponent extends React.Component {
            constructor(...args) {
                // instantiate this
                super(...args)
                // set initial state
                this.state = {
                    [state_var]: state_var_initial,
                }
            }

            render() {
                // props to put on the wrapper component
                const wrapper_component_props = {
                    [to_true_event]: () => this.setState({
                        [state_var]: true,
                    }),
                    [to_false_event]: () => this.setState({
                        [state_var]: false,
                    }),
                }
                // props to put on the wrapped component
                const wrapped_component_props = {
                    ...this.props,
                    ...this.state,
                }

                return (
                    <div {...wrapper_component_props}>
                        <WrappedComponent {...wrapped_component_props} />
                    </div>
                )
            }
        }

        // displayed name of wrapped component
        const wrapped_component_name = WrappedComponent.displayName
            || WrappedComponent.name
            || 'Component'
        // overwrite display name of wrapper component to be more informative
        WrapperComponent.displayName = `${display_name_prefix}${wrapped_component_name}`

        // return wrapper component
        return WrapperComponent
    }
}


// end of file

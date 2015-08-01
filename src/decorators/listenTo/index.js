/* common react imports */
import React from 'react/addons'
/* misc third party imports */
import {assign, capitalize, snakeCase} from 'lodash'


/**
 * Creates a decorator that will add event listeners to a React component.
 * @param {string} event - The react event to listen to.
 * @returns {function} The decorator to wrap a component with.
 */
function listenTo(event) {
    // e.g. "mouse_down"
    const snake_cased_event = snakeCase(event)
    // e.g. "onMouseDown"
    const on_capitalized_event = 'on' + capitalize(event)

    // return decorator
    return function(Component) {
        // define wrapper component
        class WrapperComponent extends React.Component {
            constructor() {
                super(...arguments)

                this.state = {}
                this.state[snake_cased_event] = false
                // or true ????
            }

            render() {
                // hash of props to pass to wrapped component
                // should state overwrite props or visa versa ????
                let props = assign({}, this.props, this.state)
                // wrapped component
                let child = (<Component {...props} />)

                // hash of listeners for the wrapping `div`
                let listeners = {}
                // set listener for `event`
                listeners[on_capitalized_event] = (...listener_args) => {
                    let new_state = {}
                    new_state[snake_cased_event] = true
                    // or false ????
                    // update state, then call child implementation (if any)
                    this.setState(new_state, () => {
                        // if wrapped component has implemented a handler
                        if (child.type.prototype[on_capitalized_event]) {
                            // call it, and pass args to it appropriately
                            child.type.prototype[on_capitalized_event](
                                ...listener_args
                            )
                        }
                    })
                }

                return (<div {...listeners}>
                    {child}
                </div>)
            }
        }

        // TODO: rename wrapping component with a more usefull display name

        // return wrapper component
        return WrapperComponent
    }
}


// export decorator
export default listenTo


// end of file

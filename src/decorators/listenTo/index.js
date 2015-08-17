/* common react imports */
import React from 'react/addons'
/* misc third party imports */
import {capitalize} from 'lodash'


/**
 * Find the first decendant which is not an event-wrapper.
 * @param {ReactElement} element - The react element whose decendants you wish
 * to check.
 **/
function find_true_child(element) {
    // if wrapped component has not been flagged
    if (!element._is_react_event_wrapper) {
        // it is the true child
        return element
    }
    // otherwise continue down the chain
    return find_true_child(element.props.children)
}

/**
 * Creates a decorator that will add event listeners to a React component.
 * @param {string[]} events - The react events to listen to.
 * @returns {function} The decorator to wrap a component with.
 */
function listenTo(...args) {
    // use args as list of events
    let events = args
    // if user passes single argument that is an array
    if (args.length === 1 && args[0].constructor === Array) {
        // use it as list of events instead
        events = args[0]
    }

    // e.g. ["onMouseDown", "onMouseUp"]
    const on_capitalized_events = events.map(event => 'on' + capitalize(event))

    // return decorator
    return function(Component) {
        // define wrapper component
        class WrapperComponent extends React.Component {
            constructor(...constructor_args) {
                // instantiate this
                super(...constructor_args)
                // add the wrapper flag
                this._is_react_event_wrapper = true
            }

            render() {
                // wrapped component
                const first_child = <Component {...this.props} />
                // first decendant that isnt just one of our wrappers
                const true_child = find_true_child(first_child)

                // hash of listeners for the wrapping `div`
                let listeners = {}
                // iterate over the list of events
                on_capitalized_events.forEach((event) => {
                    // if true child has implemented a handler
                    if (true_child.type.prototype[event]) {
                        // store true child handler implementation
                        listeners[event] = true_child.type.prototype[event]
                            // and bind it to the true child instance
                            .bind(true_child)
                    }
                })

                return (<div {...listeners}>
                    {first_child}
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

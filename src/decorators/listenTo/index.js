/* common react imports */
import React from 'react/addons'
/* local imports */
import EventHandler from '../../components/EventHandler'


/**
 * Creates a decorator that will add event listeners to a React component.
 * @param {string[]} events - The react events to listen to.
 * @returns {function} The decorator to wrap a component with.
 */
function listenTo(...args) {
    // use args as list of events
    let events = args
    // unless user passes single argument that is an array
    if (args.length === 1 && args[0].constructor === Array) {
        // in which case we use that single arg as list of events instead
        events = args[0]
    }

    // return decorator
    return function(Component) {
        // define wrapper component
        class WrapperComponent extends React.Component {
            render() {
                return (<EventHandler events={events}>
                    <Component {...this.props}/>
                </EventHandler>)
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

/* common react imports */
import React from 'react/addons'
/* misc third party imports */
import {assign} from 'lodash'
/* local imports */
import listenTo from '../listenTo'


/**
 * Decorator for adding `hover` state variable to a React component.
 * @param {ReactComponent} Component - The react component to wrap.
 * @returns {ReactComponent} The wrapped react component.
 */
function hoverable(Component) {
    class HoverableComponent extends React.Component {
        constructor(...args) {
            // instantiate this
            super(...args)
            // set initial state
            this.state = {hover: false}
            // // add the wrapper flag
            // this._is_react_event_wrapper = true
        }

        onMouseEnter() {
            this.setState({hover: true})
        }

        onMouseLeave() {
            this.setState({hover: false})
        }

        render() {
            const props = assign({}, this.props, this.state)

            return <Component {...props} />
        }
    }

    return listenTo('mouseEnter', 'mouseLeave')(HoverableComponent)
}


// export decorator
export default hoverable


// end of file

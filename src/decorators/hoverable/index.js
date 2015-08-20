/* common react imports */
import React from 'react/addons'
/* misc third party imports */
import {assign} from 'lodash'


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
        }

        render() {
            return (
                <div
                    onMouseEnter={() => this.setState({hover: true})}
                    onMouseLeave={() => this.setState({hover: false})}
                >
                    <Component {...assign({}, this.props, this.state)} />
                </div>
            )
        }
    }

    return HoverableComponent
}


// export decorator
export default hoverable


// end of file

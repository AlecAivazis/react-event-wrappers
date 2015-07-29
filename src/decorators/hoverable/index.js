/* common react imports */
import React from 'react/addons'


/**
 * Decorator to easily add basic hoverability to react component.
 *
 * @param {ReactElement} Component - The react component to wrap.
 */
function hoverable(Component) {
    class HoverableComponent extends React.Component {
        constructor() {
            super(...arguments)

            this.state = {
                hover: false,
            }
        }
        render() {
            let child = (<Component {...this.props} hover={this.state.hover} />)

            return (
                <div
                    onMouseEnter={() => {
                        this.setState({hover: true})
                        // if wrapped component implements `onMouseEnter` method
                        if (child.type.prototype.onMouseEnter) {
                            child.type.prototype.onMouseEnter(...arguments)
                        }
                    }}
                    onMouseLeave={() => {
                        this.setState({hover: false})
                        // if wrapped component implements `onMouseLeave` method
                        if (child.type.prototype.onMouseLeave) {
                            child.type.prototype.onMouseLeave(...arguments)
                        }
                    }}
                >
                    {child}
                </div>
            )
        }
    }

    return HoverableComponent
}


// export decorator
export default hoverable

// end of file

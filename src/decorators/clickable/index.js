/* common react imports */
import React from 'react/addons'


/**
 * Decorator to easily add basic clickability to react component.
 *
 * @param {ReactElement} Component - The react component to wrap.
 */
function clickable(Component) {
    class ClickableComponent extends React.Component {
        constructor() {
            super(...arguments)

            this.state = {
                click: false,
            }
        }
        render() {
            let child = (<Component {...this.props} click={this.state.click} />)

            return (
                <div
                    onMouseDown={() => {
                        this.setState({click: true})
                        // if wrapped component implements `onMouseDown` method
                        if (child.type.prototype.onMouseDown) {
                            child.type.prototype.onMouseDown(...arguments)
                        }
                    }}
                    onMouseUp={() => {
                        this.setState({click: false})
                        // if wrapped component implements `onMouseUp` method
                        if (child.type.prototype.onMouseUp) {
                            child.type.prototype.onMouseUp(...arguments)
                        }
                    }}
                >
                    {child}
                </div>
            )
        }
    }

    return ClickableComponent
}


// export decorator
export default clickable

// end of file

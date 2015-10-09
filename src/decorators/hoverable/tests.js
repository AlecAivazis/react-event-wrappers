// react imports
import React from 'react'
import DOM from 'react-dom'
import TestUtils from 'react-addons-test-utils'
// local imports
import {hoverable} from './index'




@hoverable
class Component extends React.Component {
    render() {
        const {hover} = this.props

        return (<p>
            {hover}
        </p>)
    }
}



describe('hoverable', function() {
    // the rendered wrapper component
    let wrapper_component
    // DOM node of the rendered wrapper component
    let wrapper_node
    // the rendered wrapped component
    let wrapped_component
    // DOM node of the rendered wrapped component
    let wrapped_node


    beforeEach(function() {
        wrapper_component = TestUtils.renderIntoDocument(<Component />)
        wrapper_node = DOM.findDOMNode(wrapper_component)
        wrapped_component = wrapper_component.props.children
        wrapper_node = DOM.findDOMNode(wrapped_component)
    })


    it('properly manages state on the wrapper component', function() {
        // should start out as not being hovered
        expect(wrapper_component.state.hover).to.be.false
        // simulate mouse entry
        TestUtils.Simulate.mouseEnter(wrapper_node)
        // should now be hovered
        expect(wrapper_component.state.hover).to.be.true
    })


    it('properly passes props to the wrapped component', function() {
        // should start out as not being hovered
        expect(wrapped_component.props.hover).to.be.false
        // simulate mouse entry
        TestUtils.Simulate.mouseEnter(wrapped_node)
        // should now be hovered
        expect(wrapped_component.props.hover).to.be.true
    })
})


// end of file

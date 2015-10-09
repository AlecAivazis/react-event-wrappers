/**
 * Unit tests for `hoverable` decorator.
 */

/* common react imports */
import React from 'react'
import TestUtils from 'react-addons-test-utils'
/* local imports */
import hoverable from './index'


describe('hoverable', function() {
    it('properly wraps a simple component', function() {
        @hoverable
        class Component extends React.Component {
            render() {
                const {hover} = this.props

                return (<p>
                    {hover}
                </p>)
            }
        }



        const la = TestUtils.renderIntoDocument(<Component />)

        expect(la.children.prop.hover).to.be.false
    })
})


// end of file

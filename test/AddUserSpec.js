import React from 'react';
import NewUser from '../src/components/user/NewUser';
import TestUtils from 'react-dom/test-utils';
import ShallowRenderer from 'react-test-renderer/shallow';

describe('Add New User Tests', () => {

	it('renders properly', () => {
		const renderer = new ShallowRenderer();
		renderer.render(<NewUser />);
		const result = renderer.getRenderOutput();
		expect(result.type).toBe('div');
	});

	it('should throw error on empty Submit', () => {
		const newUser = TestUtils.renderIntoDocument(<NewUser />);
		const button = TestUtils.findRenderedDOMComponentWithClass(newUser, 'btn btn-primary');
		TestUtils.Simulate.click(button);
		let errSpan = TestUtils.scryRenderedDOMComponentsWithClass(newUser, 'alertMessage');
		expect(errSpan.innerHTML).not.toBeNull();
	});
});

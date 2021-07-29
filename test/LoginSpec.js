import React from 'react';
import Login from '../src/components/login/LoginPage';
import TestUtils from 'react-dom/test-utils';
import validator from '../src/components/validator/Validator';

describe('Login Tests', () => {

	it('renders properly', () => {
		const app = TestUtils.renderIntoDocument(<Login />);
		let divs = TestUtils.scryRenderedDOMComponentsWithTag(app, 'div');
		expect(divs[0].id).toEqual('login-page');
	});

	it('should validate', () => {
		const login = TestUtils.renderIntoDocument(<Login/>);
		let form = TestUtils.findRenderedDOMComponentWithTag(login, 'form');
		spyOn(validator, 'check').and.returnValue('Test error, ');
		TestUtils.Simulate.submit(form);

		let errSpan = TestUtils.scryRenderedDOMComponentsWithClass(login, 'label label-danger');
		expect(errSpan[0].innerHTML).toBe('Test error invalid');

	});
});

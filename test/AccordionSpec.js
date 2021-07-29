import React from 'react';
import Accordion from '../src/components/leftAccordion/Accordion';
import TestUtils from 'react-dom/test-utils';

describe('Accordion Tests', () => {

	it('renders properly', () => {
		const app = TestUtils.renderIntoDocument(<Accordion />);
		let divs = TestUtils.scryRenderedDOMComponentsWithTag(app, 'ul');
		expect(divs[0].className).toEqual('accordion');
	});

});

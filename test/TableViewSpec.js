import React from 'react';
import TableView from '../src/components/table/TableView';
import TestUtils from 'react-dom/test-utils';

describe('TableView Tests', () => {

    let header = [
        { key: 'name', label: 'Name' }
    ];

    let data = [
        {name: 'arnab'},
        {name: 'apeksha'},
        {name: 'shantanu'},
        {name: 'shraddha'},
        {name: 'sidhartha'}
    ];

	it('renders properly', () => {
		const app = TestUtils.renderIntoDocument(<TableView header={header} data={data}/>);
        let tables = TestUtils.scryRenderedDOMComponentsWithTag(app, 'table');
		expect(tables[0].children.length).not.toEqual(0);
	});

});

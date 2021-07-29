import React from 'react';
import Accordion from './Accordion';
import { Redirect } from 'react-router-dom';

const DATA = {
	admin: [										//Data for the Accordion
		{
			label: 'Users',
			key: 'adduser',
			data: ['Add New User', 'Show All Users']
		}, {
			label: 'Sessions',
			key: 'session',
			data: ['Add New Sessions', 'List all Sessions', 'Add Trainee']
		}, {
			label: 'Reports',
			key: 'reports',
			data: ['View Report', 'View Summary']
		}, {
			label: 'My Profile',
			key: 'myprofile',
			data: ['View Profile', 'Update Password']
		}
	],
	trainer: [
		{
			label: 'Scenario',
			key: 'addscenario',
			data: ['Add New Scenario', 'Show All Scenarios', 'Add Questions']
		}, {
			label: 'Training',
			key: 'session',
			data: ['View Trainings','Assign Scores']
		}, {
			label: 'Review Sessions',
			key: 'reports',
			data: ['List','List All']
		}, {
			label: 'My Profile',
			key: 'myprofile',
			data: ['View Profile', 'Update Password']
		}
	],
	trainee: [
		{
			label: 'Training',
			key: 'session',
			data: ['View My Trainings']
		}, {
			label: 'My Score',
			key: 'myscore',
			data: ['View Score', 'My Report' , 'CalculateScore']
		}, {
			label: 'My Profile',
			key: 'myprofile',
			data: ['View Profile', 'Update Password']
		}
	]
};

class Leftmenu extends React.Component {
	render() {
		let role = '';
		if (localStorage.getItem('user_role') != null) {
			role = localStorage.getItem('user_role');
			role = role.substring(1, role.length - 1);
		}
		return (
			(localStorage.getItem('auth_user') != null) ?
				<Accordion data={DATA[role]} /> :
				<Redirect to={ '/login' } />
		);
	}

}

export default Leftmenu;

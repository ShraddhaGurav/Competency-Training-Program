import React from 'react';
import { Redirect } from 'react-router-dom';

class Dashboard extends React.Component {
	render() {
		return (
			(localStorage.getItem('auth_user') != null) ?
				<div className="right-container">
					<h1>Dashboard</h1>
				</div> :
				<Redirect to={ '/login' } />			//if not logged in route to LoginPage else Dashboard
		);
	}
}

export default Dashboard;


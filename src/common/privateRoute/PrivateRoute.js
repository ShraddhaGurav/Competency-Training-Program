import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({ component: Component, role: Role, ...rest }) => {
	let is_loggedin = (localStorage.getItem('auth_user') != null) ? true : false;
	let role = localStorage.getItem('user_role');
	if(role != null)
		role = role.substring(1, role.length - 1);
	return (
		(Role == 'all' && is_loggedin) ? <Route {...rest} render={props => (
			<Component {...props} />
		)} /> :
			<Route {...rest} render={props => (
				(is_loggedin && role == Role) ? (
					<Component {...props} />
				) : (<Redirect to={{ pathname: '/login', state: { from: props.location } }} />)
			)} />
	);
};

PrivateRoute.propTypes = {
	props: PropTypes.any
};

export default PrivateRoute;

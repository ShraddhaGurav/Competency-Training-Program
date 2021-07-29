import React from 'react';
import PropTypes from 'prop-types';

class Header extends React.Component {
	render() {
		let user = '';
		if (localStorage.getItem('auth_user') != null) {
			user = localStorage.getItem('auth_user');
		}
		return (	//if Login, Show username on header, else no-name
			<header>
				<div className="cybagelogo">
					<img src="../src/assets/images/CSPL-Logo.jpg"></img>
				</div>
				<div className="cstmtext">
					Welcome {user.substring(1, user.length - 1)}
				</div>
			</header>
		);
	}
}

Header.propTypes = {
	props: PropTypes.any
};

export default Header;

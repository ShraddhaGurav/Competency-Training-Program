import React from 'react';
import Axios from 'axios';
import Profile from '../profile/Profile';

class ViewProfile extends React.Component {
	constructor() {
		super();
		this.state = {
			data: []
		};
		this.componentWillMount = this.componentWillMount.bind(this);
	}

	componentWillMount() {										//Get Data from DB send to the `Profile`
		let user = '';
		if (localStorage.getItem('auth_user') != null) {
			user = localStorage.getItem('auth_user');
		}

		Axios.post('http://localhost:3000/profile', {
			username: user
		}).then(response => {
			if (response.data.success) {
				this.setState({
					data : response.data
				});
			}
			else
				alert('Error');
		}).catch(function (error) {
			this.setState({
				errorStatus: error
			});
		});
	}

	render() {
		return (
			(this.state.data.length != 0) ?
				<Profile data={this.state.data} /> : null
		);
	}
}

export default ViewProfile;

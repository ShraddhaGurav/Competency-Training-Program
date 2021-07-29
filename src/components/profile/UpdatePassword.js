import React from 'react';
import Axios from 'axios';
import sha256 from 'sha256';
import pic from '../../assets/images/pic.png';
import { Alert, Glyphicon } from '../../../node_modules/react-bootstrap';

class UpdatePassword extends React.Component {

	constructor() {
		super();
		this.state = {
			password: '',
			errorStatus: ''
		};
		this.__handleSubmitPassword = this.__handleSubmitPassword.bind(this);
	}

	__handleSubmitPassword() {										//check newPassword == repeatPassword, sends newpassword and currentPassword to node for validation
		let user = '';
		if (localStorage.getItem('auth_user') != null) {
			user = localStorage.getItem('auth_user');
		}

		if (this.repeatpassword.value === this.newpassword.value) {
			Axios.post('http://localhost:3000/updatepassword', {
				username: user.substring(1, user.length - 1),
				currpassword: sha256(this.currpassword.value),
				newpassword: sha256(this.newpassword.value)
			}).then(response => {
				if (response.data.success) {
					this.setState({
						errorStatus: ' Password Updated !! '
					});
				}
				else {
					this.setState({
						errorStatus: response.data.err
					});
				}
			}).catch(function (error) {
				this.setState({
					errorStatus: error
				});
			});
		} else {
			this.setState({
				errorStatus: ' New Password and Confirm Password didnt match !! '
			});
		}
	}

	render() {
		let user = '';
		if (localStorage.getItem('auth_user') != null) {
			user = localStorage.getItem('auth_user');
		}
		return (
			<div className='right-container'>
				<div className='div-title'> Update Password </div>
				{this.state.errorStatus.length != 0 ? <div className='alertBox'><Alert bsStyle="warning"><p className='alertMessage'>{this.state.errorStatus}</p><Glyphicon glyph="remove" onClick={this.__handleAlertDismiss.bind(this)}></Glyphicon></Alert></div> : null}
				<div className='view-profile'>
					<div id='view-profile-header'>
						<img className='img-circle' src={pic}></img>
					</div>

					<div className='profile-name'>
						<p className='pName'>{user.substring(1, user.length - 1).toUpperCase()}</p>
					</div>
					<div className='profile-data'>
						<div className="form-group">
							<label>Current Password</label>
							<input ref={(currpassword) => this.currpassword = currpassword} type="password" className="form-control required" />
						</div>
						<div className="form-group">
							<label>New Password:</label>
							<input ref={(newpassword) => this.newpassword = newpassword} type="password" className="form-control required" />
						</div>
						<div className="form-group">
							<label>Confirm Password:</label>
							<input ref={(repeatpassword) => this.repeatpassword = repeatpassword} type="password" className="form-control required" />
						</div>
						<div className="form-group">
							<button className="btn btn-primary" onClick={this.__handleSubmitPassword}>Submit</button>
						</div>
					</div>
				</div>
			</div>
		);

	}

	__handleAlertDismiss() {
		if (this.state.errorStatus.length != 0)
			this.setState({
				errorStatus: ''
			});
	}
}

export default UpdatePassword;

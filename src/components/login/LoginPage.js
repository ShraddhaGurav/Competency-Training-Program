import React from 'react';
import authServiceApi from '../../api/authService';
import validator from '../../common/validator/Validator';
import sha256 from 'sha256';
import { Redirect } from 'react-router-dom';

class LoginPage extends React.Component {
	constructor() {
		super();
		this.state = {
			redirectToReferrer: false,
			credentials: {
				userId: '',
				password: ''
			},
			errorStatus: '',
			curr_user: ''
		};

		this.login = this.login.bind(this);
		this.logout = this.logout.bind(this);
	}

	componentDidMount() {
		if (authServiceApi.authenticated()) {
			this.setState({
				redirectToReferrer: true
			});
		}
	}

	login(e) {										//if matched, stores userId and Role in the localStorage
		e.preventDefault();

		let credentials = {
			userId: this.userId.value,
			password: sha256(this.password.value)
		};

		let error = validator.check();
		if (error != '') {
			this.setState({
				errorStatus: error.substring(0, error.length - 2) + ' invalid'
			});
			switch (error) {
			case 'userId,': this.userId.focus();
				break;
			case 'password,': this.password.focus();
				break;
			default: this.userId.focus();
			}
		} else {
			this.setState({
				credentials: credentials
			});
			authServiceApi.authenticate(credentials.userId, credentials.password).then(user => {
				if (user.data.success != 0) {
					localStorage['auth_user'] = JSON.stringify(user.data.user_id);
					localStorage['user_role'] = JSON.stringify(user.data.role);
					this.setState({
						redirectToReferrer: true,
						errorStatus: '',
						curr_user: user.data.user_id
					});
				} else {
					this.setState({
						errorStatus: 'Invalid Credential'
					});
				}

			}).catch(error => {
				this.setState({
					errorStatus: error
				});
			});
		}
	}

	logout(e) {										//Remove the user from localStorage
		e.preventDefault();
		authServiceApi.logout().then((res) => {
			alert(res);
			this.setState({
				redirectToReferrer: false,
				curr_user: ''
			});
		}).catch((err) => {
			throw err;
		});
	}

	render() {
		const redirectToReferrer = this.state.redirectToReferrer;
		if (redirectToReferrer) {
			return <Redirect to={'/dashboard'} />;
		}
		return (
			<div id='login-page'>
				<div className="login-area">
					<div id='form-div'>
						<h2>Login</h2>
						<form onSubmit={this.login}>
							<div className="form-group">
								<label htmlFor="userId" className="control-label">UserId:</label>
								<input type="text" className="form-control required" data-id="userId" ref={(userId) => this.userId = userId} />

							</div>
							<div className="form-group">
								<label htmlFor="password">Password:</label>
								<input type="password" className="form-control required" data-id="password" ref={(password) => this.password = password} />
							</div>
							{(this.state.errorStatus.length != 0) ? <div className="label label-danger">{this.state.errorStatus}</div> : null}
							<div className="form-group" id='login-button'>
								<button type="submit" className="btn btn-primary">Submit</button>
							</div>
						</form>
					</div>
				</div>
			</div>
		);
	}
}

export default LoginPage;


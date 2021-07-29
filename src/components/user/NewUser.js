import React from 'react';
import Axios from 'axios';
import sha256 from 'sha256';

class NewUser extends React.Component {
	constructor() {
		super();
		this.state = {
			invalidForm: false,
			invalidForm1: false,
			invalidForm2: false,
			invalidForm3: false,
			invalidForm4: false,
			errorStatus: ''
		};
		this._addUser = this._addUser.bind(this);
	}

	_addUser(e) {
		e.preventDefault();
		var validation = document.getElementsByClassName('required');
		var isinvalid = 0,
			isinvalid1 = 0,
			isinvalid2 = 0,
			isinvalid3 = 0,
			isinvalid4 = 0;
		for (var i = 0; i < validation.length; i++) {
			if (validation[i].value === '' || validation[i].value === 'role') {
				validation[i].parentElement.classList.add('has-error');
				isinvalid++;
			} else {
				validation[i].parentElement.classList.remove('has-error');
			}
		}
		(isinvalid > 0) ?
			this.setState({
				invalidForm: true
			}) :
			this.setState({
				invalidForm: false
			});
		if (isinvalid === 0) {
			var firstname = document.getElementById('fname').value;
			var lastname = document.getElementById('lname').value;
			var empid = document.getElementById('empid').value;
			var email = document.getElementById('email').value;
			var password = document.getElementById('pass').value;
			var confirmpassword = document.getElementById('confpass').value;
			var role = document.getElementById('role').value;
			var userid = document.getElementById('userid').value;
			if (password != confirmpassword) {
				isinvalid1++;
			}
			(isinvalid1 > 0) ?
				this.setState({
					invalidForm1: true
				}) :
				this.setState({
					invalidForm1: false
				});
			if (password.length < 8) {
				isinvalid4++;
			}
			(isinvalid4 > 0) ?
				this.setState({
					invalidForm4: true
				}) :
				this.setState({
					invalidForm4: false,
				});
			if (isNaN(empid)) {
				isinvalid2++;
			}
			(isinvalid2 > 0) ?
				this.setState({
					invalidForm2: true
				}) :
				this.setState({
					invalidForm2: false
				});
			(isinvalid3 === 0) ?
				this.setState({
					invalidForm3: false
				})
				: null;
		}
		if (isinvalid === 0 && isinvalid1 === 0 && isinvalid2 === 0 && isinvalid4 === 0) {
			Axios.post('http://localhost:3000/checkUser', {
				userid: userid,
				page: 'adduser',
				action: 'checkuid'
			})
				.then(response => {
					let dt = new Date();
					let dtToday = dt.getFullYear() + '-' + (dt.getMonth() + 1) + '-' + dt.getDate();
					if (response.data.success != 1) {
						Axios.post('http://localhost:3000/addUsers', {
							firstname: firstname,
							lastname: lastname,
							userid: userid,
							email: email,
							password: sha256(password),
							role: role,
							empid: empid,
							createddate: dtToday,
							action: 'adduser'
						})
							.then(response => {
								if (response.data.success) {
									alert('User added successfully');
									setTimeout(() => {
										window.location = '/dashboard/addnewuser';
									}, 1000);
								}
							})
							.catch(function (error) {
								alert(error);
							});
					} else {
						isinvalid3++;
						(isinvalid3 > 0) ?
							this.setState({
								invalidForm3: true
							}) : null;
					}
				})
				.catch(function (error) {
					alert(error);
				});
		}
	} // end of function _addUser(e)

	render() {
		return (
			<div className='right-container'>
				<div className='div-title'> Add Users </div>
				<div className="form-area">
					<form id="newUserForm" onSubmit={this._addUser}>
						<div className="form-group has-feedback">
							<input type="text" className="form-control required " id="fname" placeholder="Firstname" autoComplete="off"/>
							<i className="glyphicon glyphicon-user form-control-feedback"></i>
						</div>
						<div className="form-group has-feedback">
							<input type="text" className="form-control required " id="lname" placeholder="Lastname" autoComplete="off" />
							<i className="glyphicon glyphicon-user form-control-feedback"></i>
						</div>
						<div className={(this.state.invalidForm3)?'form-group has-error' : 'form-group has-feedback'}>
							<input type="text" className="form-control required " id="userid" placeholder="UserID" autoComplete="off"/>
							<i className="glyphicon glyphicon-user form-control-feedback"></i>
						</div>
						{(this.state.invalidForm3) ? <div className="form-group text-center invalid-color">
							<h6>
								<span>UserID already exists</span>
							</h6>
						</div> : null}
						<div className="form-group has-feedback">
							<input type="email" className="form-control required " id="email" placeholder="E-Mail" autoComplete="off" />
							<i className="glyphicon glyphicon-envelope form-control-feedback"></i>
						</div>
						<div>
							<div className={(this.state.invalidForm1 || this.state.invalidForm4) ? 'form-group has-error' : 'form-group has-feedback'}>
								<input type="password" className="form-control required " id="pass" placeholder="Password" />
								<i className="glyphicon glyphicon-lock form-control-feedback"></i>
							</div>
							{(this.state.invalidForm1) ? <div className="form-group text-center invalid-color">
								<h6>
									<span>Password does not match</span>
								</h6>
							</div> : null}
							{(this.state.invalidForm4) ? <div className="form-group text-center invalid-color">
								<h6>
									<span>Password should be greater than 8 characters</span>
								</h6>
							</div> : null}
							<div className={(this.state.invalidForm1 || this.state.invalidForm4) ? 'form-group has-error' : 'form-group has-feedback'}>
								<input type="password" className="form-control required " id="confpass" placeholder="ConfirmPassword" />
								<i className="glyphicon glyphicon-lock form-control-feedback"></i>
							</div>
						</div>
						<div className={(this.state.invalidForm2) ? 'form-group has-error' : 'form-group has-feedback'}>
							<input type="text" className="form-control required " id="empid" placeholder="EmpID" autoComplete="off"/>
							<i className="glyphicon glyphicon-user form-control-feedback"></i>
						</div>
						{(this.state.invalidForm2) ? <div className="form-group text-center invalid-color">
							<h6>
								<span>EmpID should be numeric</span>
							</h6>
						</div> : null}
						<div className="form-group dropdown">
							<select className="form-control required " id="role">
								<option value="role">Select Role</option>
								<option value="Trainer">Trainer</option>
								<option value="Trainee">Trainee</option>
							</select>
						</div>
						{this.state.invalidForm
							? <div className="form-group text-center invalid-color">
								<h6>
									<span>Please enter all required fields</span>
								</h6>
							</div>
							: null
						}

						<div className="form-group text-center">
							<button className="btn btn-primary" >Submit</button>
						</div>
					</form>
				</div>
			</div>
		);
	} // end of render
} // end of class NewUser

export default NewUser;


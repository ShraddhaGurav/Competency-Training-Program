import React from 'react';
import axios from 'axios';

class NewSession extends React.Component {
	constructor() {
		super();
		this.state = {
			invalidForm: false,
			invalidForm1: false
		};
		this._addSession = this._addSession.bind(this);
	}
	_addSession(e) {
		e.preventDefault();

		var validation = document.getElementsByClassName('required');
		var isinvalid = 0;
		var isinvalid1 = 0;
		for (var i = 0; i < validation.length; i++) {
			if (validation[i].value === '' || validation[i].value === 'default') {
				validation[i].parentElement.classList.add('has-error');
				isinvalid++;
			} else {
				validation[i].parentElement.classList.remove('has-error');
			}
		}
		if (isinvalid === 0) {
			var sessionname = document.getElementById('sessionName').value;
			var trainer = document.getElementById('trainer').value;
			var sessionDuration = document.getElementById('sessionDuration').value;
		}
		(isinvalid > 0) ?
			this.setState({
				invalidForm: true
			}) :
			this.setState({
				invalidForm: false
			});
		if (isNaN(sessionDuration)) {
			isinvalid1++;
		}
		(isinvalid1 > 0) ?
			this.setState({
				invalidForm1: true
			}) :
			this.setState({
				invalidForm1: false
			});
		if (isinvalid === 0 && isinvalid1 === 0) {
			let dt = new Date();
			let dtToday = dt.getFullYear() + '-' + (dt.getMonth() + 1) + '-' + dt.getDate();
			axios.post('http://localhost:3000/addsessions', {
				sessionid: parseInt(this.sessionId.value),
				sessionname: sessionname,
				user_id: trainer,
				datecreated: dtToday,
				sessionduration: sessionDuration

			}).then(response => {
				if (response.data.success != 0) {
					alert('Data Submitted Successfully');
					setTimeout(() => {
						window.location = '/dashboard/addnewSessions';
					}, 1000);
					this.setState({
						sessionid: this.state.sessionid + 1,
						success: true,
					});
				}
				else {
					alert(response.data.err.sqlMessage);
					this.setState({
						success: false,
						errorStatus: ' Unable to save Data !! '
					});
				}
			}).catch(function (error) {
				this.setState({
					errorStatus: error
				});
			});
		}
	} // end of function _addSession(e)

	_trainerList() {
		var data = [];
		for (var i = 0; i < this.state.trainer_count; i++) {
			data.push(<option value={this.state.user_id[i]}>{this.state.user_id[i]}</option>);
		}
		return (data);
	}

	render() {
		return (
			<div className='right-container'>
				<div className='div-title'> Add Sessions </div>
				<div className="form-area">
					<form id="newSessionForm" onSubmit={this._addUser}>
						<div className="form-group has-feedback">
							<label>Session Id:</label>
							<input type="text" data-id="sessionId" className="form-control required" value={this.state.sessionid} ref={(sessionId) => this.sessionId = sessionId} readOnly />
						</div>
						<div className="form-group has-feedback">
							<input type="text" id="sessionName" className="form-control required" placeholder="SessionName" />
							<i className="glyphicon glyphicon-list-alt form-control-feedback"></i>
						</div>
						<div className="form-group has-feedback">
							<select className="form-control required" id="trainer">
								<option value="default" disabled selected>Select Trainer</option>
								{this._trainerList()}
							</select>
						</div>
						<div className={(this.state.invalidForm1) ? 'form-group has-error' : 'form-group has-feedback'}>
							<input type="text" id="sessionDuration" className="form-control required" placeholder="Session Duration In Days" />
							<i className="glyphicon glyphicon-calendar form-control-feedback"></i>
						</div>
						{this.state.invalidForm1
							? <div className="form-group text-center invalid-color">
								<h6>
									<span>Session Duration should be a number</span>
								</h6>
							</div>
							: null
						}
						{this.state.invalidForm
							? <div className="form-group text-center invalid-color">
								<h6>
									<span>Please enter all required fields</span>
								</h6>
							</div>
							: null
						}
						<div className="form-group text-center">
							<button type="submit" className="btn btn-primary" onClick={this._addSession}>Submit</button>
						</div>
					</form>
				</div>
			</div>

		);
	} // end of render
	componentWillMount() {
		axios.get('http://localhost:3000/getsessionid', {}
		).then(response => {
			let sessionid = 1;
			if (response.data.length != 'not-defined') {
				if (response.data.length != null) {
					sessionid = response.data.length + 1;
				}
				this.setState({
					sessionid: sessionid
				});
			}
			else {
				this.setState({
					errorStatus: ' Error !! '
				});
			}
		}).catch(function (error) {
			this.setState({
				errorStatus: error
			});
		});
		axios.get('http://localhost:3000/trainerList', {})
			.then(response => {
				if (response.data.success) {
					this.setState({
						user_id: response.data.user_id,
						trainer_count: response.data.count
					});
				}
			})
			.catch(function (error) {
				alert(error);
			});
	}// end of componentWillMount function
} // end of class NewSession

export default NewSession;

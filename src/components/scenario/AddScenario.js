import React from 'react';
import Axios from 'axios';

class AddScenario extends React.Component {
	constructor() {
		super();
		this.state = {
			sessions: [],
			scenarioid: 1,
			errorStatus: '',
			success: false,
			invalidForm1: false
		};

		this.__getScenarioId = this.__getScenarioId.bind(this);
		this.__handleSubmit = this.__handleSubmit.bind(this);
	}

	componentWillMount() {
		let trainer = localStorage.getItem('auth_user');
		trainer = trainer.substring(1, trainer.length - 1);
		Axios.post('http://localhost:3000/getscenarioid', {
			action: 'getrelatedsession',
			trainerid: trainer
		}).then(response => {
			if (response.data.success) {
				if (response.data.success == 1) {
					this.setState({
						sessions: response.data.data
					});
				} else {
					this.setState({
						sessions: [],
						errorStatus: 'No Active Session Found'
					});
				}
			} else {
				this.setState({
					sessions: [],
					errorStatus: 'GetScenarios DB Error'
				});
			}
		}).catch(function (error) {
			this.setState({
				errorStatus: error
			});
		});
	}

	__getScenarioId() {
		if (this.sessionName.value != 'default') {
			let trainer = localStorage.getItem('auth_user');
			trainer = trainer.substring(1, trainer.length - 1);
			Axios.post('http://localhost:3000/getscenarioid', {
				sessionid: this.sessionName.value,
				trainerid: trainer,
				action: 'getsessionid'
			}).then(response => {
				let scenarioid = 1;
				if (response.data.length != 'not-defined') {
					if (response.data.length != 0) {
						scenarioid = response.data.length + 1;
					}
					this.setState({
						scenarioid: scenarioid,
						errorStatus: ''
					});
				} else {
					this.setState({
						errorStatus: ' Session Does not Exist!! ',
						sessionname: '',
						scenarioid: 0
					});
				}
			}).catch(function (error) {
				this.setState({
					errorStatus: error
				});
			});
		} else {
			this.setState({
				scenarioid: 0,
				errorStatus: 'Select Atleast One Session!!'
			});
		}
	}
	__handleSubmit(e) {						//add scenario to sessionId and ScenariosId
		e.preventDefault();
		var validation = document.getElementsByClassName('required1');
		var isinvalid = 0;
		for (var i = 0; i < validation.length; i++) {
			if (validation[i].value === '' || validation[i].value === 'selectSession') {
				validation[i].parentElement.classList.add('has-error');
				isinvalid++;
			} else {
				validation[i].parentElement.classList.remove('has-error');
			}
		}
		if (isinvalid === 0) {
			Axios.post('http://localhost:3000/addscenario', {
				sessionid: parseInt(this.sessionName.value),
				sessionname: this.state.sessions[this.sessionName.selectedIndex - 1].session_name,
				scenarioid: parseInt(this.scenarioID.value),
				scenarioname: this.scenarioName.value,
				scenariodescription: this.scenarioDescription.value,
				scenrioduration: this.scenarioDuration.value
			}).then(response => {
				if (response.data.success != 0) {
					this.setState({
						scenarioid: this.state.scenarioid + 1,
						success: true,
					});
					alert('Scenario Added Successfully');
					setTimeout(() => {
						window.location = '/dashboard/addnewscenario';
					}, 1000);
				}
				else {
					this.setState({
						success: false,
						errorStatus: ' Unable to Add Scenario !! '
					});
				}
			}).catch(function (error) {
				this.setState({
					errorStatus: error
				});
			});
			this.setState({
				errorStatus: ''
			});
		} (isinvalid > 0) ?
			this.setState({
				invalidForm1: true
			}) :
			this.setState({
				invalidForm1: false
			});
	}

	render() {
		return (
			(this.state.sessions.length != 0) ?
				<div className="right-container">
					<div className='div-title'> Add Scenarios </div>
					<div className="form-area">
						<form onSubmit={this.__handleSubmit}>
							<div className="form-group">
								<label>Session Name:</label>
								<select onChange={this.__getScenarioId} id="selectSession" className="form-control required1" ref={(sessionName) => this.sessionName = sessionName} >
									<option value="selectSession">Select Session</option>
									{this.state.sessions.map(item => {
										return (
											<option value={item.session_id} key={item.session_id}>{item.session_name}</option>
										);
									})}
								</select>
							</div>
							<div className="form-group">
								<label>Scenario Number</label>
								<input type="text" id="scenarioID" className="form-control required1" value={this.state.scenarioid} ref={(scenarioID) => this.scenarioID = scenarioID} readOnly />
							</div>
							<div className="form-group">
								<label>Scenario Name</label>
								<input type="text" id="scenarioName" className="form-control required1" ref={(scenarioName) => this.scenarioName = scenarioName} />
							</div>
							<div className="form-group">
								<label>Scenario Duration</label>
								<input type="number" id="scenarioDuration" className="form-control required1" ref={(scenarioDuration) => this.scenarioDuration = scenarioDuration} />
							</div>
							<div className="form-group">
								<label>Scenario Description</label>
								<textarea type="text" id="scenarioDescription" className="form-control required1" ref={(scenarioDescription) => this.scenarioDescription = scenarioDescription} />
							</div>
							{this.state.invalidForm1
								? <div className="form-group text-center invalid-color">
									<h6>
										<span>Please enter all the fields</span>
									</h6>
								</div>
								: null}
							<div>
								<button className="btn btn-primary">Add Scenario</button>
							</div>
						</form>
					</div>
				</div> :
				null

		);
	}
}
export default AddScenario;

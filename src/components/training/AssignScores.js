import React from 'react';
import Axios from 'axios';
import { Alert, Glyphicon } from '../../../node_modules/react-bootstrap';
import FetchResult from './FetchResult';


class AssignScores extends React.Component {
	constructor() {
		super();
		this.state = {
			data: [],
			traineeid: '',
			sessions: [],
			scenarios: [],
			errorStatus: '',
			trainees: [],
			toggle: false
		};
		this.componentWillMount = this.componentWillMount.bind(this);
		this.__getTrainee = this.__getTrainee.bind(this);
		this.__getResults = this.__getResults.bind(this);
		this.__getScenarios = this.__getScenarios.bind(this);
		this.__handleAlertDismiss = this.__handleAlertDismiss.bind(this);
	}
	componentWillMount() {
		let user = '';
		if (localStorage.getItem('auth_user') != null) {
			user = localStorage.getItem('auth_user');
			user = user.substring(1, user.length - 1);
			this.setState({
				trainerid: user
			});
		}
	}

	componentDidMount() {
		Axios.post('http://localhost:3000/getsessions', {
			trainerid: this.state.trainerid,
			from: 'trainer'
		}).then(response => {
			if (response.data.success) {
				(response.data.data.length != 0) ?
					this.setState({
						sessions: response.data.data,
						errorStatus: ''
					}) :
					this.setState({
						sessions: [],
						errorStatus: 'No Sessions Found'
					});
			} else {
				this.setState({
					errorStatus: ' GetSessions DB Error !! '
				});
			}
		}).catch(function (error) {
			this.setState({
				errorStatus: error
			});
		});
	}

	__getScenarios() {						//Get Scenarios
		if (this.sessions.value != 'default')
			Axios.post('http://localhost:3000/getscenarios', {
				sessionid: this.sessions.value
			}).then(response => {
				if (response.data.success) {
					if (response.data.success == 1)
						this.setState({
							scenarios: response.data.data,
							errorStatus: ''
						});
					else
						this.setState({
							scenarios: [],
							errorStatus: 'Scenario does not exist for this session !!'
						});
				} else {
					this.setState({
						errorStatus: ' GetScenarios DB Error !! '
					});
				}
			}).catch(function (error) {
				this.setState({
					errorStatus: error
				});
			});
	}

	__getTrainee() {						//Fetch Trainee already in result DB
		if (this.scenarios.value != 'default') {
			Axios.post('http://localhost:3000/getsubmittedtrainee', {
				sessionid: parseInt(this.sessions.value),
				scenarioid: parseInt(this.scenarios.value)
			}).then(response => {
				if (response.data.success) {
					this.setState({
						trainees: response.data.data
					});
				}
				else
					this.setState({
						errorStatus: ' GetTrainee DB Error !! '
					});
			}).catch(function (error) {
				this.setState({
					errorStatus: error
				});
			});
		}
		else
			this.setState({
				errorStatus: ' Select at least one scenario !! '
			});
	}
	__getResults() {						//Fetch Data for current scenario, session and trainee
		if (this.trainees.value != 'default') {
			Axios.post('http://localhost:3000/getresult', {
				sessionid: parseInt(this.sessions.value),
				scenarioid: parseInt(this.scenarios.value),
				traineeid: this.trainees.value
			}).then(response => {
				if (response.data.success) {
					this.setState({
						data: response.data.data
					});
				}
				else
					this.setState({
						errorStatus: ' GetResult DB Error !! '
					});
			}).catch(function (error) {
				this.setState({
					errorStatus: error
				});
			});
		} else {
			this.setState({
				errorStatus: 'Select atleast one trainee'
			});
		}
	}

	render() {
		return (
			<div className="right-container">
				<div className='div-title'> Assign Scores </div>
				{this.state.errorStatus.length != 0 ?
					<div className='alertBox'><Alert bsStyle="warning">
						<p className='alertMessage'>{this.state.errorStatus}</p>
						<Glyphicon glyph="remove" onClick={this.__handleAlertDismiss.bind(this)}></Glyphicon>
					</Alert>
					</div> : null
				}
				{(this.state.sessions.length != 0) ?						//Get scenarios for focused Session
			<div className='drop-down-element'>
				<select className='form-control' onChange={this.__getScenarios} ref={(sessions) => this.sessions = sessions} >
					<option value='default'>Select Session</option>
					{this.state.sessions.map(item => {
						return <option value={item.session_id} key={item.session_id}>{item.session_name}</option>;
					})}
				</select>
			</div>
					: null
				}
				{(this.state.scenarios.length != 0) ?						//Get Trainee for focused Scenarios
			<div className='drop-down-element'>
				<select className='form-control' onChange={this.__getTrainee} ref={(scenarios) => this.scenarios = scenarios} >
					<option value='default'>Select Scenario</option>
					{this.state.scenarios.map(item => {
						return <option value={item.scenario_id} key={item.scenario_id}>{item.scenario_name}</option>;
					})}
				</select>
			</div>
					: null
				}
				{(this.state.trainees.length != 0) ?						//Get trainee's answers
			<div className='drop-down-element'>
				<select className='form-control' onChange={this.__getResults} ref={(trainees) => this.trainees = trainees} >
					<option value='default'>Select Trainee</option>
					{this.state.trainees.map(item => {
						return <option value={item.trainee_id} key={item.trainee_id}>{item.trainee_id}</option>;
					})}
				</select>
			</div>
					: null
				}

				{(this.state.data.length != 0) ?
					<FetchResult data={this.state.data} scenarioid={this.scenarios.value} sessionid={this.sessions.value} traineeid={this.trainees.value} /> : null
				}
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

export default AssignScores;

import React from 'react';
import Axios from 'axios';
import QuesAns from '../training/QuesAns';
import { Alert, Glyphicon } from '../../../node_modules/react-bootstrap';

class ViewMyTraining extends React.Component {
	constructor() {
		super();
		this.state = {
			data: [],
			traineeid: '',
			sessions: [],
			scenarios: [],
			errorStatus: '',
			testGiven: false,
			flag: false
		};
		this.componentWillMount = this.componentWillMount.bind(this);
		this.__getScenarios = this.__getScenarios.bind(this);
		this.__getQuestions = this.__getQuestions.bind(this);
		this.__handleAlertDismiss = this.__handleAlertDismiss.bind(this);
		this.__getSubmittedDetails = this.__getSubmittedDetails.bind(this);
	}

	componentWillMount() {
		let user = '';
		if (localStorage.getItem('auth_user') != null) {
			user = localStorage.getItem('auth_user');
			user = user.substring(1, user.length - 1);
			this.setState({
				traineeid: user
			});
		}
	}

	componentDidMount() {
		Axios.post('http://localhost:3000/getsessions', {
			traineeid: this.state.traineeid,
			from: 'trainee'
		}).then(response => {
			if (response.data.success) {
				(response.data.data.length != 0) ?
					this.setState({
						sessions: response.data.data,
						errorStatus: ''
					}) :
					this.setState({
						sessions: [],
						errorStatus: 'No Trainings Found'
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

	__getScenarios() {
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
							data: [],
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

	__getSubmittedDetails() {					//Check for Test Already submitted or Not
		if (this.scenarios.value != 'default')
			Axios.post('http://localhost:3000/submittedtest', {
				sessionid: parseInt(this.sessions.value),
				scenarioid: parseInt(this.scenarios.value),
				traineeid: this.state.traineeid,
				questiontype: this.questiontype.value
			}).then(response => {
				if (response.data.success) {
					this.setState({
						errorStatus: ' Test is already Submitted!! ',
						testGiven: true,
						data: [],
						flag: true
					});
				}
				else
					this.setState({
						flag: false
					});
				this.__getQuestions();
			}).catch(error => {
				this.setState({
					errorStatus: error
				});
			});
	}

	__getQuestions() {
		if (this.scenarios.value != 'default') {
			Axios.post('http://localhost:3000/quesans', {
				sessionid: parseInt(this.sessions.value),
				scenarioid: parseInt(this.scenarios.value),
				questiontype: this.questiontype.value
			}).then(response => {
				if (response.data.success) {
					this.setState({
						data: response.data.data
					});
				}
				else
					this.setState({
						errorStatus: ' GetQuesAns DB Error !! '
					});
			}).catch(error => {
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

	render() {
		return (
			<div className='right-container'>
				<div className='div-title'> My Trainings </div>
				{this.state.errorStatus.length != 0 ?
					<div className='alertBox'><Alert bsStyle="warning">
						<p className='alertMessage'>{this.state.errorStatus}</p>
						<Glyphicon glyph="remove" onClick={this.__handleAlertDismiss.bind(this)}></Glyphicon>
					</Alert>
					</div> : null
				}

				{(this.state.sessions.length != 0) ?
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
				{(this.state.scenarios.length != 0) ?
					<div className='drop-down-element'>
						<select className='form-control' ref={(scenarios) => this.scenarios = scenarios} >
							<option value='default'>Select Scenario</option>
							{this.state.scenarios.map(item => {
								return <option value={item.scenario_id} key={item.scenario_id}>{item.scenario_name}</option>;
							})}
						</select>
					</div>
					: null
				}
				{(this.state.scenarios.length != 0) ?
					<div className='drop-down-element'>
						<select className='form-control' onChange={this.__getSubmittedDetails} ref={(questiontype) => this.questiontype = questiontype} >
							<option value='default'>Select Question type </option>
							<option value='single'> Single Descriptive Question </option>
							<option value='mcq'> Multiple Choice Questions </option>
						</select>
					</div>
					: null
				}
				{(this.state.data.length != 0) ?
					<QuesAns data={this.state.data} questiontype={this.questiontype.value} scenarioid={this.scenarios.value} sessionid={this.sessions.value} flag={this.state.flag} /> : null
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
export default ViewMyTraining;


import React from 'react';
import Axios from 'axios';
import TotalScore from '../training/TotalScore';
import { Alert, Glyphicon } from '../../../node_modules/react-bootstrap';

class ViewScore extends React.Component {
	constructor() {
		super();
		this.state = {
			data: [],
			data_mcq: [],
			errorStatus: '',
			sessions: [],
			traineeid: ''

		};
		this.__getScores = this.__getScores.bind(this);
		this.componentDidMount = this.componentDidMount.bind(this);
		this.__handleAlertDismiss = this.__handleAlertDismiss.bind(this);

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
	__getScores() {					//Fetch Data from result table for scores
		if (this.sessions.value != 'default') {
			Axios.post('http://localhost:3000/viewscore', {
				traineeid: this.state.traineeid,
				sessionid: parseInt(this.sessions.value)
			}).then(response => {
				if (response.data.success) {
					if (response.data.success == 1)
						this.setState({
							data: response.data.data,
							data_mcq: response.data.data_mcq
						});
					else
						this.setState({
							data: [],
							errorStatus: 'No QA Found'
						});
				}
				else
					this.setState({
						data: [],
						errorStatus: ' GetScores DB Error !! '
					});
			}).catch(function (error) {
				this.setState({
					errorStatus: error
				});
			});
		}
		else
			this.setState({
				errorStatus: ' Select atleast one session '
			});
	}

	render() {
		return (
			<div className="right-container">
				<div className='div-title'> My Scores </div>
				{this.state.errorStatus.length != 0 ?
					<div className='alertBox'><Alert bsStyle="warning">
						<p className='alertMessage'>{this.state.errorStatus}</p>
						<Glyphicon glyph="remove" onClick={this.__handleAlertDismiss.bind(this)}></Glyphicon>
					</Alert>
					</div> : null
				}
				{(this.state.sessions.length != 0) ?
					<div className='drop-down-element'>
						<select className='form-control' onChange={this.__getScores} ref={(sessions) => this.sessions = sessions} >
							<option value='default'>Select Session</option>
							{this.state.sessions.map(item => {
								return <option value={item.session_id} key={item.session_id}>{item.session_name}</option>;
							})}
						</select>
					</div> : null
				}
				{(this.state.data.length != 0) ? <TotalScore data={this.state.data} data_mcq={this.state.data_mcq} /> : null
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

export default ViewScore;

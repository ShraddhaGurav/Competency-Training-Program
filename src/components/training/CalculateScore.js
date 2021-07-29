import React from 'react';
import Axios from 'axios';
import { Alert, Glyphicon } from '../../../node_modules/react-bootstrap';

class CalculateScore extends React.Component {
	constructor() {
		super();
		this.state = {
			traineeid: '',
			sessions: [],
			data: [],
			errorStatus: '',
		};
		this.__get_Data_for_Scores = this.__get_Data_for_Scores.bind(this);
		this.__calculate_Scores = this.__calculate_Scores.bind(this);

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

	__get_Data_for_Scores() {
		if (this.sessions.value != 'default')
			Axios.post('http://localhost:3000/getdatamcq', {
				sessionid: this.sessions.value,
				traineeid: this.state.traineeid
			}).then(response => {
				if (response.data.success) {
					if (response.data.success == 1)
						this.setState({
							data: response.data.data,
							errorStatus: ''
						});
					else
						this.setState({
							data: [],
							errorStatus: 'Records dont exist in database !!'
						});
				} else {
					this.setState({
						errorStatus: ' GetDataMcq DB Error !! '
					});
				}
			}).catch(function (error) {
				this.setState({
					errorStatus: error
				});
			});
	}


	__calculate_Scores() {
		let marks_allocated;
		let option_answered;
		let correctanswer;
		let question_marks;
		let question_id;

		this.state.data.map(item => {
			option_answered = item.option_answered
			correctanswer = item.correctanswer;
			question_marks = item.question_marks;
			question_id = item.question_id;
		});

		if (option_answered == correctanswer) {
			marks_allocated = question_marks;

		} else {
			marks_allocated = 0;
		}

		Axios.post('http://localhost:3000/updatescoresmcq', {
			sessionid: this.sessions.value,
			traineeid: this.state.traineeid,
			question_id: question_id,
			marks_allocated: marks_allocated
		}).then(response => {
			if (response.data.success) {
				if (response.data.success == 1) {
					this.setState({
						errorStatus: 'Scores successfully updated in database'
					});
				}
				else {
					this.setState({
						errorStatus: 'No records found to update in database !!'
					});
				}
			} else {
				this.setState({
					errorStatus: 'Update ScoreMcq  DB Error'
				});
			}

		}).catch(error => {
			this.setState({
				errorStatus: error
			});
		});

	}


	render() {
		return (
			<div className="right-container">
				<div className='div-title'> Calculate Scores(MCQ) </div>
				{this.state.errorStatus.length != 0 ?
					<div className='alertBox'><Alert bsStyle="warning">
						<p className='alertMessage'>{this.state.errorStatus}</p>
						<Glyphicon glyph="remove" onClick={this.__handleAlertDismiss.bind(this)}></Glyphicon>
					</Alert>
					</div> : null
				}
				{(this.state.sessions.length != 0) ?
					<div className='drop-down-element'>
						<select className='form-control' onChange={this.__get_Data_for_Scores} ref={(sessions) => this.sessions = sessions} >
							<option value='default'>Select Session</option>
							{this.state.sessions.map(item => {
								return <option value={item.session_id} key={item.session_id}>{item.session_name}</option>;
							})}
						</select>
					</div>
					: null
				}
				{
					(this.state.sessions.length != 0) ?
						<div className="form-group" id='submit-button'>
							<button className="btn btn-primary" onClick={this.__calculate_Scores}>Calculate Scores</button>
						</div>
						: null
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

export default CalculateScore;

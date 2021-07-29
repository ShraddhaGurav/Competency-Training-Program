import React from 'react';
import Axios from 'axios';
import { Alert, Glyphicon } from '../../../node_modules/react-bootstrap';

class AddQuestions extends React.Component {
	constructor() {
		super();
		this.state = {
			questionid: 1,
			errorStatus: '',
			scenarios: [],
			sessions: [],
			available_questions: [],
			success: false,
			questiontype: ' ',
			toggle: false,
			invalidForm: false,
			invalidForm1: false
		};

		this.componentWillMount = this.componentWillMount.bind(this);
		this.__handleSubmit = this.__handleSubmit.bind(this);
		this.__check = this.__check.bind(this);
		this.__getScenarios = this.__getScenarios.bind(this);
		this.__toggleQuestionView = this.__toggleQuestionView.bind(this);
	}

	componentWillMount() {
		let user = localStorage.getItem('auth_user');
		user = user.substring(1, user.length - 1);
		Axios.post('http://localhost:3000/getsessions', {
			trainerid: user,
			from: 'trainer'
		}).then(response => {
			if (response.data.success) {
				this.setState({
					sessions: response.data.data,
					errorStatus: ''
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

		Axios.get('http://localhost:3000/getquestionid', {}
		).then(response => {
			let questionid = 1;
			if (response.data.length != 'not-defined') {
				if (response.data.length != null) {
					questionid = response.data.length + 1;
				}
				this.setState({
					questionid: questionid
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


	__handleSubmit() {						//add scenario to sessionId and ScenariosId
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
		(isinvalid > 0) ?
			this.setState({
				invalidForm: true
			}) :
			this.setState({
				invalidForm: false
			});
		if (isinvalid === 0) {									//handle Submit and add question of current Session and current Scenario
			Axios.post('http://localhost:3000/addquestion', {
				questionid: parseInt(this.questionId.value),
				questiondescription: this.questionDescription.value,
				questionmarks: parseInt(this.questionMarks.value),
				scenarioid: parseInt(this.scenarios.value),
				sessionid: parseInt(this.sessions.value),
				questiontype: this.questiontype.value
			}).then(response => {
				if (response.data.success != 0) {
					this.setState({
						questionid: this.state.questionid + 1,
						success: true,
						errorStatus: ' Question added Successfully !! '
					});
					setTimeout(() => {
						window.location = '/dashboard/addquestions';
					}, 1000);
				}
				else {
					alert(response.data.err.sqlMessage);
					this.setState({
						success: false,
						errorStatus: ' Unable to add Question !! '
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
		}
	}
	__handleSubmit1() {
		var validation = document.getElementsByClassName('required2');
		var isinvalid = 0;
		for (var i = 0; i < validation.length; i++) {
			if (validation[i].value === '' || validation[i].value === 'selectSession') {
				validation[i].parentElement.classList.add('has-error');
				isinvalid++;
			} else {
				validation[i].parentElement.classList.remove('has-error');
			}
		}
		(isinvalid > 0) ?
			this.setState({
				invalidForm1: true
			}) :
			this.setState({
				invalidForm1: false
			});
		if (isinvalid === 0) {
			var option1 = document.getElementById('option1');
			var option2 = document.getElementById('option2');
			var option3 = document.getElementById('option3');
			var option4 = document.getElementById('option4');
			var options = document.getElementsByClassName('mcq');
			var correctanswer = document.getElementById('correctanswer');
			var temp = [];                        //handle Submit and add question of current Session and current Scenario
			Object.keys(options).forEach(item => {
				if (!temp.includes(options[item].value)) {
					temp.push(options[item].value);
				}

			});
			if (temp.length != 4) {
				alert('Option values are not distinct!!');
			} else {
				if ((correctanswer.value != option1.value) && (correctanswer.value != option2.value) && (correctanswer.value != option3.value) && (correctanswer.value != option4.value)) {
					alert('Answer does not match with entered options');
				}
				else {

					Axios.post('http://localhost:3000/addquestion', {
						questionid: parseInt(this.questionId.value),
						questiondescription: this.questionDescription.value,
						questionmarks: parseInt(this.questionMarks.value),
						scenarioid: parseInt(this.scenarios.value),
						sessionid: parseInt(this.sessions.value),
						optiona: this.optiona.value,
						optionb: this.optionb.value,
						optionc: this.optionc.value,
						optiond: this.optiond.value,
						correctanswer: this.correctanswer.value,
						questiontype: this.questiontype.value
					}).then(response => {
						if (response.data.success != 0) {
							this.setState({
								questionid: this.state.questionid + 1,
								success: true,
								errorStatus: ' Question added Successfully !! '
							});
							setTimeout(() => {
								window.location = '/dashboard/addquestions';
							}, 1000);
						}
						else {
							alert(response.data.err.sqlMessage);
							this.setState({
								success: false,
								errorStatus: ' Unable to add Question !! '
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
				}
			}
		}
	}
	__getScenarios() {										//Get Scenarios for focused sessionid
		if (this.sessions.value != 'default')
			Axios.post('http://localhost:3000/getscenarios', {
				sessionid: this.sessions.value
			}).then(response => {
				if (response.data.success) {
					this.setState({
						scenarios: response.data.data,
						errorStatus: ''
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

	__check(e) { 										//Validation for drop-down
		e.preventDefault();
		if (this.sessions.value != 'default') {
			if (this.scenarios.value != 'default') {
				if (this.questiontype.value == 'single') {
					this.__handleSubmit();
				}
				else if (this.questiontype.value == 'mcq') {
					this.__handleSubmit1();
				}
			}
			else
				this.setState({
					errorStatus: ' Select at least one scenario !! '
				});
		}
		else
			this.setState({
				errorStatus: ' Select at least one session !! '
			});
	}

	__toggleQuestionView() {
		this.setState({
			toggle: true
		});
	}

	render() {
		return (
			<div className='right-container'>
				<div className='div-title'> Add Questions </div>
				{this.state.errorStatus.length != 0 ?
					<div className='alertBox'><Alert bsStyle="warning">
						<p className='alertMessage'>{this.state.errorStatus}</p>
						<Glyphicon glyph="remove" onClick={this.__handleAlertDismiss.bind(this)}></Glyphicon>
					</Alert>
					</div> : null
				}
				{(this.state.sessions.length != 0) ?										//onChange get scenarios for focused session
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
				{(this.state.scenarios.length != 0) ?										//onChange get questions for focused scenarios
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
						<select className='form-control' onChange={this.__toggleQuestionView} ref={(questiontype) => this.questiontype = questiontype} >
							<option value='default'>Select Question type </option>
							<option value='single'> Single Descriptive Question </option>
							<option value='mcq'> Multiple Choice Questions </option>
						</select>
					</div>
					: null
				}
				{(this.state.toggle) ?
					(this.questiontype.value == 'single') ?
						<div className="form-area">
							<form onSubmit={this.__check}>
								<div className="form-group">
									<label>Question Id:</label>
									<input type="text" data-id="questionId" className="form-control required1" value={this.state.questionid} ref={(questionId) => this.questionId = questionId} readOnly />
								</div>

								<div className="form-group">
									<label>Question Description:</label>
									<textarea type="text" data-id="questionDescription" className="form-control required1" ref={(questionDescription) => this.questionDescription = questionDescription} />
								</div>

								<div className="form-group">
									<label>Question Marks</label>
									<input type="number" data-id="questionMarks" className="form-control required1" ref={(questionMarks) => this.questionMarks = questionMarks} />
								</div>
								{this.state.invalidForm
									? <div className="form-group text-center invalid-color">
										<h6>
											<span>Please enter all the fields</span>
										</h6>
									</div>
									: null}
								<div>
									<button type="submit" className="btn btn-primary">Add Questions</button>
								</div>
							</form>
						</div> :
						<div className="form-area">
							<form onSubmit={this.__check}>
								<div className="form-group">
									<label>Question Id:</label>
									<input type="text" data-id="questionId" className="form-control required2" value={this.state.questionid} ref={(questionId) => this.questionId = questionId} readOnly />
								</div>

								<div className="form-group">
									<label>Question Description:</label>
									<textarea type="text" data-id="questionDescription" className="form-control required2" ref={(questionDescription) => this.questionDescription = questionDescription} />
								</div>

								<div className="form-group">
									<label>Question Marks</label>
									<input type="number" data-id="questionMarks" className="form-control required2" ref={(questionMarks) => this.questionMarks = questionMarks} />
								</div>

								<div className="form-group">
									<label>Option A</label>
									<input type="text" data-id="optiona" id="option1" className="form-control required2 mcq" ref={(optiona) => this.optiona = optiona} />
								</div>

								<div className="form-group">
									<label>Option B</label>
									<input type="text" data-id="optionb" id="option2" className="form-control required2 mcq" ref={(optionb) => this.optionb = optionb} />
								</div>

								<div className="form-group">
									<label>Option C</label>
									<input type="text" data-id="optionc" id="option3" className="form-control required2 mcq" ref={(optionc) => this.optionc = optionc} />
								</div>

								<div className="form-group">
									<label>Option D</label>
									<input type="text" data-id="optiond" id="option4" className="form-control required2 mcq" ref={(optiond) => this.optiond = optiond} />
								</div>

								<div className="form-group">
									<label> Correct Answer</label>
									<input type="text" data-id="correctanswer" id="correctanswer" className="form-control required2 correctanswer" ref={(correctanswer) => this.correctanswer = correctanswer} />
								</div>
								{this.state.invalidForm1
									? <div className="form-group text-center invalid-color">
										<h6>
											<span>Please enter all the fields</span>
										</h6>
									</div>
									: null}
								<div>
									<button type="submit" className="btn btn-primary">Add Questions</button>
								</div>
							</form>
						</div> : null
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
export default AddQuestions;

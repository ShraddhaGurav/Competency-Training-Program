import React from 'react';
import Axios from 'axios';
import { Alert, Glyphicon } from '../../../node_modules/react-bootstrap';
import ReactCountdownClock from '../../../node_modules/react-countdown-clock';

class QuesAns extends React.Component {
	constructor() {
		super();
		this.state = {
			data: [],
			quesid: [],
			qaset: [],
			errorStatus: '',
			startTest: false,
			testGiven: false,
			flag: false,
			key: 0
		};
		this.__handleSubmitAnswer = this.__handleSubmitAnswer.bind(this);
		this.__handleSubmitAnswer_mcq = this.__handleSubmitAnswer_mcq.bind(this);
		this.__handleAlertDismiss = this.__handleAlertDismiss.bind(this);
	}

	componentDidMount() {
		let q_ids = this.props.data.map(item => {
			return item.question_id;
		});
		this.setState({
			data: this.props.data,
			quesid: q_ids,
			flag: !this.props.flag
		});
	}

	componentWillReceiveProps(nextState) {
		if (this.props.data != nextState.data) {
			this.setState({
				data: nextState.data,
				flag: !nextState.flag
			});
		}
	}


	__handleSubmitAnswer() {				//Loop for storing answers for every particular Questions
		let answerDivs = document.getElementsByClassName('test-view');
		let answers = Object.keys(answerDivs).map(item => {
			let ans = answerDivs[item].children[0].children[3].children[1].children[0].value;
			return ans;
		});
		let qaset = [],
			i = 0;
		qaset = answers.map(item => {
			let q_id = this.state.quesid[i++];
			return { q_id: q_id, answer: item };
		});

		let traineeid = localStorage.getItem('auth_user');
		traineeid = traineeid.substring(1, traineeid.length - 1);

		Axios.post('http://localhost:3000/saveanswer', {
			sessionid: parseInt(this.props.sessionid),
			scenarioid: parseInt(this.props.scenarioid),
			traineeid: traineeid,
			qaset: qaset,
			questiontype: this.props.questiontype
		}).then(response => {
			if (response.data.success) {
				this.setState({
					startTest: !this.state.startTest,
					testGiven: true,
					errorStatus: ' Test submitted Successfully! '
				});
			}
			else
				this.setState({
					errorStatus: ' Database Error! '
				});
		}).catch(error => {
			this.setState({
				errorStatus: error
			});
		});
	}

	__handleSubmitAnswer_mcq() {
		let answerDivs = document.getElementsByClassName('test-view');
		let answers = Object.keys(answerDivs).map(() => {
			let ans_checked = document.getElementsByName('option');
			let correct_ans_checked;
			for (let i = 0; i < ans_checked.length; i++) {
				if (ans_checked[i].checked) {
					correct_ans_checked = ans_checked[i].value;
				}
			}
			return correct_ans_checked;
		});
		let qaset = [],
			i = 0;
		qaset = answers.map(item => {
			let q_id = this.state.quesid[i++];
			return { q_id: q_id, answer: item };
		});

		let traineeid = localStorage.getItem('auth_user');
		traineeid = traineeid.substring(1, traineeid.length - 1);

		Axios.post('http://localhost:3000/saveanswer', {
			sessionid: parseInt(this.props.sessionid),
			scenarioid: parseInt(this.props.scenarioid),
			traineeid: traineeid,
			qaset: qaset,
			questiontype: this.props.questiontype
		}).then(response => {
			if (response.data.success) {
				this.setState({
					startTest: !this.state.startTest,
					testGiven: true,
					errorStatus: ' Test submitted Successfully! '
				});
			}
			else
				this.setState({
					errorStatus: ' Database Error! '
				});
		}).catch(error => {
			this.setState({
				errorStatus: error
			});
		});
	}

	render() {
		if (this.state.data.length != 0 && this.state.flag) {
			var quesAns = this.state.data.map(item => {
				return (
					<div className='test-view' key={this.state.key++}>
						{(this.props.questiontype == 'single') ?
							<div className="form-area">
								<div className="form-group">
									<label>Question No.</label>
									<div>{item.question_id}</div>
								</div>

								<div className="form-group">
									<label>Question</label>
									<div>{item.question_description}</div>
								</div>

								<div className="form-group">
									<label>Question Marks</label>
									<div>{item.question_marks}</div>
								</div>

								<div className="form-group">
									<label>Answer</label>
									<div><textarea></textarea></div>
								</div>
							</div>
							:
							<div className="form-area">
								<div className="form-group">
									<label>Question No.</label>
									<div>{item.question_id}</div>
								</div>

								<div className="form-group">
									<label>Question</label>
									<div>{item.question_description}</div>
								</div>

								<div className="form-group">
									<label>Question Marks</label>
									<div>{item.question_marks}</div>
								</div>

								<div className="form-group">
									<label>Option a:</label>
									<div>{item.option_a}<input type='radio' name='option' value={item.option_a}></input></div>
								</div>

								<div className="form-group">
									<label>Option b:</label>
									<div>{item.option_b}<input type='radio' name='option' value={item.option_b}></input></div>
								</div>

								<div className="form-group">
									<label>Option c:</label>
									<div>{item.option_c}<input type='radio' name='option' value={item.option_c}></input></div>
								</div>

								<div className="form-group">
									<label>Option d:</label>
									<div>{item.option_d}<input type='radio' name='option' value={item.option_d}></input></div>
								</div>

							</div>

						}
					</div>
				);
			});
			return (
				<div className='right-container'>
					{(!this.state.testGiven) ?
						<div>
							{(this.state.startTest) ? null : <button className='btn btn-primary' onClick={this.__toggleTestView.bind(this)}> Start Test </button>}
							{this.state.errorStatus.length != 0 ? <div className='alertBox'><Alert bsStyle="warning"><p className='alertMessage'>{this.state.errorStatus}</p><Glyphicon glyph="remove" onClick={this.__handleAlertDismiss}></Glyphicon></Alert></div> : null}
							{(this.state.startTest) ?
								<div>
									<div className='div-title'> My Test </div>
									<div className='pre-scrollable'>
										<div className='view-form'>
											<div id='ques-div'>{quesAns}</div>
										</div>
										{(this.props.questiontype == 'single') && (this.props.questiontype != 'default') ?
											<ReactCountdownClock seconds={this.state.data[0].scenario_duration} size={100} color="#4286f4" onComplete={this.__handleSubmitAnswer} /> :
											<ReactCountdownClock seconds={this.state.data[0].scenario_duration} size={100} color="#4286f4" onComplete={this.__handleSubmitAnswer_mcq} />
										}

									</div>
									{(this.props.questiontype == 'single') && (this.props.questiontype != 'default') ?
										<div className="form-group" id='submit-button'>
											<button className="btn btn-primary" onClick={this.__handleSubmitAnswer}>Submit Test</button>
										</div> :
										<div className="form-group" id='submit-button'>
											<button className="btn btn-primary" onClick={this.__handleSubmitAnswer_mcq}>Submit Test</button>
										</div>
									}
								</div> : null}
						</div> : <div>{this.state.errorStatus.length != 0 ? <div className='alertBox'><Alert bsStyle="warning"><p className='alertMessage'>{this.state.errorStatus}</p><Glyphicon glyph="remove" onClick={this.__handleAlertDismiss}></Glyphicon></Alert></div> : null}</div>}
				</div>
			);
		} else {
			return null;
		}
	}

	__toggleTestView() {
		this.setState({
			startTest: !this.state.startTest
		});
	}

	__handleAlertDismiss() {
		if (this.state.errorStatus.length != 0)
			this.setState({
				errorStatus: ''
			});
	}

}
export default QuesAns;

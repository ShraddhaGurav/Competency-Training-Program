import React from 'react';
import Axios from 'axios';
import { Alert, Glyphicon } from '../../../node_modules/react-bootstrap';

export default class FetchResult extends React.Component {
	constructor() {
		super();
		this.state = {
			data: [],
			quesid: [],
			errorStatus: '',
			key: 0
		};
	}

	componentDidMount() {
		let q_ids = this.props.data.map(item => {
			return item.question_id;
		});
		this.setState({
			data: this.props.data,
			quesid: q_ids
		});
	}

	componentWillReceiveProps(nextState) {
		if (this.props.data != nextState.data) {
			this.setState({
				data: nextState.data
			});
		}
	}

	render() {
		if (this.state.data.length != 0) {
			var quesAns = this.state.data.map(item => {
				return (
					<div className='test-view' key={this.state.key++}>
						<div className="form-group">
							<label>Question No.</label>
							<div>{item.question_id}</div>
						</div>
						<div className="form-group">
							<label>Question</label>
							<div>{item.question_description}</div>
						</div>
						<div className="form-group">
							<label>Question Marks.</label>
							<div>{item.question_marks}</div>
						</div>
						<div className="form-group">
							<label>Answer</label>
							<div>{item.answer}</div>
						</div>
						<div className="form-group">
							<label>Marks</label>
							<div><input type="number" /></div>
						</div>
						<div className="form-group">
							<label>Remarks</label>
							<div><textarea></textarea></div>
						</div>
					</div>
				);
			});
			return (
				<div className='right-container'>
					{this.state.errorStatus.length != 0 ? <div className='alertBox'><Alert bsStyle="warning"><p className='alertMessage'>{this.state.errorStatus}</p><Glyphicon glyph="remove" onClick={this.__handleAlertDismiss.bind(this)}></Glyphicon></Alert></div> : null}
					<div className='pre-scrollable'>
						<div className='view-form'>{quesAns}</div>
					</div>
					<div className="form-group" id='submit-button'>
						<button className="btn btn-primary" onClick={this.__handleSubmitAnswer.bind(this)}>Assign Score</button>
					</div>
				</div>
			);
		} else {
			return null;
		}
	}

	__handleSubmitAnswer() {
		let i = 0,
			valid = true;
		let fetchScore = document.getElementsByClassName('test-view');
		let marks = Object.keys(fetchScore).map(item => {
			let q_id = this.state.quesid[i];
			let mark = fetchScore[item].children[4].children[1].children[0].value;
			if (mark > this.state.data[i].question_marks) {
				mark = this.state.data[i].question_marks;
			}
			i++;
			let remarks = fetchScore[item].children[5].children[1].children[0].value;
			return { q_id: q_id, mark: parseInt(mark), remarks: remarks };
		});

		marks.forEach(item => {
			if (isNaN(item.mark) || item.mark < 0) {
				valid = false;
			}
		});

		if (valid) {
			Axios.post('http://localhost:3000/savemarks', {
				sessionid: parseInt(this.props.sessionid),
				scenarioid: parseInt(this.props.scenarioid),
				traineeid: this.props.traineeid,
				marks: marks
			}).then(response => {
				if (response.data.success) {
					this.setState({
						errorStatus: ' Marks submitted Successfully! '
					});
				}
				else
					this.setState({
						errorStatus: ' Database Error! '
					});
			}).catch(function (error) {
				this.setState({
					errorStatus: error
				});
			});
		} else {
			this.setState({
				errorStatus: ' Invalid Mark Entry! '
			});
		}
	}

	__handleAlertDismiss() {
		if (this.state.errorStatus.length != 0)
			this.setState({
				errorStatus: ''
			});
	}
}

import React from 'react';
import Axios from 'axios';
import { Alert, Glyphicon } from '../../../node_modules/react-bootstrap';

export default class ListAll extends React.Component {
	constructor() {
		super();
		this.state = {
			sessions: [],
			errorStatus: '',
			data: [],
			key: 0
		};
	}

	componentWillMount() {
		Axios.post('http://localhost:3000/getsessions', {
			from: 'admin'
		}).then(response => {
			if (response.data.success) {
				this.setState({
					sessions: response.data.data,
					errorStatus: ''
				});
			} else {
				this.setState({
					sessions: [],
					data: [],
					errorStatus: 'No Session Found'
				});
			}
		}).catch(err => {
			this.setState({
				errorStatus: err
			});
		});
	}

	__getSummary() {
		if (this.sessions.value != 'default') {
			Axios.post('http://localhost:3000/getsummary', {
				sessionid: this.sessions.value
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
							errorStatus: 'No data found for this session!!'
						});
				} else {
					this.setState({
						data: [],
						errorStatus: 'GetSummary DB Error!!'
					});
				}
			}).catch(err => {
				this.setState({
					data: [],
					errorStatus: err
				});
			});
		} else {
			this.setState({
				errorStatus: ' Select atleast one Session!! '
			});
		}
	}

	render() {
		return (
			<div className='right-container'>
				<div className='div-title'> Report Summary </div>
				{this.state.errorStatus.length != 0 ?
					<div className='alertBox'>
						<Alert bsStyle="warning">
							<p className='alertMessage'>{this.state.errorStatus}</p>
							<Glyphicon glyph="remove" onClick={this.__handleAlertDismiss.bind(this)}></Glyphicon>
						</Alert>
					</div> : null
				}
				{(this.state.sessions.length != 0) ?
					<div className='drop-down-element'>
						<select className='form-control' ref={(sessions) => this.sessions = sessions} onChange={this.__getSummary.bind(this)} >
							<option value='default'>Select Session</option>
							{this.state.sessions.map(item => {
								return <option value={item.session_id} key={item.session_id}>{item.session_name}</option>;
							})}
						</select>
					</div> : null
				}
				{(this.state.data.length != 0) ?
					<div id='table-summary' className='pre-scrollable'>
						<table className="table table-bordered table-hover">
							<thead>
								<tr>
									<th>Trainee ID</th>
									<th>Question</th>
									<th>Answer</th>
									<th>Marks</th>
									<th>Remarks</th>
								</tr>
							</thead>
							<tbody>
								{this.state.data.map(item => {
									return (
										<tr key={this.state.key++}>
											<td>{item.trainee_id}</td>
											<td>{item.question_description}</td>
											<td>{item.answer}</td>
											<td>{item.answer_marks}</td>
											<td>{item.remark}</td>
										</tr>
									);
								})}
							</tbody>
						</table>
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


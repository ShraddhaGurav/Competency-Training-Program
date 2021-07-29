import React from 'react';
import Axios from 'axios';
import TableView from '../../common/table/TableView';
import { Alert, Glyphicon } from '../../../node_modules/react-bootstrap';

class ViewTraining extends React.Component {
	constructor() {
		super();
		this.state = {
			data: [],
			header: [],
			errorStatus: ''
		};
		this.componentWillMount = this.componentWillMount.bind(this);
	}
	componentWillMount() {
		let user = localStorage.getItem('auth_user');
		user = user.substring(1, user.length - 1);
		Axios.post('http://localhost:3000/viewtraining', {
			trainerid: user
		}).then(response => {
			if (response.data.success) {
				let header = [
					{ key: 'session_id', label: 'Session ID' },
					{ key: 'session_name', label: 'Session Name' },
					{ key: 'date_created', label: 'Created On' },
					{ key: 'scenario_id', label: 'Scenario ID' },
					{ key: 'scenario_name', label: 'Scenario Name' },
					{ key: 'is_active', label: 'Is Active' },
					{ key: 'is_started', label: 'Is Started' }
				];
				this.setState({
					data: response.data.data,
					header: header,
					errorStatus: ''
				});
			}
			else {
				this.setState({
					errorStatus: 'No Active Sessions !!'
				});
			}
		}).catch(function (error) {
			this.setState({
				errorStatus: error
			});
		});
	}

	render() {
		return (
			(this.state.data.length != 0) ?
				<div className='right-container'>
					<div className='div-title'> Trainings </div>
					{(this.state.errorStatus.length != 0) ?
						<div className='alertBox'><Alert bsStyle="warning">
							<p className='alertMessage'>{this.state.errorStatus}</p>
							<Glyphicon glyph="remove" onClick={this.__handleAlertDismiss.bind(this)}></Glyphicon>
						</Alert></div> : null
					}
					<TableView header={this.state.header} data={this.state.data} table={'sessions'} is_started={true} buttonName={'Perform Action on  Test'} />
				</div> : <div>
					{(this.state.errorStatus.length != 0) ?
						<div className='alertBox'><Alert bsStyle="warning">
							<p className='alertMessage'>{this.state.errorStatus}</p>
							<Glyphicon glyph="remove" onClick={this.__handleAlertDismiss.bind(this)}></Glyphicon>
						</Alert></div> : null
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

export default ViewTraining;

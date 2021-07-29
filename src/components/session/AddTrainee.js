import React from 'react';
import Axios from 'axios';
import TableView from '../../common/table/TableView';
import { Alert, Glyphicon } from '../../../node_modules/react-bootstrap';

class AddTrainee extends React.Component {
	constructor() {
		super();
		this.state = {
			sessions: [],
			header: [],
			available_trainees: [],
			errorStatus: ''
		};

		this.componentWillMount = this.componentWillMount.bind(this);
		this.__getAvailableTrainees = this.__getAvailableTrainees.bind(this);
	}

	componentWillMount() {
		Axios.post('http://localhost:3000/getsessions', {
			from: 'admin'
		}).then(response => {
			if (response.data.success) {
				let header = [
					{ key: 'user_id', label: 'User Id' },
					{ key: 'first_name', label: 'First Name' },
					{ key: 'last_name', label: 'Last Name' }
				];
				this.setState({
					sessions: response.data.data,
					header: header,
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
	}

	__getAvailableTrainees() {
		if (this.sessions.value != 'default') {
			Axios.post('http://localhost:3000/gettrainee', {
				sessionid: this.sessions.value
			}).then(response => {
				if (response.data.success) {
					this.setState({
						available_trainees: response.data.data,
					});
				}
				else {
					this.setState({
						errorStatus: ' No Trainee Available !! '
					});
				}
			}).catch(function (error) {
				this.setState({
					errorStatus: error
				});
			});
		} else {
			this.setState({
				available_trainees: []
			});
		}
	}

	render() {
		return (
			<div className='right-container'>
				<div className='div-title'> Add Trainee </div>
				{this.state.errorStatus.length != 0 ?
					<div className='alertBox' >
						<Alert bsStyle="warning">
							<p className='alertMessage'>{this.state.errorStatus}</p>
							<Glyphicon glyph="remove" onClick={this.__handleAlertDismiss.bind(this)}></Glyphicon>
						</Alert>
					</div> : null
				}
				{(this.state.sessions.length != 0) ?					//Get available Trainees for focused Session
			<div className='drop-down-element'>
				<select className='form-control' ref={(sessions) => this.sessions = sessions} onChange={this.__getAvailableTrainees} >
					<option value='default'>Select Session</option>
					{this.state.sessions.map(item => {
						return <option value={item.session_id} key={item.session_id}>{item.session_name}</option>;
					})}
				</select>
			</div> : null
				}
				{
					(this.state.available_trainees.length != 0) ?
						<div>
							<TableView data={this.state.available_trainees} header={this.state.header} otheroption={'addoption'} sessionid={this.sessions.value} />
						</div> :
						null
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

export default AddTrainee;

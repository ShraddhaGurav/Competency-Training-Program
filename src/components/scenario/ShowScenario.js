import React from 'react';
import Axios from 'axios';
import TableView from '../../common/table/TableView';
import { Alert, Glyphicon } from '../../../node_modules/react-bootstrap';

class ShowScenario extends React.Component {
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
		let trainerid = localStorage.getItem('auth_user');
		trainerid = trainerid.substring(1, trainerid.length - 1);
		Axios.post('http://localhost:3000/showscenario',{						//Get scenarios for current trainedId
			trainerid: trainerid
		}).then(response => {
			if(response.data.success === 2){
				this.setState({
					errorStatus: 'No Scenarios found!!'
				});
			} else {
				if (response.data.success) {
					let header = [
						{ key: 'session_id', label: 'Session ID' },
						{ key: 'session_name', label: 'Session Name' },
						{ key: 'scenario_id', label: 'Scenario ID' },
						{ key: 'scenario_name', label: 'Scenario Name' },
						{ key: 'scenario_description', label: 'Scenario Description' },
						{ key: 'is_started', label: 'Started'}
					];
					this.setState({
						data: response.data.data,
						header: header,
						errorStatus: ''
					});
				}
				else {
					this.setState({
						errorStatus: 'Error!!'
					});
				}
			}
		}).catch(function (error) {
			this.setState({
				errorStatus: error
			});
		});
	}

	render() {
		return (
			<div className='right-container'>
				<div className='div-title'> Scenarios </div>
				{this.state.errorStatus.length != 0 ? <div className='alertBox'><Alert bsStyle="warning"><p className='alertMessage'>{this.state.errorStatus}</p><Glyphicon glyph="remove" onClick={this.__handleAlertDismiss.bind(this)}></Glyphicon></Alert></div> : null}
				{(this.state.data.length != 0) ? <TableView header={this.state.header} data={this.state.data} table={'scenarios'} is_started={false} buttonName={'not-needed'}/> : null}
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

export default ShowScenario;

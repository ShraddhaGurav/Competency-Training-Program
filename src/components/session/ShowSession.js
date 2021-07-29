import React from 'react';
import Axios from 'axios';
import TableView from '../../common/table/TableView';
import { Alert, Glyphicon } from '../../../node_modules/react-bootstrap';

class ShowSession extends React.Component {
	constructor() {
		super();
		this.state = {
			data: [],
			header: [],
			errorStatus: ''
		};
		this.componentWillMount = this.componentWillMount.bind(this);
	}

	componentWillMount() {					//Get sessions for current Trainer
		Axios.get('http://localhost:3000/showsession').then(response => {
			if (response.data.success) {
				let header = [
					{ key: 'session_id', label: 'Session ID' },
					{ key: 'session_name', label: 'Session Name' },
					{ key: 'trainer_id', label: 'Trainer ID' },
					{ key: 'date_created', label: 'Created On' },
					{ key: 'session_duration', label: 'Duration' },
					{ key: 'is_active', label: 'Is Active' }
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
					<div className='div-title'> Sessions </div>
					{this.state.errorStatus.length != 0 ? <div className='alertBox'><Alert bsStyle="warning"><p className='alertMessage'>{this.state.errorStatus}</p><Glyphicon glyph="remove" onClick={this.__handleAlertDismiss.bind(this)}></Glyphicon></Alert></div> : null}
					<TableView header={this.state.header} data={this.state.data} table={'sessions'} is_started={false} buttonName={'Perform action on selected Session'} />
				</div> : null
		);
	}

	__handleAlertDismiss() {

		if (this.state.errorStatus.length != 0)
			this.setState({
				errorStatus: ''
			});
	}
}

export default ShowSession;

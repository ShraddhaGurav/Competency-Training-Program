import React from 'react';
import Axios from 'axios';
import TableView from '../../common/table/TableView';
import { Alert, Glyphicon } from '../../../node_modules/react-bootstrap';

class ShowUser extends React.Component {
	constructor() {
		super();
		this.state = {
			data: [],
			header: [],
			errorStatus: ''
		};
		this.componentWillMount = this.componentWillMount.bind(this);
	}
	componentWillMount() {						//Fetch Data for current user
		Axios.get('http://localhost:3000/showuser').then(response => {
			if (response.data.success) {
				let header = [
					{ key: 'user_id', label: 'User ID' },
					{ key: 'emp_id', label: 'Emp ID' },
					{ key: 'full_name', label: 'Name' },
					{ key: 'email_id', label: 'Email ID' },
					{ key: 'role', label: 'role' },
					{ key: 'date_created', label: 'Created On' },
					{ key: 'is_active', label: 'Perform Action' }
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
					<div className='div-title'> Users </div>
					{this.state.errorStatus.length != 0 ? <div className='alertBox'><Alert bsStyle="warning"><p className='alertMessage'>{this.state.errorStatus}</p><Glyphicon glyph="remove" onClick={this.__handleAlertDismiss.bind(this)}></Glyphicon></Alert></div> : null}
					<TableView header={this.state.header} data={this.state.data} table={'users'} buttonName={'Perform Action on User '} buttonName_del={'Perform Delete'} />
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

export default ShowUser;

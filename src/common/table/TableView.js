import React from 'react';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import Axios from 'axios';
import '../../../node_modules/react-bootstrap-table/dist/react-bootstrap-table.min.css';
import { Alert, Glyphicon } from '../../../node_modules/react-bootstrap';

class TableView extends React.Component {
	constructor() {
		super();
		this.state = {
			toggle: false,
			data: [],
			errorStatus: ''
		};
		this.getSelectedKeys = this.getSelectedKeys.bind(this);
		this.__addTrainee = this.__addTrainee.bind(this);
	}
	componentDidMount() {
		this.setState({
			data: this.props.data
		});
	}

	componentWillReceiveProps(nextprops) {
		if (this.props.data != nextprops.data) {
			this.setState({
				data: nextprops.data
			});
		}
	}

	render() {

		var tableHeader = this.__getHeader(this.props.header),
			dataToRender = this.state.data;

		const options = {
			sizePerPageList: [5, 10, 15],
			sizePerPage: 5,
			paginationSize: 3,
			clearSearch: true
		};

		const selectRows = {
			mode: 'checkbox'
		};
		return (
			<div className='right-container'>
				{this.state.errorStatus.length != 0 ? <div className='alertBox'><Alert bsStyle="warning"><p className='alertMessage'>{this.state.errorStatus}</p><Glyphicon glyph="remove" onClick={this.__handleAlertDismiss.bind(this)}></Glyphicon></Alert></div> : null}
				<div id='table-component'>
					<BootstrapTable ref={(table) => this.table = table} data={dataToRender} hover pagination selectRow={selectRows} options={options} search={true} multiColumnSearch={true}>
						{tableHeader}
					</BootstrapTable>
					{(this.props.otheroption == 'addoption') ? <button className='btn btn-primary' onClick={this.__addTrainee.bind(this)}> Add Trainee </button> : (this.props.buttonName != 'not-needed') ? (this.props.table == 'users') ? <div className='parent-button-holder'> <button className='btn btn-primary' onClick={this.getSelectedKeys.bind(this)}>{this.props.buttonName}</button> <button className='btn btn-primary' onClick={this.getSelectedKeys_for_del.bind(this)}>{this.props.buttonName_del}</button> </div> : <button className='btn btn-primary' onClick={this.getSelectedKeys.bind(this)}>{this.props.buttonName}</button> : null}
				</div>
			</div>
		);
	}

	__getHeader(heads) {
		var cols = heads;
		let headerArr = [];
		let flag = false;
		cols.forEach(column => {				//Generating table-Header
			if (flag) {
				if (column.key == 'emp_id' || column.key == 'full_name' || column.key == 'session_name' || column.key == 'role' || column.key == 'date_created') {
					headerArr.push(<TableHeaderColumn dataField={column.key} dataSort={true} key={column.key}>{column.label}</TableHeaderColumn>);
				} else if (column.key == 'is_active' || column.key == 'is_started') {
					headerArr.push(<TableHeaderColumn dataField={column.key} dataFormat={this.__handleStartStop} key={column.key}>{column.label}</TableHeaderColumn>);
				} else {
					headerArr.push(<TableHeaderColumn dataField={column.key} key={column.key}>{column.label}</TableHeaderColumn>);
				}
			} else {
				headerArr.push(<TableHeaderColumn isKey dataField={column.key} searchable={false} key={column.key}>{column.label}</TableHeaderColumn>);
				flag = true;
			}
		});

		return headerArr;
	}


	getSelectedKeys_for_del() {
		let selectedRows = this.table.state.selectedRowKeys;

		let selectedData = this.props.data.filter(row => {
			if (this.props.table == 'users') {
				if (row.user_id == selectedRows[0])
					return row;
			} else {
				if (row.session_id == selectedRows[0])
					return row;
			}
		});


		if (selectedRows.length == 1) {
			if (selectedRows[0] != 'admin') {

				Axios.post('http://localhost:3000/deluser', {
					emp_id: selectedData[0].emp_id,
				}).then(response => {
					if (response.data.success) {
						let currData = this.state.data;
						alert('Are you sure you want to delete?');
						let newData = currData.filter(item => {
							if (selectedRows.indexOf(item.user_id) < 0) {
								return item;
							}
						});
						this.setState({
							data: newData,
							errorStatus: 'User deleted from database!'
						});
					} else {
						this.setState({
							errorStatus: 'Database Error!'
						});
					}
				}).catch(function (error) {
					this.setState({
						errorStatus: error
					});
				});
			} else {
				this.setState({
					errorStatus: 'Admin cannot be deleted!!'
				});
			}
		} else
			this.setState({
				errorStatus: 'Please select only one item to perform action !!!'
			});
		setTimeout(() => {
			window.location = 'http://localhost:8080/dashboard/showallusers';
		}, 3000);

	}

	getSelectedKeys() {						//Get Selected Rows and toggle active State
		let selectedRows = this.table.state.selectedRowKeys;
		let selectedData = this.props.data.filter(row => {
			if (this.props.table == 'users') {
				if (row.user_id == selectedRows[0])
					return row;
			} else {
				if (row.session_id == selectedRows[0])
					return row;
			}
		});

		if (selectedRows.length == 1) {
			if (selectedRows[0] != 'admin') {
				let field = '';
				if (this.props.is_started) {
					field = 'is_started';
				} else {
					field = 'is_active';
				}
				Axios.post('http://localhost:3000/getstate', {
					id: selectedRows[0],
					tableName: this.props.table,
					currentState: selectedData[0].is_active,
					currentState1: selectedData[0].is_started,
					fieldToBeUpdated: field

				}).then(response => {
					if (response.data.success) {
						let currData = this.state.data;
						currData.filter(row => {
							if (this.props.table == 'users') {
								if (row.user_id == selectedRows[0])
									(row.is_active == 1) ? row.is_active = 0 : row.is_active = 1;
							} else {
								if (!this.props.is_started) {
									if (row.session_id == selectedRows[0])
										(row.is_active == 1) ? row.is_active = 0 : row.is_active = 1;
								} else {
									if (row.session_id == selectedRows[0])
										(row.is_started == 1) ? row.is_started = 0 : row.is_started = 1;
								}
							}
						});
						this.setState({
							data: currData
						});
					} else {
						this.setState({
							errorStatus: 'Database Error!'
						});
					}
				}).catch(function (error) {
					this.setState({
						errorStatus: error
					});
				});
			} else {
				this.setState({
					errorStatus: 'Admin cannot be deactivated!!'
				});
			}
		} else
			this.setState({
				errorStatus: 'Please  select only one item to perform action !!!'
			});
	}

	__addTrainee() {				//Get Selected Trainees and add trainee to specific Session!
		let selectedRows = this.table.state.selectedRowKeys;
		if (selectedRows.length > 0) {
			Axios.post('http://localhost:3000/addtrainee', {
				selectedrows: selectedRows,
				sessionid: this.props.sessionid
			}).then(response => {
				if (response.data.success) {
					let newData = this.state.data.filter(item => {
						if (selectedRows.indexOf(item.user_id) < 0) {
							return item;
						}
					});
					this.setState({
						data: newData,
						errorStatus: ' Trainee Added to the Session!! '
					});
				} else {
					this.setState({
						errorStatus: ' AddTrainee DB Error!! '
					});
				}
			}).catch(function (error) {
				this.setState({
					errorStatus: error
				});
			});
		} else {
			this.setState({
				errorStatus: ' Select atleast One Trainee!! '
			});
		}
	}

	__handleStartStop(cellicon) {			//Toggle Icon for Start and Stop
		if (cellicon == '1' || cellicon == '1') {
			return (
				<Glyphicon glyph="play" title='Active '></Glyphicon>
			);
		} else {
			return (
				<Glyphicon glyph="stop" title='Non-Active'></Glyphicon>
			);
		}
	}

	__handleAlertDismiss() {				//Handler for toggling alert component
		if (this.state.errorStatus.length != 0)
			this.setState({
				errorStatus: ''
			});
	}
}

export default TableView;

import React from 'react';
import Axios from 'axios';
import Barchart from './Barchart';
import { Alert, Glyphicon } from '../../../node_modules/react-bootstrap';

export default class ListAll extends React.Component {
	constructor() {
		super();
		this.state = {
			sessions: [],
			scenarios: [],
			trainer: '',
			trainee: '',
			errorStatus: '',
			dbdata: [],
			dbdata_mcq: [],
			options: {
				title: 'Scores Per Session',
				legend: 'none',
			},
			options_mcq: {
				title: 'Scores Per Session(MCQ)',
				legend: 'none',
			},
			data: [],
			data_mcq: [],
			columns: [
				{
					label: 'Trainee ID',
					type: 'string'
				},
				{
					label: 'Marks',
					type: 'number'
				}
			]
		};

		this.__structData = this.__structData.bind(this);
	}

	componentWillMount() {
		let trainee = localStorage.getItem('auth_user');
		trainee = trainee.substring(1, trainee.length - 1);
		this.setState({
			trainee: trainee
		});
	}

	__getReport() {
		Axios.post('http://localhost:3000/getreportdata', {
			action: 'trainee-individual',
			trainee: this.state.trainee
		}).then(response => {
			if (response.data.success) {
				if (response.data.success == 1) {
					this.setState({
						dbdata: response.data.data,
						dbdata_mcq: response.data.data_mcq,
						errorStatus: ''
					});
					this.__structData();
				} else
					this.setState({
						dbdata: [],
						dbdata_mcq: [],
						data: [],
						data_mcq: [],
						errorStatus: 'No Data Found!!'
					});
			} else {
				this.setState({
					dbdata: [],
					dbdata_mcq: [],
					data: [],
					data_mcq: [],
					errorStatus: 'GetReportData DB Error!!'
				});
			}
		}).catch(err => {
			this.setState({
				errorStatus: err
			});
		});
	}



	__structData() {				//Get scenarios onchaged for focused Scenarios
		let tot_marks = {},
			tot_marks_mcq = {},
			data = [],
			data_mcq = [];

		this.state.dbdata.forEach(item => {
			tot_marks[item.session_name] = 0;
			tot_marks_mcq[item.session_name] = 0;
		});
		this.state.dbdata.forEach(item => {
			tot_marks[item.session_name] += item.answer_marks;
		});
		Object.keys(tot_marks).forEach(item => {
			data.push([item, tot_marks[item]]);
		});
		this.state.dbdata_mcq.forEach(item_mcq => {
			tot_marks_mcq[item_mcq.session_name] += item_mcq.marks_allotted;
		});
		Object.keys(tot_marks_mcq).forEach(item_mcq => {
			data_mcq.push([item_mcq, tot_marks_mcq[item_mcq]]);
		});
		this.setState({
			data: data,
			data_mcq: data_mcq
		});
	}

	render() {
		return (
			<div className='right-container'>
				<div className='div-title'> My Reports </div>
				{this.state.errorStatus.length != 0 ?
					<div className='alertBox'>
						<Alert bsStyle="warning">
							<p className='alertMessage'>{this.state.errorStatus}</p>
							<Glyphicon glyph="remove" onClick={this.__handleAlertDismiss.bind(this)}></Glyphicon>
						</Alert>
					</div> : null
				}

				<div className='drop-down-element'>
					<select className='form-control' onChange={this.__getReport.bind(this)} ref={(rendercharttype) => this.rendercharttype = rendercharttype} >
						<option value='default'>Select Chart type to render </option>
						<option value='single'> Single Question type Chart </option>
						<option value='multiple'> Multiple Choice Questions type Chart </option>
					</select>
				</div>

				{(this.state.data.length != 0 && this.state.data_mcq.length != 0 && this.rendercharttype.value != 'default') ?
					(this.rendercharttype.value == 'single') ? <Barchart data={this.state.data} chart_type={this.rendercharttype.value} options={this.state.options} columns={this.state.columns} />
						: <Barchart data={this.state.data_mcq} chart_type={this.rendercharttype.value} options={this.state.options_mcq} columns={this.state.columns} />
					: null
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

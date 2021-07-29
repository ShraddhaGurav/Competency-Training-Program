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
			errorStatus: '',
			dbdata: [],
			dbdata_mcq: [],
			options: {
				title: 'Average Score Per Trainee',
				legend: 'none',
			},
			options_mcq: {
				title: 'Average Score Per Trainee(MCQ)',
				legend: 'none'
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
		this.__getScenarios = this.__getScenarios.bind(this);
	}

	componentWillMount() {
		let trainer = localStorage.getItem('auth_user');
		trainer = trainer.substring(1, trainer.length - 1);
		this.setState({
			trainer: trainer
		});
		Axios.post('http://localhost:3000/getsessions', {
			from: 'trainer',
			trainerid: trainer
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
					data_mcq: [],
					errorStatus: 'No Session Found'
				});
			}
		}).catch(err => {
			this.setState({
				errorStatus: err
			});
		});
	}

	__structData() {
		let tot_marks = {},
			tot_marks_mcq = {},
			data = [],
			data_mcq = [];
		this.state.dbdata.forEach(item => {
			tot_marks[item.trainee_id] = 0;
			tot_marks_mcq[item.trainee_id] = 0;
		});
		this.state.dbdata.forEach(item => {
			tot_marks[item.trainee_id] += item.answer_marks;
		});
		Object.keys(tot_marks).forEach(item => {
			data.push([item, tot_marks[item]]);
		});
		this.state.dbdata_mcq.forEach(item_mcq => {
			tot_marks_mcq[item_mcq.trainee_id] += item_mcq.marks_allotted;
		});
		Object.keys(tot_marks_mcq).forEach(item_mcq => {
			data_mcq.push([item_mcq, tot_marks_mcq[item_mcq]]);
		});




		this.setState({
			data: data,
			data_mcq: data_mcq
		});
	}

	__getScenarios() {						//Get scenarios
		Axios.post('http://localhost:3000/getscenarios', {
			sessionid: this.sessions.value
		}).then(response => {
			if (response.data.success) {
				if (response.data.success == 1) {
					this.setState({
						scenarios: response.data.data,
						errorStatus: ''
					});
				} else
					this.setState({
						scenarios: [],
						data: [],
						data_mcq: [],
						errorStatus: 'No Scenario Found!!'
					});
			} else {
				this.setState({
					scenarios: [],
					data: [],
					data_mcq: [],
					errorStatus: 'GetScenarios DB Error!!'
				});
			}
		}).catch(err => {
			this.setState({
				errorStatus: err
			});
		});
	}

	__getReport() {						//Get reportData of sessionId and scenarioId
		if (this.sessions.value != 'default') {
			if (this.scenarios.value != 'default') {
				Axios.post('http://localhost:3000/getreportdata', {
					action: 'trainer-individual',
					sessionid: this.sessions.value,
					scenarioid: this.scenarios.value
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
								data_mcq: [],
								data: [],
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
			} else {
				this.setState({
					data: [],
					data_mcq: [],
					errorStatus: 'Select atleast one scenario'
				});
			}
		} else {
			this.setState({
				data: [],
				data_mcq: [],
				errorStatus: 'Select atleast one session'
			});
		}
	}

	render() {
		return (
			<div className='right-container'>
				<div className='div-title'> Reports </div>
				{this.state.errorStatus.length != 0 ?
					<div className='alertBox'>
						<Alert bsStyle="warning">
							<p className='alertMessage'>{this.state.errorStatus}</p>
							<Glyphicon glyph="remove" onClick={this.__handleAlertDismiss.bind(this)}></Glyphicon>
						</Alert>
					</div> : null
				}
				{(this.state.sessions.length != 0) ?						//Get scenarios onchaged for focused session
			<div className='drop-down-element'>
				<select className='form-control' ref={(sessions) => this.sessions = sessions} onChange={this.__getScenarios.bind(this)} >
					<option value='default'>Select Session</option>
					{this.state.sessions.map(item => {
						return <option value={item.session_id} key={item.session_id}>{item.session_name}</option>;
					})}
				</select>
			</div> : null
				}
				{(this.state.scenarios.length != 0) ?						//Get getReport data onchaged for focused scenarios
			<div className='drop-down-element'>
				<select className='form-control' ref={(scenarios) => this.scenarios = scenarios} >
					<option value='default'>Select Scenario</option>
					{this.state.scenarios.map(item => {
						return <option value={item.scenario_id} key={item.scenario_id}>{item.scenario_name}</option>;
					})}
				</select>
			</div>
					: null
				}
				{(this.state.sessions.length != 0) ?
					<div className='drop-down-element'>
						<select className='form-control' onChange={this.__getReport.bind(this)} ref={(rendercharttype) => this.rendercharttype = rendercharttype} >
							<option value='default'>Select Chart type to render </option>
							<option value='single'> Single Question type Chart </option>
							<option value='multiple'> Multiple Choice Questions type Chart </option>
						</select>
					</div>
					: null
				}

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

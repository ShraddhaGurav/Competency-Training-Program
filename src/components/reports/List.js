import React from 'react';
import Axios from 'axios';
import Barchart from './Barchart';
import { Alert, Glyphicon } from '../../../node_modules/react-bootstrap';

export default class List extends React.Component {
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
				title: 'Average Score Per Scenario',
				legend: 'none',
			},
			data: [],
			data_mcq: [],
			final_data: [],
			columns: [
				{
					label: 'Scenario Name',
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

	componentDidMount() {
		let option = {};
		if (this.props.from != 'admin') {
			let trainer = localStorage.getItem('auth_user');
			trainer = trainer.substring(1, trainer.length - 1);
			this.setState({
				trainer: trainer
			});
			option = {
				from: this.props.from,
				trainerid: trainer
			};
		} else {
			option = {
				from: this.props.from
			};
		}

		Axios.post('http://localhost:3000/getsessions', option).then(response => {
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
					final_data: [],
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
		let tot_marks = [],
			tot_marks_mcq = [],
			tot_trainee_mcq = [],
			tot_trainee = [],
			data = [],
			data_mcq = [],
			avg_mcq = 0,
			avg = 0,
			avg_final_total = 0,
			final_data = [];

		this.state.scenarios.forEach(item => {
			tot_marks[item.scenario_id - 1] = 0;
			tot_marks_mcq[item.scenario_id - 1] = 0;
			tot_trainee[item.scenario_id - 1] = [];
			tot_trainee_mcq[item.scenario_id - 1] = [];
		});

		this.state.dbdata.forEach(item => {
			tot_marks[item.scenario_id - 1] += item.answer_marks;
			tot_trainee[item.scenario_id - 1].push(item.trainee_id);
		});

		this.state.dbdata_mcq.forEach(item_mcq => {
			tot_marks_mcq[item_mcq.scenario_id - 1] += item_mcq.marks_allotted;
			tot_trainee_mcq[item_mcq.scenario_id - 1].push(item_mcq.trainee_id);
		});

		tot_trainee = tot_trainee.map(item => {
			let distcount = item.filter(function (val, i, arr) {
				return arr.indexOf(val) === i;
			}).length;
			return distcount;
		});

		tot_trainee_mcq = tot_trainee_mcq.map(item_mcq => {
			let distcount_for_mcq = item_mcq.filter(function (val, i, arr) {
				return arr.indexOf(val) === i;
			}).length;
			return distcount_for_mcq;
		});

		for (let i = 0; i < tot_marks.length; i++) {
			avg;
			if (tot_trainee[i] > 0) {
				avg = tot_marks[i] / tot_trainee[i];
			} else {
				avg = 0;
			}
			data.push([this.state.scenarios[i].scenario_name, avg]);
		}

		for (let k = 0; k < tot_marks_mcq.length; k++) {
			avg_mcq;
			if (tot_trainee_mcq[k] > 0) {
				avg_mcq = tot_marks_mcq[k] / tot_trainee_mcq[k];
			} else {
				avg_mcq = 0;
			}
			data_mcq.push([this.state.scenarios[k].scenario_name, avg_mcq]);
		}



		let pick_avg_marks = 0;
		for (let l = 0; l < data.length; l++) {
			pick_avg_marks += data[l][1];
		}

		let pick_avg_marks_mcq = 0;
		for (let j = 0; j < data_mcq.length; j++) {
			pick_avg_marks_mcq += data_mcq[j][1];
		}

		let pick_scenario_name = [];
		for (let i = 0; i < data.length; i++) {
			pick_scenario_name.push(data[i][0]);
		}

		avg_final_total = (pick_avg_marks + pick_avg_marks_mcq) / 2;

		for (let i = 0; i < pick_scenario_name.length; i++) {
			if (data[i][1] != 0 || data_mcq[i][1] != 0) {
				final_data.push([this.state.scenarios[i].scenario_name, avg_final_total]);
			}
		}

		this.setState({
			data: data,
			data_mcq: data_mcq,
			final_data: final_data
		});

	}

	__getScenarios() {										//Get Scenarios for sessionid
		Axios.post('http://localhost:3000/getscenarios', {
			sessionid: this.sessions.value
		}).then(response => {
			if (response.data.success) {
				if (response.data.success == 1) {
					this.setState({
						scenarios: response.data.data,
						errorStatus: ''
					});
					this.__structData();
				} else
					this.setState({
						scenarios: [],
						data: [],
						data_mcq: [],
						final_data: [],
						errorStatus: 'No Scenario Found!!'
					});
			} else {
				this.setState({
					scenarios: [],
					data: [],
					data_mcq: [],
					final_data: [],
					errorStatus: 'GetScenarios DB Error!!'
				});
			}
		}).catch(err => {
			this.setState({
				errorStatus: err
			});
		});
	}

	__getReport() {									//Get data for report generation
		if (this.sessions.value != 'default') {
			Axios.post('http://localhost:3000/getreportdata', {
				action: 'trainer-overall',
				sessionid: this.sessions.value
			}).then(response => {
				if (response.data.success) {
					if (response.data.success == 1) {
						this.setState({
							dbdata: response.data.data,
							dbdata_mcq: response.data.data_mcq,
							errorStatus: ''
						});
						this.__getScenarios();
					} else
						this.setState({
							dbdata: [],
							dbdata_mcq: [],
							data: [],
							data_mcq: [],
							final_data: [],
							errorStatus: 'No Data Found!!'
						});
				} else {
					this.setState({
						dbdata: [],
						dbdata_mcq: [],
						data: [],
						data_mcq: [],
						final_data: [],
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
				final_data: [],
				errorStatus: 'Select atleast one session'
			});
		}
	}

	render() {
		return (
			<div className={'right-container'}>
				<div className='div-title'> Reports </div>
				{this.state.errorStatus.length != 0 ?
					<div className='alertBox'>
						<Alert bsStyle="warning">
							<p className='alertMessage'>{this.state.errorStatus}</p>
							<Glyphicon glyph="remove" onClick={this.__handleAlertDismiss.bind(this)}></Glyphicon>
						</Alert>
					</div> : null
				}

				{(this.state.sessions.length != 0) ?								//Get Data to Generate Report onChange on focused Value
			<div className='drop-down-element'>
				<select className='form-control' onChange={this.__getReport.bind(this)} ref={(sessions) => this.sessions = sessions} >
					<option value='default'>Select Session</option>
					{this.state.sessions.map(item => {
						return <option value={item.session_id} key={item.session_id}>{item.session_name}</option>;
					})}
				</select>
			</div> : null
				}

				<Barchart data={this.state.final_data} options={this.state.options} columns={this.state.columns} />

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

import React from 'react';
import { Alert, Glyphicon } from '../../../node_modules/react-bootstrap';

class TotalScore extends React.Component {
	constructor() {
		super();
		this.state = {
			data: [],
			data_mcq: [],
			errorStatus: '',
			key: 0
		};
	}

	componentDidMount() {
		this.setState({
			data: this.props.data,
			data_mcq: this.props.data_mcq
		});
	}

	componentWillReceiveProps(nextState) {
		if ((this.props.data != nextState.data) || (this.props.data_mcq != nextState.data_mcq)){
			this.setState({
				data: nextState.data,
				data_mcq: nextState.data_mcq
			});
		}
	}

	render() {
		if (this.state.data.length != 0 && this.state.data_mcq.length != 0) {
			var quesAns = this.state.data.map(item => {
				return (
					<div className='view-profile' key={this.state.key++}>
						<div id='view-profile-header'>
						</div>
						<div className='score-heading'>
							<p>{item.session_name}</p>
						</div>
						<div className='scores'>
							<span>Score : </span>
							<span>{item.answer_marks}</span>
						</div>
					</div >
				);
			});

			var quesAns_mcq = this.state.data_mcq.map(item_mcq => {
				return (
					<div className='view-profile' key={this.state.key++}>
						<div id='view-profile-header'>
						</div>
						<div className='score-heading'>
							<p>{item_mcq.session_name}</p>
						</div>
						<div className='scores'>
							<span>Score MCQ :  </span>
							<span>{item_mcq.answer_marks_mcq}</span>
						</div>
					</div >
				);
			});

			return (
				<div className='right-container'>
					{this.state.errorStatus.length != 0 ? <div className='alertBox'><Alert bsStyle="warning"><p className='alertMessage'>{this.state.errorStatus}</p><Glyphicon glyph="remove" onClick={this.__handleAlertDismiss.bind(this)}></Glyphicon></Alert></div> : null}
					<div className='view-form'>{quesAns}</div>
					<div className='view-form'>{quesAns_mcq}</div>
				</div>
			);
		} else {
			return null;
		}
	}

	__handleAlertDismiss() {
		if (this.state.errorStatus.length != 0)
			this.setState({
				errorStatus: ''
			});
	}

}

export default TotalScore;

import { Chart } from 'react-google-charts';
import React from 'react';

class Barchart extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			options: {},
			rows: [],
			columns: [],
			chart_type: ''
		};
	}

	componentDidMount() {
		this.setState({
			options: this.props.options,
			rows: this.props.data,
			columns: this.props.columns,
			chart_type: this.props.chart_type
		});
	}

	componentWillReceiveProps(nextState) {							//check and will render updated data
		if (this.props.data != nextState.data || this.props.options != nextState.options || this.props.columns != nextState.columns || this.props.chart_type != nextState.chart_type) {
			this.setState({
				options: nextState.options,
				rows: nextState.data,
				columns: nextState.columns,
				chart_type: nextState.chart_type
			});
		}
	}

	render() {
		return (
			(this.state.rows.length != 0) ?
				<Chart								//Component for generation of BarChart
					chartType="BarChart"
					rows={this.state.rows}
					options={this.state.options}
					columns={this.state.columns}
					graph_id="BarChart"
					width="100%"
					height="400px"
					legend_toggle
				/> : null
		);
	}
}

export default Barchart;

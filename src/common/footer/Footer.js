import React from 'react';

class Footer extends React.Component {
	render() {
		return (				//Footer
			<footer>
				<div>
					<p>Copyright All rights reserved 2017</p>
				</div>
				<div>
					<a href="mailto:sidharthav@cybage.com">Contact<span className="glyphicon glyphicon-envelope"></span></a>
					<a href="mailto:saket@cybage.com">Help<span className="glyphicon glyphicon-alert"></span></a>
				</div>
			</footer>
		);
	}
}
module.exports = Footer;

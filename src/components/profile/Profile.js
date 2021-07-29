import React from 'react';
import pic from '../../assets/images/pic.png';

class Profile extends React.Component {
	render() {
		var profileView = this.props.data;
		let fullName = profileView.full_name,
			name = fullName.split(' ');
		fullName = name[0].substring(0,1).toUpperCase() + name[0].substring(1,name[0].length) +' '+ name[1].substring(0,1).toUpperCase() + name[1].substring(1,name[1].length);
		return (
			<div className='right-container'>
				<div className='view-profile'>
					<div id='view-profile-header'>
						<img src={pic} className="img-circle"></img>
					</div>
					<div className='profile-name'>
						<div className='pName'>{fullName}</div>
						<p className='pRole'>{profileView.role}</p>
					</div>

					<div className='profile-info'>
						<div><p>Employee ID</p>{profileView.emp_id}</div>
						<div><p>Email ID</p>{profileView.email_id}</div>
					</div>
				</div>
			</div>
		);
	}
}
export default Profile;

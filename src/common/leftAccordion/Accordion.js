import React from 'react';
import { NavLink } from 'react-router-dom';
import { Redirect } from 'react-router-dom';

class Accordion extends React.Component {
	constructor() {
		super();
		this.state = {
			data: [],
			is_loggedout: false
		};

		this.__logout = this.__logout.bind(this);
	}

	componentWillMount() {
		this.setState({
			data: this.props.data
		});
	}

	_onToggle(field) {
		var hiddenFlag = document.getElementById(field).style.display;
		document.getElementById(field).style.display = hiddenFlag === 'block' ? 'none' : 'block';
	}
	render() {
		var menuData = this.state.data || [];
		return (
			(this.state.is_loggedout)
				? <Redirect to={'/login'} /> :
				<aside className='left-container'>
					<ul className="accordion">
						{this._getMenus(menuData)}
					</ul>
				</aside>
		);
	}

	_getMenus(menus) {								//Get the Menus
		var menuArr = [];
		menus.forEach((menu, index) => {
			var html = (<li key={index} onClick={this._onToggle.bind(this, menu.key)}>
				<label>{menu.label}<span className="caret"></span></label>
				<ul key={index} className="accordion-child" id={menu.key}>
					{this._getListMenu(menu.data)}
				</ul>
			</li>);
			menuArr.push(html);
		});

		menuArr.push(<li key={'logout'} onClick={this.__logout}><label>Logout</label></li>);
		return menuArr;
	}

	_getListMenu(menusList) {						//Get SubMenus and link to new url
		var menuListArr = [];
		menusList.forEach((label, index) => {
			let url = '/dashboard/';
			url += label.toLowerCase().replace(/ /g, '');
			var html = (<li key={index} ><NavLink to={url} >{label}</NavLink></li>);
			menuListArr.push(html);
		});

		return menuListArr;
	}

	__logout() {									//remove user from localStorage and set loggedOut Key
		localStorage.removeItem('auth_user');
		localStorage.removeItem('user_role');
		this.setState({
			is_loggedout: true
		});
	}

}

export default Accordion;

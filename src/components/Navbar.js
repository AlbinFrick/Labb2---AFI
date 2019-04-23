import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

class Navbar extends Component {
	render() {
		return (
			<nav className="navbar">
				<ul>
					<li>
						<Link to="/createAd">Create a new ad</Link>
					</li>
					<li>
						<Link to="/showAd">Show ads</Link>
					</li>
				</ul>
			</nav>
		);
	}
}

export default Navbar;

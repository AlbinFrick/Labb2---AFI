import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';

import './Navbar.css';

class Navbar extends Component {
	render() {
		return (
			<nav className="navbar">
				<ul>
					<Link
						style={
							this.props.location.pathname == '/showAd'
								? {}
								: {
										border: 'rgba(209, 209, 209) solid 0.2vw',
										padding: '0vw',
										backgroundColor: 'rgba(61, 65, 73)',
										color: 'white'
								  }
						}
						to="/createAd"
					>
						Create
					</Link>
					<Link
						to="/showAd"
						style={
							this.props.location.pathname == '/showAd'
								? {
										border: 'rgba(209, 209, 209) solid 0.2vw',
										padding: '0vw',
										backgroundColor: 'rgba(61, 65, 73)',
										color: 'white'
								  }
								: {}
						}
					>
						Show
					</Link>
				</ul>
			</nav>
		);
	}
}
export default withRouter(Navbar);

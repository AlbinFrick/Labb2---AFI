import React, { Component } from 'react';
import './App.css';
import CreateAd from './components/CreateAd';

localStorage.setItem('SubscriberAPIAddress', 'http://130.239.236.101:8000');
localStorage.setItem('AdvertAPIAddress', 'http://130.239.236.101:5000');

class App extends Component {
	render() {
		return (
			<div className="App">
				<CreateAd />
			</div>
		);
	}
}

export default App;

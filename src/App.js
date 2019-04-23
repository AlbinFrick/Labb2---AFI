import React, { Component } from 'react';
import './App.css';
import CreateAd from './components/CreateAd/CreateAd';
import ShowAds from './components/ShowAds';
import Navbar from './components/Navbar';
import { BrowserRouter, Route } from 'react-router-dom';

localStorage.setItem('SubscriberAPIAddress', 'http://130.239.217.227:3000');
localStorage.setItem('AdvertAPIAddress', 'http://localhost:5000');

class App extends Component {
	render() {
		return (
			<BrowserRouter>
				<div className="App">
					<Navbar />
					<Route path="/createAd" component={CreateAd} />
					<Route path="/showAd" component={ShowAds} />
				</div>
			</BrowserRouter>
		);
	}
}

export default App;

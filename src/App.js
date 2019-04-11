import React, { Component } from 'react';
import './App.css';
import CreateAd from './components/CreateAd';
import Axios from 'axios';

localStorage.setItem('SubscriberAPIAddress', 'http://130.239.217.30:3000');
localStorage.setItem('AdvertAPIAddress', 'http://130.239.239.170:5000');


class App extends Component {

  addToDatabase = (data) => {
    console.log("här skickar vi skit")
    console.log(data)
  }

  render() {
    return (
      <div className="App">
        <CreateAd />
      </div>
    );
  }
}

export default App;
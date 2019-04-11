import React, { Component } from 'react';
import Axios from 'axios';

export class SubscriberInfo extends Component {
    state = {
        subscriber: null,
        subNumber: '',
        mounted: false
    }

    componentDidMount() {
        this.setState({
            mounted: true
        })
    }

    getInfo = () => {
        if (this.state.mounted && this.state.subNumber) {
            const url = localStorage.getItem('SubscriberAPIAddress');
            Axios.get(url + '/api/subscribers/get/' + this.state.subNumber)
                .then(res => {
                    this.setState({
                        subscriber: res.data
                    })
                });
        }
    }

    renderSubNr = () => {
        return (
            <div>
                <form onSubmit={e => (e.preventDefault())}>
                    <label>Subscriber Number</label>
                    <input type="text" value={this.state.subNumber} onChange={this.updateSubNumber} />
                </form>
            </div>
        )
    }

    updateSubNumber = (e) => {
        this.setState({
            subNumber: e.target.value,
        }, () => {
            if (this.state.subNumber && this.state.subNumber.length > 1) {
                this.getInfo()
            }
        })
    }

    renderInfo = () => {
        if (this.state.subscriber) {
            const { firstname, lastname, phonenumber, address, zipcode, city } = this.state.subscriber;
            return (
                <div className="subscriberInfo">
                    <p>{firstname}</p>
                    <p>{lastname}</p>
                    <p>{phonenumber}</p>
                    <p>{address}</p>
                    <p>{zipcode}</p>
                    <p>{city}</p>
                    <button onClick={this.editInfo}>Edit</button>
                </div>
            )
        }
        else if (this.state.subNumber) {
            return (
                <p>No subscriber with that number</p>
            )
        }
    }


    render() {
        return (
            <div>
                {this.renderSubNr()}
                {this.state.subNumber}
                <h1>Subscriber Info</h1>
                {this.renderInfo()}
            </div>
        )
    }
}

export default SubscriberInfo

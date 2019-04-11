import React, { Component } from 'react';
import Axios from 'axios';
import SubscriberInfo from './SubscriberInfo';

export class CreateAd extends Component {
    state = {
        subscriber: '',
        gettingSub: false,
    }

    handleSubChange = (e) => {
        this.setState({
            subscriber: e.target.value
        })
    }

    renderSubScriberInfo = () => {
        if (this.state.subscriber === 'true') {
            return (
                <SubscriberInfo
                    subNumber={this.state.subNumber}
                />
            )
        }
    }

    renderCompanyForm = () => {
        if (this.state.subscriber === 'false') {
            return (
                <div>
                    <h1>Company</h1>
                </div>
            )
        }
    }

    render() {
        return (
            <div>
                <form className="subQuery">
                    <label>Yes</label>
                    <input name="subQuery" type="radio" value={true} onChange={this.handleSubChange} />
                    <label>No</label>
                    <input name="subQuery" type="radio" value={false} onChange={this.handleSubChange} />
                </form>
                {this.renderCompanyForm()}
                {this.renderSubScriberInfo()}
            </div>
        )
    }
}

export default CreateAd
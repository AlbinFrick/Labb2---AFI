import React, { Component } from 'react';
import SubscriberInfo from '../Subscriber/SubscriberInfo';
import CompanyInfo from '../Company/CompanyInfo';
import AdInfo from '../AdInfo/AdInfo';
import './CreateAd.css';

export class CreateAd extends Component {
	state = {
		subscriber: 0,
		gettingSub: false,
		postedBy: null
	};

	changePostedBy = id => {
		this.setState({
			postedBy: id
		});
	};

	handleSubChange = e => {
		this.setState({
			subscriber: e.target.value,
			postedBy: null
		});
	};

	renderSubScriberInfo = () => {
		if (this.state.subscriber === 'true') {
			return <SubscriberInfo changePostedBy={this.changePostedBy} />;
		}
	};

	renderCompanyForm = () => {
		if (this.state.subscriber === 'false') {
			return <CompanyInfo changePostedBy={this.changePostedBy} />;
		}
	};

	renderAdvertForm = () => {
		if (this.state.subscriber !== 0 && this.state.postedBy) {
			return (
				<AdInfo
					subscriber={this.state.subscriber}
					postedBy={this.state.postedBy}
				/>
			);
		}
	};

	render() {
		return (
			<div className="createAd">
				<div className="subCompContainer">
					<h2>Are you a subscriber?</h2>
					<form className="subQuery">
						<label>Yes</label>
						<input
							name="subQuery"
							type="radio"
							value={true}
							onChange={this.handleSubChange}
						/>
						<label>No</label>
						<input
							name="subQuery"
							type="radio"
							value={false}
							onChange={this.handleSubChange}
						/>
					</form>
					{this.renderCompanyForm()}
					{this.renderSubScriberInfo()}
				</div>
				<div className="adContainer">{this.renderAdvertForm()}</div>
			</div>
		);
	}
}

export default CreateAd;

import React, { Component } from 'react';
import SubscriberInfo from './SubscriberInfo';
import CompanyInfo from './CompanyInfo';
import AdInfo from './AdInfo';

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
			return (
				<SubscriberInfo
					subNumber={this.state.subNumber}
					changePostedBy={this.changePostedBy}
				/>
			);
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
			<div>
				<h4>Are you a subscriber?</h4>
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
				{this.renderAdvertForm()}
			</div>
		);
	}
}

export default CreateAd;

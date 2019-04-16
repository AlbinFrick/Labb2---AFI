import React, { Component } from 'react';
import SubscriberInfo from './SubscriberInfo';
import CompanyInfo from './CompanyInfo';
import AdInfo from './AdInfo';

export class CreateAd extends Component {
	state = {
		subscriber: 0,
		gettingSub: false
	};

	handleSubChange = e => {
		this.setState({
			subscriber: e.target.value
		});
	};

	renderSubScriberInfo = () => {
		if (this.state.subscriber === 'true') {
			return <SubscriberInfo subNumber={this.state.subNumber} />;
		}
	};

	renderCompanyForm = () => {
		if (this.state.subscriber === 'false') {
			return <CompanyInfo />;
		}
	};

	renderAdvertForm = () => {
		if (this.state.subscriber !== 0) {
			return <AdInfo />;
		}
	};

	render() {
		return (
			<div>
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

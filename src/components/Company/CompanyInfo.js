import React, { Component } from 'react';
import Axios from 'axios';
import './CompanyInfo.css';
const url = localStorage.getItem('AdvertAPIAddress');

export class CompanyInfo extends Component {
	state = {
		postedBy: null,
		nameErr: '',
		orgNumberErr: '',
		phoneNumberErr: '',
		payAddressErr: '',
		payCityErr: '',
		payZipCodeErr: '',
		delAddressErr: '',
		delCityErr: '',
		delZipCodeErr: ''
	};

	handleTextinput = e => {
		this.setState({
			[e.target.name]: [e.target.value]
		});
	};

	validate = () => {
		let {
			name,
			orgNumber,
			phoneNumber,
			payAddress,
			payCity,
			payZipCode,
			delAddress,
			delCity,
			delZipCode
		} = this.state;
		let nameErr = '';
		let orgNumberErr = '';
		let phoneNumberErr = '';
		let payAddressErr = '';
		let payCityErr = '';
		let payZipCodeErr = '';
		let delAddressErr = '';
		let delCityErr = '';
		let delZipCodeErr = '';

		if (!name || name[0].length < 1) {
			nameErr = 'This field is required';
		}

		if (!orgNumber || orgNumber[0].length < 1) {
			orgNumberErr = 'This field is required';
		}

		if (!phoneNumber || phoneNumber[0].length < 1) {
			phoneNumberErr = 'This field is required';
		}

		if (!payAddress || payAddress[0].length < 1) {
			payAddressErr = 'This field is required';
		}

		if (!payCity || payCity[0].length < 1) {
			payCityErr = 'This field is required';
		}

		if (!payZipCode || payZipCode[0].length < 1) {
			payZipCodeErr = 'This field is required';
		}

		if (!delAddress || delAddress[0].length < 1) {
			delAddressErr = 'This field is required';
		}

		if (!delCity || delCity[0].length < 1) {
			delCityErr = 'This field is required';
		}

		if (!delZipCode || delZipCode[0].length < 1) {
			delZipCodeErr = 'This field is required';
		}

		this.setState({
			nameErr,
			orgNumberErr,
			phoneNumberErr,
			delAddressErr,
			delZipCodeErr,
			delCityErr,
			payAddressErr,
			payZipCodeErr,
			payCityErr
		});
		if (
			nameErr ||
			orgNumberErr ||
			phoneNumberErr ||
			delAddressErr ||
			delZipCodeErr ||
			delCityErr ||
			payAddressErr ||
			payZipCodeErr ||
			payCityErr
		) {
			return false;
		}
		return true;
	};

	handleSubmit = e => {
		e.preventDefault();
		console.log(this.state.name);
		if (this.validate()) {
			const {
				name,
				orgNumber,
				phoneNumber,
				payAddress,
				payCity,
				payZipCode,
				delAddress,
				delCity,
				delZipCode
			} = this.state;
			let company = {
				name: name,
				orgNumber: orgNumber,
				phoneNumber: phoneNumber,
				deliverLocation: {
					address: delAddress,
					city: delCity,
					zipCode: delZipCode
				},
				paymentLocation: {
					address: payAddress,
					city: payCity,
					zipCode: payZipCode
				}
			};

			Axios.post(url + '/api/companies/add', { company })
				.then(res => {
					console.log(res.data.createdCompany._id);
					this.props.changePostedBy(res.data.createdCompany._id);
				})
				.catch(err => {
					console.log(err);
				});
		}
	};

	renderCompanyForm = () => {
		return (
			<div className="companyInfo">
				<form onSubmit={this.handleSubmit}>
					<input
						className="name"
						name="name"
						type="text"
						placeholder="Name"
						onChange={this.handleTextinput}
					/>
					<div className="errorMessage">{this.state.nameErr}</div>
					<br />
					<input
						className="orgNumber"
						name="orgNumber"
						type="number"
						placeholder="Organisation Number"
						onChange={this.handleTextinput}
					/>
					<div className="errorMessage">
						{this.state.orgNumberErr}
					</div>
					<br />
					<input
						className="phoneNumber"
						name="phoneNumber"
						type="number"
						placeholder="Phone Number"
						onChange={this.handleTextinput}
					/>
					<div className="errorMessage">
						{this.state.phoneNumberErr}
					</div>
					<br />
					<label className="payLabel">Payment location</label>
					<input
						className="payAddress"
						name="payAddress"
						type="text"
						placeholder="Address"
						onChange={this.handleTextinput}
					/>
					<div className="errorMessage">
						{this.state.payAddressErr}
					</div>
					<br />
					<input
						className="payZipCode"
						name="payZipCode"
						type="number"
						placeholder="Zipcode"
						onChange={this.handleTextinput}
					/>
					<div className="errorMessage">
						{this.state.payZipCodeErr}
					</div>
					<br />
					<input
						className="payCity"
						name="payCity"
						type="text"
						placeholder="City"
						onChange={this.handleTextinput}
					/>
					<div className="errorMessage">{this.state.payCityErr}</div>
					<br />
					<label className="delLabel">Delivery location</label>
					<input
						className="delAddress"
						name="delAddress"
						type="text"
						placeholder="Address"
						onChange={this.handleTextinput}
					/>
					<div className="errorMessage">
						{this.state.delAddressErr}
					</div>
					<br />
					<input
						className="delZipCode"
						name="delZipCode"
						type="number"
						placeholder="Zipcode"
						onChange={this.handleTextinput}
					/>
					<div className="errorMessage">
						{this.state.delZipCodeErr}
					</div>
					<br />
					<input
						className="delCity"
						name="delCity"
						type="text"
						placeholder="City"
						onChange={this.handleTextinput}
					/>
					<div className="errorMessage">{this.state.delCityErr}</div>
					<br />
					<button type="submit">OK</button>
				</form>
			</div>
		);
	};
	render() {
		return (
			<div>
				<h1>Fill in your company information</h1>
				{this.renderCompanyForm()}
				{this.state.name}
				{this.state.orgNumber}
			</div>
		);
	}
}

export default CompanyInfo;

import React, { Component } from 'react';
import Axios from 'axios';
const url = localStorage.getItem('AdvertAPIAddress');

export class CompanyInfo extends Component {
	state = {
		companies: null
	};

	componentDidMount() {
		Axios.get(url + '/api/companies/get').then(res => {
			this.setState({
				companies: res.data
			});
		});
	}

	handleTextinput = e => {
		this.setState({
			[e.target.name]: [e.target.value]
		});
	};

	handleSubmit = e => {
		e.preventDefault();
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
		let company = Object.assign({}, this.state.companies[0]);
		company.name = name;
		company.orgNumber = orgNumber;
		company.phoneNumber = phoneNumber;
		company.paymentLocation.address = payAddress;
		company.paymentLocation.city = payCity;
		company.paymentLocation.zipCode = payZipCode;
		company.deliverLocation.address = delAddress;
		company.deliverLocation.city = delCity;
		company.deliverLocation.zipCode = delZipCode;
		let companies = [...this.state.companies, company];
		this.setState({ companies });

		Axios.post(url + '/api/companies/add', { company })
			.then(res => {
				console.log(res);
			})
			.catch(err => {
				console.log(err);
			});
	};

	renderCompanyForm = () => {
		return (
			<div className="subscriberInfo">
				<form onSubmit={this.handleSubmit}>
					<input
						name="name"
						type="text"
						placeholder="Name"
						onChange={this.handleTextinput}
					/>
					<br />
					<input
						name="orgNumber"
						type="number"
						placeholder="Organisation Number"
						onChange={this.handleTextinput}
					/>
					<br />
					<input
						name="phoneNumber"
						type="number"
						placeholder="Phone Number"
						onChange={this.handleTextinput}
					/>
					<label>Payment location</label>
					<input
						name="payAddress"
						type="text"
						placeholder="Address"
						onChange={this.handleTextinput}
					/>
					<br />
					<input
						name="payZipCode"
						type="number"
						placeholder="Zipcode"
						onChange={this.handleTextinput}
					/>
					<br />
					<input
						name="payCity"
						type="text"
						placeholder="City"
						onChange={this.handleTextinput}
					/>
					<br />
					<label>Delivery location</label>
					<input
						name="delAddress"
						type="text"
						placeholder="Address"
						onChange={this.handleTextinput}
					/>
					<br />
					<input
						name="delZipCode"
						type="number"
						placeholder="Zipcode"
						onChange={this.handleTextinput}
					/>
					<br />
					<input
						name="delCity"
						type="text"
						placeholder="City"
						onChange={this.handleTextinput}
					/>
					<br />
					<button type="submit">Submit</button>
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
//kom på att vi inte behöver visa companies....
// Denna finns här vi vill lägga till det sen.
/* renderInfo = () => {
    if (this.state.companies && !this.state.edit) {
        const { name, orgNumber, phoneNumber, } = this.state.companies[0];
        return (
            <div className="subscriberInfo">
                <p>{name}</p>
                <p>{orgNumber}</p>
                <p>{phoneNumber}</p>
                <button onClick={this.handleEdit}>Edit</button>
            </div>
        )
    }
    else if (this.state.subNumber) {
        return (
            <p>No subscriber with that number</p>
        )
    }
} */
export default CompanyInfo;

import React, { Component } from 'react';
import Axios from 'axios';
import './SubscriberInfo.css';
const url = localStorage.getItem('SubscriberAPIAddress');

export class SubscriberInfo extends Component {
	state = {
		subNumber: '',
		mounted: false,
		edit: false,
		firstname: '',
		lastname: '',
		phonenumber: '',
		address: '',
		zipcode: '',
		city: '',
		firstnameErr: '',
		lastnameErr: '',
		phonenumberErr: '',
		addressErr: '',
		zipcodeErr: '',
		cityErr: ''
	};

	componentDidMount() {
		this.setState({
			mounted: true
		});
	}

	getInfo = () => {
		if (this.state.mounted && this.state.subNumber) {
			Axios.get(
				url + '/api/subscribers/get/' + this.state.subNumber
			).then(res => {
				if (res.data) {
					this.setState({
						id: res.data._id,
						firstname: res.data.firstname,
						lastname: res.data.lastname,
						phonenumber: res.data.phonenumber,
						address: res.data.address,
						zipcode: res.data.zipcode + '',
						city: res.data.city
					});
					this.props.changePostedBy(res.data._id);
				}
			});
		}
	};

	renderSubNr = () => {
		return (
			<div className="subNumberContainer">
				<form onSubmit={e => e.preventDefault()}>
					<label>Subscriber Number</label>
					<input
						type="number"
						value={this.state.subNumber}
						onChange={this.updateSubNumber}
					/>
				</form>
			</div>
		);
	};

	updateSubNumber = e => {
		this.setState(
			{
				subNumber: e.target.value
			},
			() => {
				if (this.state.subNumber && this.state.subNumber.length > 1) {
					this.getInfo();
				} else if (this.state.subNumber.length < 1) {
					this.props.changePostedBy(null);
					this.setState({
						firstname: '',
						lastname: '',
						phonenumber: '',
						address: '',
						zipcode: '',
						city: ''
					});
				}
			}
		);
	};

	handleTextinput = e => {
		this.setState({
			[e.target.name]: [e.target.value]
		});
	};

	validate = () => {
		let {
			firstname,
			lastname,
			phonenumber,
			address,
			zipcode,
			city
		} = this.state;

		let firstnameErr = '';
		let lastnameErr = '';
		let phonenumberErr = '';
		let addressErr = '';
		let zipcodeErr = '';
		let cityErr = '';

		if (firstname.toString().length < 1) {
			firstnameErr = 'This field is required';
		}

		if (lastname.toString().length < 1) {
			lastnameErr = 'This field is required';
		}

		if (phonenumber.toString().length < 1) {
			phonenumberErr = 'This field is required';
		}

		if (address.toString().length < 1) {
			addressErr = 'This field is required';
		}

		if (city.toString().length < 1) {
			cityErr = 'This field is required';
		}

		if (zipcode.toString().length < 1) {
			zipcodeErr = 'This field is required';
		} else if (zipcode.toString().length < 5) {
			zipcodeErr = 'The zipcode must be five numbers';
		}
		if (isNaN(zipcode[0])) {
			zipcodeErr = 'The zipcode can only contain numbers';
		}
		this.setState({
			firstnameErr,
			lastnameErr,
			phonenumberErr,
			addressErr,
			zipcodeErr,
			cityErr
		});
		if (
			firstnameErr ||
			lastnameErr ||
			phonenumberErr ||
			addressErr ||
			zipcodeErr ||
			cityErr
		) {
			return false;
		}
		return true;
	};

	handleSubmit = e => {
		e.preventDefault();
		const {
			id,
			firstname,
			lastname,
			phonenumber,
			address,
			zipcode,
			city
		} = this.state;
		if (this.validate()) {
			Axios.put(url + '/api/subscribers/update', {
				id,
				firstname,
				lastname,
				phonenumber,
				address,
				zipcode,
				city
			}).then(res => {
				console.log(res);
			});
			this.setState({
				edit: !this.state.edit
			});
		}
	};

	renderEdit = () => {
		if (this.state.edit) {
			const {
				firstname,
				lastname,
				phonenumber,
				address,
				zipcode,
				city
			} = this.state;
			return (
				<div className="subscriberInfo">
					<form onSubmit={this.handleSubmit}>
						<input
							className="firstname"
							name="firstname"
							type="text"
							value={firstname}
							onChange={this.handleTextinput}
						/>
						<div id="firstnameerr" className="errormessage">
							{this.state.firstnameErr}
						</div>
						<input
							className="lastname"
							name="lastname"
							type="text"
							value={lastname}
							onChange={this.handleTextinput}
						/>
						<div id="lastnameerr" className="errormessage">
							{this.state.lastnameErr}
						</div>
						<input
							className="phonenumber"
							name="phonenumber"
							type="number"
							value={phonenumber}
							onChange={this.handleTextinput}
						/>
						<div id="phonenumbererr" className="errormessage">
							{this.state.phonenumberErr}
						</div>
						<input
							className="address"
							name="address"
							type="text"
							value={address}
							onChange={this.handleTextinput}
						/>
						<div id="addresserr" className="errormessage">
							{this.state.addressErr}
						</div>
						<input
							className="zipcode"
							name="zipcode"
							type="text"
							value={zipcode}
							onChange={this.handleTextinput}
						/>
						<div id="zipcodeerr" className="errormessage">
							{this.state.zipcodeErr}
						</div>
						<input
							className="city"
							name="city"
							type="text"
							value={city}
							onChange={this.handleTextinput}
						/>
						<div id="cityerr" className="errormessage">
							{this.state.cityErr}
						</div>
						<button type="submit">Submit</button>
					</form>
				</div>
			);
		}
	};

	handleEdit = () => {
		this.setState({
			edit: !this.state.edit
		});
	};

	renderInfo = () => {
		if (
			this.state.subNumber &&
			(this.state.firstname || this.state.lastname) &&
			!this.state.edit
		) {
			const {
				firstname,
				lastname,
				phonenumber,
				address,
				zipcode,
				city
			} = this.state;
			return (
				<div className="subscriberInfo">
					<div className="names">
						<p>Name: </p>
						<p>Phone number: </p>
						<p>Address: </p>
						<p>Zip code: </p>
						<p>City: </p>
					</div>
					<div className="attributes">
						<p>
							{firstname} {lastname}
						</p>
						<p>{phonenumber}</p>
						<p>{address}</p>
						<p>{zipcode}</p>
						<p>{city}</p>
					</div>
					<button onClick={this.handleEdit}>Edit</button>
				</div>
			);
		} else if (this.state.subNumber && !this.state.edit) {
			return <p>No subscriber with that number</p>;
		}
	};

	render() {
		return (
			<div>
				{this.renderSubNr()}
				{this.renderInfo()}
				{this.renderEdit()}
			</div>
		);
	}
}

export default SubscriberInfo;

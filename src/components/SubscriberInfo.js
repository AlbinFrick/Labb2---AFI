import React, { Component } from 'react';
import Axios from 'axios';
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
		city: ''
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
						zipcode: res.data.zipcode,
						city: res.data.city
					});
					this.props.changePostedBy(res.data._id);
				}
			});
		}
	};

	renderSubNr = () => {
		return (
			<div>
				<form onSubmit={e => e.preventDefault()}>
					<label>Subscriber Number</label>
					<input
						type="text"
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
				}
			}
		);
	};

	handleTextinput = e => {
		console.log(this.state);
		this.setState({
			[e.target.name]: [e.target.value]
		});
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
							name="firstname"
							type="text"
							value={firstname}
							onChange={this.handleTextinput}
						/>{' '}
						<br />
						<input
							name="lastname"
							type="text"
							value={lastname}
							onChange={this.handleTextinput}
						/>
						<br />
						<input
							name="phonenumber"
							type="text"
							value={phonenumber}
							onChange={this.handleTextinput}
						/>
						<br />
						<input
							name="address"
							type="text"
							value={address}
							onChange={this.handleTextinput}
						/>
						<br />
						<input
							name="zipcode"
							type="text"
							value={zipcode}
							onChange={this.handleTextinput}
						/>
						<br />
						<input
							name="city"
							type="text"
							value={city}
							onChange={this.handleTextinput}
						/>
						<br />
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
		if (this.state.firstname && !this.state.edit) {
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
					<p>{firstname}</p>
					<p>{lastname}</p>
					<p>{phonenumber}</p>
					<p>{address}</p>
					<p>{zipcode}</p>
					<p>{city}</p>
					<button onClick={this.handleEdit}>Edit</button>
				</div>
			);
		} else if (this.state.subNumber) {
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

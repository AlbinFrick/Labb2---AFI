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
		zipcodeErr: ''
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
						firstname: ''
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
		let { zipcode } = this.state;
		let zipcodeErr = '';
		if (zipcode[0].length < 4) {
			zipcodeErr = 'The zipcode must be five numbers';
		}
		if (isNaN(zipcode[0])) {
			zipcodeErr = 'The zipcode can only contain numbers';
		}
		this.setState({ zipcodeErr });
		if (zipcodeErr) {
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
						/>{' '}
						<br />
						<input
							className="lastname"
							name="lastname"
							type="text"
							value={lastname}
							onChange={this.handleTextinput}
						/>
						<br />
						<input
							className="phonenumber"
							name="phonenumber"
							type="number"
							value={phonenumber}
							onChange={this.handleTextinput}
						/>
						<br />
						<input
							className="address"
							name="address"
							type="text"
							value={address}
							onChange={this.handleTextinput}
						/>
						<br />
						<input
							className="zipcode"
							name="zipcode"
							type="text"
							value={zipcode}
							onChange={this.handleTextinput}
						/>
						{this.state.zipcodeErr}
						<br />
						<input
							className="city"
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
		if (this.state.subNumber && this.state.firstname && !this.state.edit) {
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

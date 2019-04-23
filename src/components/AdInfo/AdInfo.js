import React, { Component } from 'react';
import Axios from 'axios';
import './AdInfo.css';
import { Redirect } from 'react-router-dom';
const url = localStorage.getItem('AdvertAPIAddress');

export class AdInfo extends Component {
	state = {
		redirect: false,
		title: '',
		content: '',
		adPrice: null,
		price: null,
		postedBy: '',
		subscriber: '',
		mounted: '',
		titleErr: ''
	};

	handleTextinput = e => {
		this.setState({
			[e.target.name]: [e.target.value]
		});
	};

	validate = () => {
		let { title, content, price } = this.state;
		let titleErr = '';
		let contentErr = '';
		let priceErr = '';
		if (!title) {
			titleErr = 'This field is required';
		} else if (title[0].length > 25) {
			titleErr = 'The title must be under 25 chracters';
		}

		if (!content) {
			contentErr = 'This area is required';
		}
		if (!price) {
			priceErr = 'This field is required';
		}
		this.setState({ titleErr, priceErr, contentErr });
		if (titleErr || priceErr || contentErr) {
			return false;
		}
		return true;
	};

	handleSubmit = e => {
		e.preventDefault();
		if (this.validate()) {
			const { title, content, price } = this.state;
			const { postedBy, subscriber } = this.props;
			let adPrice = 0;
			if (subscriber === 'false') {
				adPrice = 40;
			}
			Axios.post(url + '/api/adverts/add', {
				title,
				content,
				adPrice,
				price,
				postedBy,
				subscriber
			})
				.then(res => {
					console.log('New advert created');
					this.setState({ redirect: true });
				})
				.catch(err => {
					console.log(err);
				});
		}
	};

	setRedirect = () => {
		this.setState({
			redirect: true
		});
	};

	renderRedirect = () => {
		if (this.state.redirect) {
			return <Redirect to="/showAd" />;
		}
	};

	render() {
		return (
			<div className="adInfo">
				{this.renderRedirect()}
				<h2>Advert Information</h2>
				<form onSubmit={this.handleSubmit}>
					<input
						name="title"
						className="title"
						type="text"
						placeholder="Title"
						onChange={this.handleTextinput}
					/>
					<div id="titleErr" className="errormessage">
						{this.state.titleErr}
					</div>
					<input
						name="price"
						className="price"
						type="number"
						placeholder="Price for your product"
						onChange={this.handleTextinput}
					/>
					<div id="priceErr" className="errormessage">
						{this.state.priceErr}
					</div>
					<br />
					<textarea
						name="content"
						className="content"
						type="textare"
						placeholder="Content"
						onChange={this.handleTextinput}
					/>
					<div id="contentErr" className="errormessage">
						{this.state.contentErr}
					</div>
					<br />

					<button type="submit">Submit</button>
				</form>
			</div>
		);
	}
}

export default AdInfo;

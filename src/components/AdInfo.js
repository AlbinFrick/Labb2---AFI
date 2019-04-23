import React, { Component } from 'react';
import Axios from 'axios';
const url = localStorage.getItem('AdvertAPIAddress');

export class AdInfo extends Component {
	state = {
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
			contentErr = 'This field is required';
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
				})
				.catch(err => {
					console.log(err);
				});
		}
	};

	render() {
		return (
			<div>
				<h1>Advert Information</h1>
				<form onSubmit={this.handleSubmit}>
					<input
						name="title"
						type="text"
						placeholder="Title"
						onChange={this.handleTextinput}
					/>
					{this.state.titleErr}
					<br />
					<input
						name="content"
						type="text"
						placeholder="Content"
						onChange={this.handleTextinput}
					/>
					{this.state.contentErr}
					<br />
					<input
						name="price"
						type="number"
						placeholder="Price for your product"
						onChange={this.handleTextinput}
					/>
					{this.state.priceErr}
					<button type="submit">Submit</button>
				</form>
			</div>
		);
	}
}

export default AdInfo;

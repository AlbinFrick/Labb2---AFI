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
		mounted: ''
	};

	handleTextinput = e => {
		this.setState({
			[e.target.name]: [e.target.value]
		});
	};

	handleSubmit = e => {
		e.preventDefault();
		console.log('hellko');
		const { title, content, adPrice, price } = this.state;
		const { postedBy, subscriber } = this.props;
		Axios.post(url + '/api/adverts/add', {
			title,
			content,
			adPrice,
			price,
			postedBy,
			subscriber
		})
			.then(res => {
				console.log(res);
			})
			.catch(err => {
				console.log(err);
			});
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
					<br />
					<input
						name="content"
						type="text"
						placeholder="Content"
						onChange={this.handleTextinput}
					/>
					<br />
					<input
						name="price"
						type="number"
						placeholder="price"
						onChange={this.handleTextinput}
					/>
					<br />
					<input
						name="adPrice"
						type="number"
						placeholder="Price for your product"
						onChange={this.handleTextinput}
					/>
					<button type="submit">Submit</button>
				</form>
				<p>{this.state.subscriber}</p>
				<p>{this.state.postedBy}</p>
			</div>
		);
	}
}

export default AdInfo;

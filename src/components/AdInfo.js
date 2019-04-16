import React, { Component } from 'react';
import Axios from 'axios';
const url = localStorage.getItem('AdvertAPIAddress');

export class AdInfo extends Component {
	state = {
		adverts: null
	};

	componentDidMount() {
		Axios.get(url + '/api/adverts/get').then(res => {
			console.log(res.data);
			this.setState({
				adverts: res.data
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
			title,
			content,
			adPrice,
			price,
			postedBy,
			subscriber
		} = this.state;
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
						type="text"
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
					<br />
					<input
						name="postedBy"
						type="text"
						placeholder="postedBy"
						onChange={this.handleTextinput}
					/>

					<button type="submit">Submit</button>
				</form>
			</div>
		);
	}
}

export default AdInfo;

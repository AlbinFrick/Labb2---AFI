import React, { Component } from 'react';

export class ShowAds extends Component {
	state = {
		ads: []
	};

	async componentDidMount() {
		const url = 'http://130.239.237.126:5000/api/adverts/get';
		const response = await fetch(url);
		const data = await response.json();
		this.setState({ ads: data });
		console.log(this.state.ads);
	}

	getPoster(subscriber, poster) {
		if (subscriber) {
			return;
		} else {
		}
	}

	render() {
		if (this.state.loading) {
			return <div>loading......</div>;
		}
		if (!this.state.ads || !this.state.ads.length) {
			return <div>No ads found.</div>;
		} else {
			return (
				<div>
					<br />
					{this.state.ads.map(ad => (
						<div>
							<div>{ad.title}</div>
							<div>{ad.price}</div>
							<div>{ad.content}</div>
							<br />
						</div>
					))}
				</div>
			);
		}
	}
}

export default ShowAds;

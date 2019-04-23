import React, { Component } from 'react';
import './ShowAds.css';

export class ShowAds extends Component {
	state = {
		ads: [],
		subscribers: [],
		companies: []
	};

	async componentDidMount() {
		await this.getAds();
		await this.getSubscibers();
		await this.getCompanies();

		console.log(this.state);
	}

	async getAds() {
		const url = 'http://130.239.237.126:5000/api/adverts/get';
		const response = await fetch(url);
		const data = await response.json();
		this.setState({ ads: data });
	}

	async getSubscibers() {
		const url = 'http://localhost:3000/api/subscribers/get';
		const response = await fetch(url);
		const data = await response.json();
		this.setState({ subscribers: data });
	}

	async getCompanies() {
		const url = 'http://130.239.237.126:5000/api/companies/get';
		const response = await fetch(url);
		const data = await response.json();
		this.setState({ companies: data });
	}

	getPoster(sub, poster) {
		let firstname;
		if (sub) {
			this.state.subscribers.forEach(subscriber => {
				if (subscriber._id === poster) {
					firstname = subscriber.firstname;
					firstname += ' ' + subscriber.lastname;
				}
			});
		} else {
			this.state.companies.forEach(company => {
				if (company._id === poster) {
					firstname = company.name;
				}
			});
		}
		return firstname ? firstname : 'No user found';
	}

	render() {
		if (!this.state.ads || !this.state.ads.length) {
			return <div>No ads found.</div>;
		} else if (!this.state.subscribers || !this.state.companies) {
			return <div>No ads found.</div>;
		} else {
			return (
				<div>
					<br />
					{this.state.ads.map(ad => (
						<div key={ad._id} className="adCard">
							<h3>{ad.title}</h3>
							<div>${ad.price}</div>
							<hr />
							<div>{ad.content}</div>
							<hr />
							<div class="postedBy">
								Posted by: <br />
								{this.getPoster(ad.subscriber, ad.postedBy)}
							</div>
							<br />
							<br />
							<br />
						</div>
					))}
				</div>
			);
		}
	}
}

export default ShowAds;

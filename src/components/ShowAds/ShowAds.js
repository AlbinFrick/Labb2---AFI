import React, { Component } from 'react';
import './ShowAds.css';
import { timeout } from 'q';

export class ShowAds extends Component {
	state = {
		ads: [],
		subscribers: [],
		companies: [],
		loading: true
	};

	async componentDidMount() {
		await this.getAds();
		await this.getSubscibers();
		await this.getCompanies();
		this.setState({
			loading: false
		});
	}

	async getAds() {
		const url = localStorage.getItem('AdvertsAPI') + '/api/adverts/get';
		const response = await fetch(url);
		const data = await response.json();
		this.setState({ ads: data });
	}

	async getSubscibers() {
		const url = localStorage.getItem('SubscribersAPI') + '/api/subscribers/get';
		const response = await fetch(url);
		const data = await response.json();
		this.setState({ subscribers: data });
	}

	async getCompanies() {
		const url = localStorage.getItem('AdvertsAPI') + '/api/companies/get';
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
		if (this.state.loading) {
			return <div className="loading" />;
		} else if (!this.state.ads || !this.state.ads.length) {
			return <div>No ads found.</div>;
		} else {
			return (
				<div className="ads">
					{this.state.ads.map(ad => (
						<div key={ad._id} className="adCard">
							<h3>{ad.title}</h3>
							<div>${ad.price}</div>
							<hr />
							<div>{ad.content}</div>
							<hr />
							<div className="postedBy">
								{this.getPoster(ad.subscriber, ad.postedBy)}
								<div
									className="poster"
									style={ad.subscriber ? subStyle : compStyle}
								>
									{ad.subscriber ? 'Subscriber' : 'Company'}
								</div>
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

//style={ad.subscriber ? subStyle : compStyle}

var subStyle = {
	color: 'yellow'
};

var compStyle = {
	color: 'white'
};

export default ShowAds;

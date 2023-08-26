import React from 'react'
import { Helmet } from 'react-helmet'
import { UserPanel } from './components'
import "./profile.css"

class Profile extends React.Component {
	title = "InCase - ";

	constructor(props) {
			super(props);
			this.title = this.title + props.title;
	}

	render() {
			return (
					<div className='profile'>
							<Helmet>
									<title>{this.title}</title>
							</Helmet>
							<div className="container">
									<UserPanel/>
							</div>
					</div>
			);
	}
}

export default Profile;
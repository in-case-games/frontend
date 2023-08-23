import React from 'react'
import { Helmet } from 'react-helmet'
import { ItemRoulette } from '../../components'
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
					 <div className="main">
							<Helmet>
									<title>{this.title}</title>
							</Helmet>
							<ItemRoulette/>
							<div className="container">
									<div className='profile'>
											<UserPanel/>
									</div>
							</div>
					 </div>
			);
	}
}

export default Profile;
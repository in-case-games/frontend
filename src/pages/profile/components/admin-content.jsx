import React from 'react'
import { AccountOrange, Banner, BoxOrange, Gun } from '../../../assets/images/icon'
import SquarePanel from '../../../components/сommon/button/square-panel'

const AdminContent = (props) => {
	return (
		<div className='admin-content'>
			<SquarePanel
				img={Gun}
				click={() => props.exchange("admin-item")}
			/>
			<SquarePanel
				img={BoxOrange}
				click={() => props.exchange("admin-box")}
			/>
			<SquarePanel
				img={AccountOrange}
				click={() => props.exchange("admin-account")}
			/>
			<SquarePanel
				img={Banner}
				click={() => props.exchange("admin-banner")}
			/>
		</div>
	)
}

export default AdminContent
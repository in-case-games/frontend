import React from 'react'
import AdminBoxContent from './admin-box-content'
import AdminContent from './admin-content'
import AdminItemContent from './admin-item-content'
import BoxContent from './box-content'
import InventoryContent from "./inventory-content"
import PaymentContent from './payment-content'
import ProfileContent from './profile-content'
import WithdrawnContent from './withdrawn-content'

const PanelContent = (props) => {
	return (
		<div className='panel-content'>
			{
				props.active === "profile" ?
					<ProfileContent /> :
					null
			}
			{
				props.active === "inventory" ?
					<InventoryContent /> :
					null
			}
			{
				props.active === "box" ?
					<BoxContent /> :
					null
			}
			{
				props.active === "payment" ?
					<PaymentContent /> :
					null
			}
			{
				props.active === "withdrawn" ?
					<WithdrawnContent /> :
					null
			}
			{
				props.active === "admin" ?
					<AdminContent exchange={props.exchange} /> :
					null
			}
			{
				props.active === "admin-item" ?
					<AdminItemContent exchange={props.exchange} /> :
					null
			}
			{
				props.active === "admin-box" ?
					<AdminBoxContent exchange={props.exchange} /> :
					null
			}
		</div>
	)
}

export default PanelContent
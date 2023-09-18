import React from 'react'
import BoxContent from './box-content'
import InventoryContent from "./inventory-content"
import PaymentContent from './payment-content'
import ProfileContent from './profile-content'

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
		</div>
	)
}

export default PanelContent
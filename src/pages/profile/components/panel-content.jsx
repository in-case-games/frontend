import React from 'react'
import InventoryContent from "./inventory-content"
import ProfileContent from './profile-content'

const PanelContent = (props) => {
		return(
				<div className='panel-content'>
						{
							props.active === "profile" ? 
							<ProfileContent/> :
							null
						}
						{
							props.active === "inventory" ? 
							<InventoryContent/> : 
							null
						}
				</div>
		);
};

export default PanelContent;
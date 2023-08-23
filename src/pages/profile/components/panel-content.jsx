import React from 'react'
import InventoryContent from "./inventory"

const PanelContent = (props) => {
		return(
				<div className='panel-content'>
						{
								props.active === "inventory" ? 
								<InventoryContent/> : 
								null
						}
				</div>
		);
};

export default PanelContent;
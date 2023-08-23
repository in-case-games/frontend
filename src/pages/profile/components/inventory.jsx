import React, { useState } from 'react'
import Inventory from '../../../components/inventory/inventory'

const InventoryContent = () => {
		const [selectItems, setSelectItems] = useState([]);
		
		return(
				<div className='panel-content'>
						<div className="inventory-header">
								<div className="inventory-title">
										<div className="inventory-name">Мои предметы: </div>
										<div className="inventory-filter"></div>
								</div>
								<div className="inventory-delimiter"></div>
						</div>
						<Inventory 
						selectItems={selectItems} 
						setSelectItems={(items) => setSelectItems(items)}/>
				</div>
		);
};

export default InventoryContent;
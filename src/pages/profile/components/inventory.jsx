import React, { useState } from 'react'
import { Inventory } from '../../../components/inventory'
import { Filter, Sell, Withdraw } from "../../../components/сommon/button"

const InventoryContent = () => {
		const [selectItems, setSelectItems] = useState({0: "", items: []});
		const [filter, setFilter] = useState("simple");
		const types = {
			"simple": "без фильтра",
			"price-top": "возрастание цены",
			"price-bot": "убывание цены",
			"name-top": "возрастание названия",
			"name-bot": "убывание названия",
			"date-top": "возрастание даты",
			"date-bot": "убывание даты",
		};
		
		return(
				<div className='inventory-content'>
						<div className="inventory-header">
								<div className="inventory-tittle">
										<div className='inventory-group'>
										    <div className="inventory-name">Мои предметы: </div>
												<Filter filter={filter} setFilter={setFilter} types={types}/>
										</div>
										<div className='inventory-group'>
												<Withdraw 
													text={selectItems.items.length === 0 ? "Вывести всё" : "Вывести"}
												/>
												<Sell 
													text={selectItems.items.length === 0 ? "Продать всё" : "Продать"}
												/>
										</div>
								</div>
								<div className="inventory-delimiter"></div>
						</div>
						<Inventory 
							selectItems={selectItems} 
							setSelectItems={setSelectItems}
							filter={filter}
						/>
				</div>
		);
};

export default InventoryContent;
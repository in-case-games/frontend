import React, { useState } from 'react'
import { Inventory } from '../../../components/inventory'
import { Filter, Loading, Sell, Withdraw } from "../../../components/сommon/button"

const InventoryContent = () => {
		const [filter, setFilter] = useState("simple");
		const [isLoading, setIsLoading] = useState(true);
		const [selectItems, setSelectItems] = useState({0: "", items: []});
		const [selectItem, setSelectItem] = useState(null);
		const [withdrawActive, setWithdrawActive] = useState(false);
		const [sellActive, setSellActive] = useState(false);
		const [exchangeActive, setExchangeActive] = useState(false);

		const active = {
				"sell": () => setSellActive(true),
				"withdraw": () => setWithdrawActive(true),
				"exchange": () => setExchangeActive(true),
				"close": () => { 
						setSellActive(false);
						setWithdrawActive(false); 
						setExchangeActive(false);
						setSelectItem(null);
				}
		}

		const listActive = {
				"withdraw": () => withdrawActive,
				"sell": () => sellActive,
				"exchange": () => exchangeActive
		}

		const isActive = (name) => listActive[name]();

		const exchangeModal = (modal) => {
				setWithdrawActive(false);
				setSellActive(false);
				setExchangeActive(false);

				active[modal]();
		};

		const types = {
			"simple": "без фильтра",
			"price-top": "возрастание цены",
			"price-bot": "убывание цены",
			"date-top": "возрастание даты",
			"date-bot": "убывание даты",
			"selected": "выбранные"
		};
		
		return(
				<div className='inventory-content'>
						<div className="profile-header">
								<div className="profile-tittle">
										<div className='profile-group'>
												<Loading isLoading={isLoading} click={() => setIsLoading(true)}/>
										    <div className="profile-name">Мои предметы: </div>
												<Filter filter={filter} setFilter={setFilter} types={types}/>
										</div>
										<div className='profile-group'>
												<Withdraw 
													text={selectItems.items.length === 0 ? "Вывести всё" : "Вывести"}
													click={() => exchangeModal("withdraw")}
												/>
												<Sell 
													text={selectItems.items.length === 0 ? "Продать всё" : "Продать"}
													click={() => exchangeModal("sell")}
												/>
										</div>
								</div>
								<div className="profile-delimiter"></div>
						</div>
						<Inventory 
							selectItems={selectItems} 
							setSelectItems={setSelectItems}
							selectItem={selectItem}
							setSelectItem={setSelectItem}
							isLoading={isLoading}
							setIsLoading={setIsLoading}
							filter={filter}
							isActiveModal={isActive}
							exchangeModal={exchangeModal}
						/>
				</div>
		);
};

export default InventoryContent;
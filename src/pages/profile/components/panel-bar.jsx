import React from 'react'
import {
	ProfileBar as BarButton,
	ProfileHeaderBar as HeaderBarButton
} from "../../../components/сommon/button"

const PanelBar = (props) => {
		return(
				<div className='panel-bar'>
						<div className='user-bar'>
								<HeaderBarButton 
								click={() => props.exchange("profile")} 
								active={props.active === "profile"}/>
								<BarButton 
								text="Инвентарь" 
								click={() => props.exchange("inventory")} 
								active={props.active === "inventory"}/>
								<BarButton 
								text="Открытые кейсы" 
								click={() => props.exchange("box")}
								active={props.active === "box"}/>
								<BarButton 
								text="Пополнения" 
								click={() => props.exchange("payment")}
								active={props.active === "payment"}/>
								<BarButton 
								text="Выводы" 
								click={() => props.exchange("withdrawn")}
								active={props.active === "withdrawn"}/>
								<BarButton 
								text="Промокоды" 
								click={() => props.exchange("promo-code")}
								active={props.active === "promo-code"}/>
								<BarButton text="Выйти"/>
						</div>
				</div>
		);
};

export default PanelBar;
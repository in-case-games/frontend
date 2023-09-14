import React, { useEffect, useState } from 'react'
import { UserLogo } from '../../assets/images/additional'
import { BookUser, CrossBlack, Download, Email, Pen } from '../../assets/images/icon'
import TokenService from "../../services/token"
import { MiniRetractable } from '../сommon/button'
import InputData from './components/input-data'
import classes from "./profile-setting.module.css"

const ProfileSetting = (props) => {
		const [user, setUser] = useState(TokenService.getUser());

		useEffect(() => {
			const interval = setInterval(async () => {
					if(!props.isLoading) props.setIsLoading(true);
			}, 10000);

			return () => clearInterval(interval);
		});

		useEffect(() => {
			const interval = setInterval(async () => {
					if(props.isLoading) {
						setUser(TokenService.getUser());
						props.setIsLoading(false);
					}
			}, 100);

			return () => clearInterval(interval);
		});
		
		return(
			<div className={classes.profile_setting}>
					<div className={classes.setting_line}>
							<div className={classes.setting_main}>
									<div className={classes.setting_img} onMouseDown={() => props.exchangeModal("load-image")}>
											<img className={classes.user_logo} alt="" src={UserLogo}></img>
											<img className={classes.load_icon} alt="" src={Download}></img>
									</div>
									<div className={classes.setting_data}>
											<InputData value={user.name} tittle="Логин:"/>
											<InputData value={user.email} tittle="Почта:"/>
											<InputData tittle="Роль:" value={user.role}/>
									</div>
							</div>
							<div className={classes.setting_bar}>
									<MiniRetractable 
										color="#EAA22F" 
										image={BookUser} 
										text="Изменить логин"
										click={_ => props.setControllerConfirmEmail("login")}
									/>
									<MiniRetractable 
										color="#EAA22F" 
										image={Email} 
										text="Изменить почту"
										click={_ => props.setControllerConfirmEmail("email")}
									/>
									<MiniRetractable 
										color="#EAA22F" 
										image={Pen} 
										text="Изменить пароль"
										click={_ => props.setControllerConfirmEmail("password")}
									/>
									<MiniRetractable 
										color="red" 
										image={CrossBlack} 
										text="Удалить аккаунт"
										click={_ => props.setControllerConfirmEmail("account_delete")}
									/>
							</div>
					</div>
					<div className={classes.setting_line}>
					</div>
			</div>
		);
};

export default ProfileSetting;
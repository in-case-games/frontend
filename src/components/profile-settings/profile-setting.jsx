import React, { useState } from 'react'
import { UserLogo } from '../../assets/images/additional'
import { Download } from '../../assets/images/icon'
import TokenService from "../../services/token"
import InputData from './components/input-data'
import classes from "./profile-setting.module.css"

const ProfileSetting = (props) => {
		const [user, setUser] = useState(TokenService.getUser());
		
		return(
			<div className={classes.profile_setting}>
					<div className={classes.setting_line}>
							<div className={classes.setting_img}>
									<img className={classes.user_logo} alt="" src={UserLogo}></img>
									<img className={classes.load_icon} alt="" src={Download}></img>
							</div>
							<div className={classes.setting_data}>
									<InputData
										value={user.name}
										max={50}
										tittle="Логин"
										name="user-name"
									/>
									<InputData
										value={user.email}
										max={50}
										tittle="Почта"
										name="user-email"
									/>
									<InputData
										value={user.role}
									/>
							</div>
					</div>
			</div>
		);
};

export default ProfileSetting;
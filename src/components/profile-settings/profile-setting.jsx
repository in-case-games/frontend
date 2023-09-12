import React from 'react'
import { UserLogo } from '../../assets/images/additional'
import { Download } from '../../assets/images/icon'
import TokenService from "../../services/token"
import classes from "./profile-setting.module.css"

const ProfileSetting = (props) => {
		const user = TokenService.getUser();
		
		return(
			<div className={classes.profile_setting}>
					<div className={classes.setting_line}>
							<div className={classes.setting_img}>
									<img className={classes.user_logo} alt="" src={UserLogo}></img>
									<img className={classes.load_icon} alt="" src={Download}></img>
							</div>
							<div className={classes.setting_data}>
									<div>{user.name}</div>
									<div>{user.email}</div>
									<div>{user.role}</div>
							</div>
					</div>
			</div>
		);
};

export default ProfileSetting;
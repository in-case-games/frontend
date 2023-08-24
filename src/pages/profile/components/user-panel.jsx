import React, { useEffect, useState } from 'react'
import { read_cookie } from 'sfcookies'
import TokenService from '../../../services/token'
import PanelBar from './panel-bar'
import PanelContent from './panel-content'

const UserPanel = () => {
		const [content, setContent] = useState("profile");
		const [show, setShow] = useState(null);

		const exchange = (content) => {
				setContent(content);
		};

		useEffect(() => {
      const interval = setInterval(async () => {
        try {
            setShow(read_cookie("user-id").length !== 0 && TokenService.getExpiresAccessToken());
        } 
        catch (err) {
            setShow(false);
        }
      }, (1));

      return () => {
        clearInterval(interval);
      };
    });

		const userPanel = () => {
				if(show === null) return(null);

				return(show ?
					<div className='user-panel'>
							<PanelBar exchange={exchange} active={content}/>
							<PanelContent active={content}/>
					</div> : 
					<div>Вы не авторизованы</div>);
		};
		
		return(userPanel());
};

export default UserPanel;
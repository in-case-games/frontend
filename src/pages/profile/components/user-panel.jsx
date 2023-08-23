import React, { useEffect, useState } from 'react'
import { read_cookie } from 'sfcookies'
import PanelBar from './panel-bar'
import PanelContent from './panel-content'

const UserPanel = () => {
		const [content, setContent] = useState("profile");
		const [show, setShow] = useState(false);

		const exchange = (content) => {
				setContent(content);
		};

		useEffect(() => {
      const interval = setInterval(async () => {
        try {
            setShow(read_cookie("user-id").length !== 0);
        } 
        catch (err) {
            setShow(false);
        }
      }, (100));

      return () => {
        clearInterval(interval);
      };
    });
		
		return(show ?
				<div className='user-panel'>
						<PanelBar exchange={exchange} active={content}/>
						<PanelContent active={content}/>
				</div> : <div>Вы не авторизованы</div>
		);
};

export default UserPanel;
import React, { useEffect, useState } from "react"
import { User } from '../../services/api'
import TokenService from '../../services/token'
import { Header, HeaderAuthorization } from "./"

const HeaderLoader = (props) => {
		const userApi = new User();
		const [isStart, setIsStart] = useState(true);
		const [isAuth, setIsAuth] = useState(false);

		useEffect(() => {
			const interval = setInterval(async () => {
				try {				
						if(TokenService.getAccessToken()) {
								await userApi.get();
								setIsAuth(true);
						}
						else {
							setIsAuth(false);
						}

						setIsStart(false);
				} 
				catch (err) {
						setIsAuth(false);
						setIsStart(false);
				}
			}, (isStart ? 1 : 1000));

			return () => {
				clearInterval(interval);
			};
		});

		return(isAuth ? <HeaderAuthorization/> : <Header/> );
}

export default HeaderLoader;
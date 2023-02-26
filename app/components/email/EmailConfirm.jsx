import React, { useEffect, useState } from 'react';
import axios from "axios";
import ReactDOM from "react-dom";
import api from "../../services/api";
import TokenService from "../../services/token.service";
import ErrorForbid from "../error/error.forbid";
import {useParams, useSearchParams, useNavigate} from "react-router-dom";

function ReceiveEmailConfirm() {
	const params = useParams();
	const [searchParams, setSearchParams] = useSearchParams();
	const [currentUser, setCurrentUser] = useState(undefined);
	const user = {
		UserId: params.userId,
		UserEmail: "yt_ferbray@mail.ru",
		EmailToken: searchParams.get("token"),
		UserIp: searchParams.get("ip"),
		UserPlatforms: searchParams.get("platform")
	};

	useEffect(() => {
		const apiUrl = 'https://localhost:7138/email/api/EmailTokenReceive/confirm';
		api.post(apiUrl, user).then(
		response => {
			if (response.data.data.accessToken) {
				TokenService.setUser(response.data.data);
				setCurrentUser(response.data.data);
			}
		}).catch(
			error => {
				setCurrentUser(undefined);
			});
	}, [setCurrentUser]);

	if(currentUser === undefined)  {
		return (
			<div>
				<ErrorForbid/>
			</div>)
	}

	return (
		<div>
			<h1>Вы успешно авторизовались!</h1>
		</div>

)}

export default ReceiveEmailConfirm;
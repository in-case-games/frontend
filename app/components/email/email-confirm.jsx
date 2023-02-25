import React, { useEffect, useState } from 'react';
import axios from "axios";
import ReactDOM from "react-dom";
import {useParams, useSearchParams, useNavigate} from "react-router-dom";

function ReceiveEmailConfirm() {
	const params = useParams();
	const [searchParams, setSearchParams] = useSearchParams();
	const [appState, setAppState] = useState();
	const user = {
		UserId: params.userId,
		UserEmail: "yt_ferbray@mail.ru",
		EmailToken: params.emailToken,
		UserIp: "1111",
		UserPlatforms: "MAC"
	};
	useEffect(async () => {
		const apiUrl = 'https://localhost:7138/email/api/EmailTokenReceive/confirm';
    	await axios.post(apiUrl, user).then(
    		(resp) => {
      			const allPersons = resp.data;
      			setAppState(allPersons);
      		})
	}, [setAppState]);

	return (
		<div>
			<h1>UserId: {user.UserId}</h1>
			<h1>EmailToken: {user.EmailToken}</h1>
		</div>

)}

export default ReceiveEmailConfirm;
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
		EmailToken: searchParams.get("token"),
		UserIp: searchParams.get("ip"),
		UserPlatforms: searchParams.get("platform")
	};

	useEffect(() => {
		const apiUrl = 'https://localhost:7138/email/api/EmailTokenReceive/confirm';
		axios.post(apiUrl, user).then(
		response => {
			console.log(response.data);
			const result = "true";
			setAppState(result);
		}).catch(
		error => {
			setAppState(null);
		});
	}, [setAppState]);

	let result = appState;

	if(result === null)  {
		return (
			<div>
				<h1>mmmXyina</h1>
			</div>)
	}

	return (
		<div>
			<h1>UserId: {user.UserId}</h1>
			<h1>EmailToken: {user.EmailToken}</h1>
			<h1>{result}</h1>
		</div>

)}

export default ReceiveEmailConfirm;
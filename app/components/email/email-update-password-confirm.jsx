import React from "react";
import ReactDOM from "react-dom";
import {useParams, useSearchParams, useNavigate} from "react-router-dom";

function ReceivePasswordUpdateConfirm() {
	const params = useParams();
	const [searchParams, setSearchParams] = useSearchParams();
	const user = {
		UserId: params.userId,
		UserEmail: "yt_ferbray@mail.ru",
		EmailToken: searchParams.get("token"),
		UserIp: searchParams.get("ip"),
		UserPlatforms: searchParams.get("platform")
	};
	return (
		<div>
			<h1>UserId: {params.userId}</h1>
			<h1>EmailToken: {params.emailToken}</h1>
		</div>

)}

export default ReceivePasswordUpdateConfirm;
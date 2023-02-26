import React from "react";
import ReactDOM from "react-dom";
import {useParams, useSearchParams, useNavigate} from "react-router-dom";

function ReceiveEmailNewConfirm() {
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
			<h1>UserId: {user.UserId}</h1>
			<h1>EmailToken: {user.EmailToken}</h1>
		</div>

)}

export default ReceiveEmailNewConfirm;
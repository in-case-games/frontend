import React from "react";
import ReactDOM from "react-dom";
import {useParams, useSearchParams, useNavigate} from "react-router-dom";

function ReceiveAccountDeleteConfirm() {
	const params = useParams();
	const [searchParams, setSearchParams] = useSearchParams();

	return (
		<div>
			<h1>UserId: {params.userId}</h1>
			<h1>EmailToken: {params.emailToken}</h1>
		</div>

)}

export default ReceiveAccountDeleteConfirm;
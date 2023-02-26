import React from "react";
import ReactDOM from "react-dom";
import {useParams, useSearchParams, useNavigate} from "react-router-dom";

function ErrorForbid() {
	const params = useParams();
	const [searchParams, setSearchParams] = useSearchParams();

	return (
		<h1>Ссылка не действительна</h1>
)}

export default ErrorForbid;
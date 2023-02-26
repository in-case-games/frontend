import React from "react";
import ReactDOM from "react-dom";
import {useParams, useSearchParams, useNavigate} from "react-router-dom";

function ErrorNotFound() {
	const params = useParams();
	const [searchParams, setSearchParams] = useSearchParams();

	return (
		<h1>Это страница не найдена</h1>
)}

export default ErrorNotFound;
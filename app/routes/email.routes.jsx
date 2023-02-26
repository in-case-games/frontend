import React from "react";
import ReactDOM from "react-dom";
import {Routes, Route} from "react-router-dom";
import ReceiveEmailConfirm from "../components/email/EmailConfirm";
import ReceiveEmailNewConfirm from "../components/email/EmailNewConfirm";
import ReceiveEmailUpdateConfirm from "../components/email/EmailUpdate";
import ReceivePasswordUpdateConfirm from "../components/email/EmailUpdatePassword";
import ReceiveAccountDeleteConfirm from "../components/email/EmailAccountDelete";
import ErrorNotFound from "../components/error/error.notFound"

function EmailRoutes() {
	return (
		<Routes>
			<Route path="/receive/:userId" element={<ReceiveEmailConfirm/>}/>
			<Route path="/receive/new/:userId" element={<ReceiveEmailNewConfirm/>}/>
			<Route path="/receive/update/email/:userId" element={<ReceiveEmailUpdateConfirm/>}/>
			<Route path="/receive/update/password/:userId" element={<ReceivePasswordUpdateConfirm/>}/>
			<Route path="/receive/delete/:userId" element={<ReceiveAccountDeleteConfirm/>}/>
			<Route path="*" element={<ErrorNotFound/>}/>
		</Routes>
)}

export default EmailRoutes;
import React from "react";
import ReactDOM from "react-dom";
import {Routes, Route} from "react-router-dom";
import ReceiveEmailConfirm from "./email-confirm";
import ReceiveEmailNewConfirm from "./email-new-confirm";
import ReceiveEmailUpdateConfirm from "./email-update-confirm";
import ReceivePasswordUpdateConfirm from "./email-update-password-confirm";
import ReceiveAccountDeleteConfirm from "./email-account-delete-confirm";
import ErrorNotFound from "../error/error-not-found"

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
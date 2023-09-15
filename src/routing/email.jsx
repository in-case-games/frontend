import React from "react"
import { Route, Routes } from "react-router-dom"
import { Email as EmailPage } from "../pages/email"
import {
    AccountDeleteHandler,
    EmailHandler,
    LoginHandler,
    PasswordHandler,
    SignInHandler
} from '../pages/email/components'
import { NotFound as NotFoundPage } from "../pages/errors"

class EmailRouting extends React.Component {
    render() {
        return (
            <Routes>
                <Route path="confirm/account" 
                    element={<EmailPage handler={<SignInHandler/>}/>}/>
                <Route path="confirm/delete" 
                    element={<EmailPage handler={<AccountDeleteHandler/>}/>}/>
                <Route path="confirm/update/login" 
                    element={<EmailPage handler={<LoginHandler/>}/>}/>
                <Route path="confirm/update/email" 
                    element={<EmailPage handler={<EmailHandler/>}/>}/>
                <Route path="confirm/update/password" 
                    element={<EmailPage handler={<PasswordHandler/>}/>}/>
                <Route path="*" element={<NotFoundPage title="Страница не найдена"/>}/>
            </Routes>
        );
    }
}

export default EmailRouting;
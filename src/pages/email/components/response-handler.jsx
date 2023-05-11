import { React, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSearchParams } from "react-router-dom";
import Email from "../../../services/api/email";

const ResponseHandler = () => {
    const email = new Email();
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();

    const pathAndMethod = {
        "/email/confirm/account" : async () => (await email.checkSignIn(searchParams.get("token")))
    };

    const sendEmail = pathAndMethod[window.location.pathname];
    
    useEffect(() => {
        async function getToken() {
            const token = await sendEmail();

            if(token.data) {
                navigate("/#");   
            }
        }

        getToken();
     });

    return(
        <div className="email">
            <div>Доработать</div>
        </div>
    );
}

export default ResponseHandler;
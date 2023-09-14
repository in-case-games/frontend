import { React, useEffect } from "react"
import { useNavigate, useSearchParams } from "react-router-dom"
import Email from "../../../services/api/email"

const SignInHandler = () => {
    const email = new Email();
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    
    useEffect(() => {
        const getToken = async () => {
            const token = await email.checkSignIn(searchParams.get("token"));

            if(token.data) navigate("/#");   
        }

        getToken();
     });

    return(
        <div className="email">
            Доработать
        </div>
    );
}

export default SignInHandler;
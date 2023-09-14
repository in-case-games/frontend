import { React, useEffect, useState } from "react"
import { useSearchParams } from "react-router-dom"
import Email from "../../../services/api/email"
import classes from "./handler.module.css"

//TODO Loading
const SignInHandler = () => {
    const email = new Email();
    const [searchParams] = useSearchParams();
    const [error, setError] = useState(null);
    
    useEffect(() => {
        const getToken = async () => {
            const token = searchParams.get("token");

            try {
                if(token) await email.checkSignIn(searchParams.get("token"));
                else setError("Токен не валидный, повторите все еще раз");
            }
            catch(err) {
                setError(err.response.data.error.message);
            }
        }

        getToken();
     });

    return(
        <div className={classes.handler}>
            {
                error ? 
                <div className={classes.error_message}>
                    {error}
                </div>: null
            }
        </div>
    );
}

export default SignInHandler;
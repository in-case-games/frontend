import { React, useState, useEffect } from "react";
import { UserAgreement, PrivacyPolicy, CookiePolicy } from "./";
import { useParams } from "react-router-dom";

const InfoSlider = () => {
    const params = useParams();
    const infos = {
        "privacy-policy": <PrivacyPolicy/>,
        "cookie-policy": <CookiePolicy/>,
        "user-agreement": <UserAgreement/>
    }
    const [info, setInfo] = useState(params.id);
    const onClick = () => setInfo(params.id);

    useEffect(() => {
        setInfo(params.id);
    }, [params]);

    return(
        <div className="info-slider">
            <div className="btn-info" onClick={onClick}></div>
            {
                infos[info] ? infos[info] : <UserAgreement/> 
            }
        </div>
    );
};

export default InfoSlider;

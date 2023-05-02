import React from "react";
import { UserAgreement, PrivacyPolicy, CookiePolicy } from "./";
import { useParams } from "react-router-dom";

const InfoSlider = () => {
    const params = useParams();
    const [info, setInfo] = React.useState(params.id);
    const onClick = () => setInfo(params.id);

    return(
        <div className="info-slider">
            <div className="btn-info" onClick={onClick}></div>
            {
                (info === "privacy-policy") ? 
                    <PrivacyPolicy/> :
                    (info === "cookie-policy") ? 
                        <CookiePolicy/> :
                        <UserAgreement/>
            }
        </div>
    );
};

export default InfoSlider;

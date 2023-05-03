import { React, useState, useEffect } from "react";
import { UserAgreement, PrivacyPolicy, CookiePolicy } from "./";
import {Info as InfoButton} from "../../../components/сommon/button";
import { useParams } from "react-router-dom";

const InfoSlider = () => {
    const params = useParams();
    const infos = {
        "privacy-policy": <PrivacyPolicy/>,
        "cookie-policy": <CookiePolicy/>,
        "default": <UserAgreement/>
    }
    const [info, setInfo] = useState(params.id);

    const isActive = (name) => {
        return(
            info === name || 
            (infos[info] === undefined && name === "default")
        );
    };

    useEffect(() => {
        setInfo(params.id);
    }, [params]);

    return(
        <div className="info-slider">
            <div className="info-bar">
                <InfoButton
                    isActive={isActive("default")} 
                    name="Соглашение"
                    link="/info/user-agreement"
                />
                <InfoButton 
                    isActive={isActive("privacy-policy")}
                    name="Конфинденциальность"
                    link="/info/privacy-policy"
                />
                <InfoButton 
                    isActive={isActive("cookie-policy")}
                    name="Куки"
                    link="/info/cookie-policy"
                />
            </div>
            {
                infos[info] ? infos[info] : <UserAgreement/> 
            }
        </div>
    );
};

export default InfoSlider;

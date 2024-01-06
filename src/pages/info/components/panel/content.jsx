import React from "react";
import { UserAgreement, CookiePolicy, PrivacyPolicy } from "../content";
import styles from "../../info.module";

const Content = (props) => (
  <div className={styles.panel_content}>
    {props.content !== "cookie-policy" ? <UserAgreement /> : null}
    {props.content === "cookie-policy" ? <CookiePolicy /> : null}
  </div>
);

export default React.memo(Content);

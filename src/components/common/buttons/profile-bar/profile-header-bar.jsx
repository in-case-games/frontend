import React from "react";
import { TemplateUser as UserImage } from "../../../../assets/images/main";
import styles from "./profile-bar.module";

const ProfileHeaderBar = (props) => {
  return (
    <div
      className={
        props.isActive
          ? styles.profile_header_bar__active
          : styles.profile_header_bar
      }
      onClick={props.click}
    >
      <img className={styles.image} alt="" src={props.image ?? UserImage} />
      <div className={styles.name}>{props.name}</div>
    </div>
  );
};

export default React.memo(ProfileHeaderBar);

import React from "react";
import { Helmet } from "react-helmet";
import { Panel } from "./components";
import styles from "./profile.module";

class Profile extends React.Component {
  render() {
    return (
      <div className={styles.profile}>
        <Helmet>
          <title>InCase - Профиль</title>
        </Helmet>
        <div className={styles.container}>
          <Panel />
        </div>
      </div>
    );
  }
}

export default Profile;

import React from "react";
import { Helmet } from "react-helmet";
import { Reviews } from "../../components/structure";
import { Dropdown } from "./components";
import styles from "./faq.module";

class FAQ extends React.Component {
  render() {
    return (
      <div className={styles.faq}>
        <Helmet>
          <title>InCase - FAQ</title>
        </Helmet>
        <div className={styles.container_small}>
          <div className={styles.tittle}>Вопросы и ответы</div>
          <div className={styles.questions}>
            <Dropdown question="Как войти в аккаунт?" answer="Типа ответ" />
            <Dropdown question="Как войти в аккаунт?" answer="Типа ответ" />
            <Dropdown question="Как войти в аккаунт?" answer="Типа ответ" />
          </div>
          <Reviews />
        </div>
      </div>
    );
  }
}

export default FAQ;

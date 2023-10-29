import React from "react";
import styles from "./payment.module";

const Payment = (props) => {
  return (
    <div className={styles.payment}>
      <div className={styles.payment_content}>
        <div className={styles.payment_header}>
          <div className={styles.payment_tittle}>Здесь будет оплата</div>
        </div>
      </div>
    </div>
  );
};

export default Payment;

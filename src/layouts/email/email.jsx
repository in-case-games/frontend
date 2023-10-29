import React from "react";
import { Helmet } from "react-helmet";

const Email = ({ children }) => {
  return (
    <div>
      <Helmet>
        <title>InCase - Подтверждение через почту</title>
      </Helmet>
      {children}
    </div>
  );
};

export default Email;

import React from "react";
import { Helmet } from "react-helmet";

const Email = ({ children, title = "InCase - Подтверждение через почту" }) => (
  <div>
    <Helmet>
      <title>{title}</title>
    </Helmet>
    {children}
  </div>
);

export default Email;

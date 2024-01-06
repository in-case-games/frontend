import React, { useState, useEffect } from "react";
import { Bar, Content } from ".";
import { useNavigate, useParams } from "react-router-dom";
import styles from "../../info.module";

const Panel = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [content, setContent] = useState(params.id);

  useEffect(() => {
    const interval = setInterval(() => {
      setContent(params.id);
    }, 10);

    return () => clearInterval(interval);
  });

  return (
    <div className={styles.panel}>
      <Bar
        content={content}
        exchange={(content) => {
          setContent(content);
          navigate("/info/" + content);
        }}
      />
      <Content
        content={content}
        exchange={(content) => {
          setContent(content);
          navigate("/info/" + content);
        }}
      />
    </div>
  );
};

export default React.memo(Panel);

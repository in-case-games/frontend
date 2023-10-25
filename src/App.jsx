import React from "react";
import { Main as Routes } from "./routing";
import { Main as Layout } from "./layouts";

class App extends React.Component {
  render() {
    return (
      <Layout>
        <Routes />
      </Layout>
    );
  }
}

export default App;

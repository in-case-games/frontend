import React from "react";
import { Main as MainRoutes } from "./routing";
import { Header, Footer } from "./components/сommon";

class App extends React.Component {
    render() {
        return (
            <div className="wrapper">
                <Header/>
                <MainRoutes/>
                <Footer/>
            </div>
        )
    }
}

export default App;
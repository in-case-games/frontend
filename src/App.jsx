import React from "react";
import background from "../src/assets/images/additional/bg-man.png"
import { Main as MainRoutes } from "./routing";
import { Header, Footer } from "./components/сommon";

class App extends React.Component {
    render() {
        return (
            <div className="wrapper">
                <Header/>
                <MainRoutes/>
                <Footer/>
                <img src={background} id="background-man-absolute"/>
            </div>
        )
    }
}

export default App;
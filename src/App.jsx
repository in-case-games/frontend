import React from "react"
import background from "../src/assets/images/additional/bg-man.png"
import { Footer, Header } from "../src/components/сommon"
import { Main as MainRoutes } from "./routing"

class App extends React.Component {
    render() {
        return (
            <div className="wrapper">
                <Header/>
                <MainRoutes/>
                <Footer/>
                <img src={background} id="background-man-absolute" alt="bg-man"/>
            </div>
        )
    }
}

export default App;
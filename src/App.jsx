import React from "react";
import MainRoutes from "./routing/MainRoutes";
import Footer from "./components/Common/Footer";
import Header from "./components/Common/Header";

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
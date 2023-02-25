const ReactDOM = require("react-dom/client");
const React = require("react");
import ApplicationRoutes from "./components/routes";
import "../public/css/stylenull.css";
import "../public/css/stylemain.css";

ReactDOM.createRoot(
		document.getElementById("app")
	).render(
		<ApplicationRoutes/>
	);
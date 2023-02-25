const ReactDOM = require("react-dom/client");
const React = require("react");
import ApplicationRoutes from "./components/routes";

ReactDOM.createRoot(
		document.getElementById("app")
	).render(
		<ApplicationRoutes/>
	);
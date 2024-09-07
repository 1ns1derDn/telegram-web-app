import React from "react"
import ReactDOM from "react-dom/client"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { App } from "./app"
import { UserProvider } from "./components/contexts/user.context"
import "./styles/global.css"

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement)
root.render(
	<UserProvider>
		<React.StrictMode>
			<App />
			<ToastContainer />
		</React.StrictMode>
	</UserProvider>
)

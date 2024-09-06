import React from "react"
import ReactDOM from "react-dom/client"
import { App } from "./app"
import { UserProvider } from "./components/contexts/user.context"
import "./styles/global.css"

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement)
root.render(
	<UserProvider>
		<React.StrictMode>
			<App />
		</React.StrictMode>
	</UserProvider>
)

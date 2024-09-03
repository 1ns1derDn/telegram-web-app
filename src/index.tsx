import React from "react"
import ReactDOM from "react-dom/client"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { Profile, Register } from "./components/templates"

import "./styles/global.css"

const router = createBrowserRouter([
	{
		path: "/register",
		element: <Register />,
	},
	{
		path: "/",
		element: <Profile />,
	},
])

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement)
root.render(
	<React.StrictMode>
		<RouterProvider router={router} />
	</React.StrictMode>
)

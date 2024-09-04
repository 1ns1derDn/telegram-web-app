import { useEffect } from "react"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { Main, Register } from "./components/templates"

const router = createBrowserRouter([
	{
		path: "/register",
		element: <Register />,
	},
	{
		path: "/",
		element: <Main />,
	},
])

export const App = () => {
	useEffect(() => {
		window.Telegram.WebApp.ready()
	}, [])

	return <RouterProvider router={router} />
}

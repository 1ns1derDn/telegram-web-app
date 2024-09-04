import { useEffect } from "react"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { Profile, Register } from "./components/templates"

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

export const App = () => {
	useEffect(() => {
		window.Telegram.WebApp.ready()
	}, [])

	return <RouterProvider router={router} />
}

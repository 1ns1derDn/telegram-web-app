import axios from "axios"
import { useEffect, useState } from "react"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { Profile, Register } from "./components/templates"
import { useTelegram } from "./hooks"

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
	const { userId } = useTelegram()
	const [user, setUser] = useState()

	console.log("tgUser", userId)

	useEffect(() => {
		const fetchData = async () => {
			if (!userId) return

			try {
				const response = await axios.post("https://telegram.mavinx.app/api/find", {
					telegram_id: userId,
				})

				console.log("response", response)

				setUser(response.data)
			} catch (error) {
				console.log(error)
			}
		}

		fetchData()
	}, [userId])

	useEffect(() => {
		window.Telegram.WebApp.ready()
	}, [])

	console.log("user", user)

	return <RouterProvider router={router} />
}

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
	const { tgUser, ready } = useTelegram()
	const [user, setUser] = useState()

	console.log("tgUser", tgUser)

	useEffect(() => {
		const fetchData = async () => {
			const response = await axios.post("https://telegram.mavinx.app/api/find", {
				telegram_id: tgUser?.id,
			})

			console.log("response", response)

			setUser(response.data)
		}

		fetchData()
	}, [tgUser?.id])

	useEffect(() => {
		ready()
	}, [ready])

	console.log("user", user)

	return <RouterProvider router={router} />
}

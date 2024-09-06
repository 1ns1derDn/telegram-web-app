import { Box, CircularProgress } from "@mui/material"
import { useContext, useEffect, useState } from "react"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { UserContext } from "./components/contexts/user.context"
import { Profile, Register, Verification } from "./components/templates"
import { getUserByPhone, getUserPhone } from "./services"

const router = createBrowserRouter([
	{
		path: "/",
		element: <Profile />,
	},
	{
		path: "/register",
		element: <Register />,
	},
	{
		path: "/verification",
		element: <Verification />,
	},
])

export const App = () => {
	const { setDataValue } = useContext(UserContext)
	const [loading, setLoading] = useState<boolean>(true)

	useEffect(() => {
		window.Telegram.WebApp.ready()
	}, [])

	useEffect(() => {
		const initial = async () => {
			const responseUserPhone = await getUserPhone({
				telegram_id: String(window.Telegram.WebApp.initDataUnsafe.user?.id),
			})

			if (responseUserPhone?.message === "success") {
				setDataValue({ phone: responseUserPhone.phone })
			}

			if (responseUserPhone?.message === "error") {
				setDataValue({ phone: "" })
			}

			if (!responseUserPhone?.phone) return

			const responseUserByPhone = await getUserByPhone({
				phone: responseUserPhone?.phone,
			})

			if (responseUserByPhone.data.data.surname !== "") {
				setDataValue({
					phone: responseUserPhone.phone,
					...responseUserByPhone.data.data,
				})
			}

			if (responseUserByPhone.data.data.surname === "") {
				router.navigate("/register")
			}

			setLoading(false)
		}

		initial()
	}, [setDataValue])

	return (
		<>
			{loading ? (
				<Box
					sx={{
						width: "100vw",
						height: "100vh",
						display: "flex",
						justifyContent: "center",
						alignItems: "center",
					}}
				>
					<CircularProgress />
				</Box>
			) : (
				<RouterProvider router={router} />
			)}
		</>
	)
}

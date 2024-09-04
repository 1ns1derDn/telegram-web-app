import axios from "axios"
import { useEffect, useState } from "react"
import { useTelegram } from "../../../hooks"

export const Main = () => {
	const [phone, setPhone] = useState<number | null>(null)
	const { userId } = useTelegram()

	useEffect(() => {
		const fetchData = async () => {
			if (!userId) return

			try {
				const response = await axios.post("https://telegram.mavinx.app/api/find", {
					telegram_id: String(userId),
				})

				console.log("response", response)

				setPhone(response.data)
			} catch (error) {
				console.log(error)
			}
		}

		fetchData()
	}, [userId])

	console.log(phone)

	return <>loading</>
}

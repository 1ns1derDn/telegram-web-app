import { useEffect, useState } from "react"

export const useTelegram = () => {
	const [userId, setUserId] = useState<Number | null>(null)

	useEffect(() => {
		window.Telegram.WebApp.ready()
		const telegramWebApp = window.Telegram.WebApp
		console.log(telegramWebApp)

		if (telegramWebApp.initDataUnsafe && telegramWebApp.initDataUnsafe.user) {
			const id = telegramWebApp.initDataUnsafe.user.id
			setUserId(id)
		} else {
			console.error("Пользователь не авторизован или WebApp не инициализирован.")
		}
	}, [])

	return {
		userId,
	}
}

import { useEffect, useState } from "react"

export const useTelegram = () => {
	const [userId, setUserId] = useState<Number | null>(null)

	useEffect(() => {
		const telegramWebApp = window.Telegram.WebApp
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

const tg = window.Telegram.WebApp

export const useTelegram = () => {
	return {
		tgUser: tg.initDataUnsafe.user,
		ready: tg.ready,
	}
}

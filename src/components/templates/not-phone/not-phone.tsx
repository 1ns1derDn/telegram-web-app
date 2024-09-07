import { Typography } from "@mui/material"
import styles from "./not-phone.module.css"

export const NotPhone = () => {
	return (
		<div className={styles.page}>
			<Typography variant='h6' sx={{ textAlign: "center", maxWidth: "375px", margin: "0 auto" }}>
				To use the application you need to share your number through the bot
			</Typography>
		</div>
	)
}

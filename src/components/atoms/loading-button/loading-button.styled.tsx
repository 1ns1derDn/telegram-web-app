import { Button, keyframes, styled } from "@mui/material"
import LoadingIcon from "./loading-icon"

const rotate = keyframes({
	"0%": {
		transform: "rotate(0deg) translateY(-50%)",
	},
	"100%": {
		transform: "rotate(360deg) translateY(-50%)",
	},
})

export const LoadingButtonStyled = styled(Button)({
	position: "relative",
})

export const LoadingIconStyled = styled(LoadingIcon)({
	position: "absolute",
	right: "20px",
	top: "50%",
	transformOrigin: "top",
	animation: `0.75s steps(8) 0s infinite normal none running ${rotate}`,
})

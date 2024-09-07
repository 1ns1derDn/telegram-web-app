import { ButtonProps } from "@mui/material"
import { ForwardedRef, forwardRef } from "react"
import { LoadingButtonStyled, LoadingIconStyled } from "./loading-button.styled"

export interface LoadingButtonProps extends ButtonProps {
	loading?: boolean
}

function Button(
	{ loading, children, ...otherProps }: LoadingButtonProps,
	ref: ForwardedRef<HTMLButtonElement>
) {
	return (
		<LoadingButtonStyled ref={ref} {...otherProps} endIcon={loading ? <LoadingIconStyled /> : null}>
			{children}
		</LoadingButtonStyled>
	)
}

export const LoadingButton = forwardRef(Button)

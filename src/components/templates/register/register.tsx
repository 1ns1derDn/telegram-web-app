import { yupResolver } from "@hookform/resolvers/yup"
import { Container, TextField, Typography } from "@mui/material"
import { LocalizationProvider, MobileDatePicker } from "@mui/x-date-pickers"
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"
import dayjs from "dayjs"
import { useContext, useState } from "react"
import { Controller, useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import * as yup from "yup"
import { userUpdate } from "../../../services"
import { formatDateToYMD } from "../../../utils/format-date"
import { LoadingButton } from "../../atoms/loading-button/loading-button"
import { UserContext } from "../../contexts/user.context"
import styles from "./register.module.css"

interface RegisterForm {
	phone: string
	surname: string
	forename: string
	birthday: string
}

const schema = yup.object().shape({
	phone: yup.string().required(),
	surname: yup.string().required(),
	forename: yup.string().required(),
	birthday: yup.string().required(),
})

export const Register = () => {
	const { setDataValue } = useContext(UserContext)
	const [loading, setLoading] = useState<boolean>(false)
	const navigate = useNavigate()

	const { user } = useContext(UserContext)

	const {
		register,
		handleSubmit,
		control,
		formState: { errors },
	} = useForm<RegisterForm>({
		defaultValues: {
			birthday: "",
			phone: user.phone || "380980176692",
			surname: "",
			forename: "",
		},
		resolver: yupResolver(schema),
	})

	const onSubmit = async ({ birthday, phone, forename, surname }: RegisterForm) => {
		try {
			setLoading(true)

			console.log({
				phone: `+${phone}`,
				birthday: formatDateToYMD(birthday),
				forename,
				surname,
			})

			await userUpdate({
				phone: `+${phone}`,
				birthday: formatDateToYMD(birthday),
				forename,
				surname,
			})
			setDataValue({ nameStatus: "NEW", forename, surname, phone })
			navigate("/")
		} catch (error) {
			toast.error("Something went wrong, Please try again later", { type: "error" })
		} finally {
			setLoading(false)
		}
	}

	return (
		<div className={styles.page}>
			<Container sx={{ pointerEvents: loading ? "none" : "all" }}>
				<Typography className={styles.title} variant='h4' mb='20px'>
					Registration
				</Typography>
				<form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
					<TextField
						sx={{ mb: "15px" }}
						error={!!errors.phone}
						helperText={errors.phone?.message}
						slotProps={{ input: { readOnly: true } }}
						label='Phone number '
						{...register("phone")}
					/>
					<TextField
						sx={{ mb: "15px" }}
						error={!!errors.forename}
						helperText={errors.forename?.message}
						label='Forename'
						{...register("forename")}
					/>
					<TextField
						sx={{ mb: "15px" }}
						error={!!errors.surname}
						helperText={errors.surname?.message}
						label='Surname'
						{...register("surname")}
					/>
					<Controller
						control={control}
						name='birthday'
						render={({ field: { onChange, value } }) => (
							<LocalizationProvider dateAdapter={AdapterDayjs}>
								<MobileDatePicker
									sx={{ mb: "15px" }}
									slotProps={{
										textField: {
											error: !!errors.forename,
											helperText: errors.forename?.message,
										},
									}}
									maxDate={dayjs(new Date())}
									label='Birthday'
									value={value ? dayjs(value) : null}
									onChange={(newValue) => {
										onChange(newValue ? newValue.toISOString() : null)
									}}
								/>
							</LocalizationProvider>
						)}
					/>
					<LoadingButton
						disabled={loading}
						loading={loading}
						type='submit'
						sx={{ padding: "20px" }}
						variant='contained'
					>
						Register
					</LoadingButton>
				</form>
			</Container>
		</div>
	)
}

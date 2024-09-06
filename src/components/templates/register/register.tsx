import { Button, Container, TextField, Typography } from "@mui/material"
import { LocalizationProvider, MobileDatePicker } from "@mui/x-date-pickers"
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"
import dayjs from "dayjs"
import { useContext } from "react"
import { Controller, useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import { userUpdate } from "../../../services"
import { formatDateToYMD } from "../../../utils/format-date"
import { UserContext } from "../../contexts/user.context"
import styles from "./register.module.css"

interface RegisterForm {
	phone: string
	surname: string
	forename: string
	birthday: string
}

export const Register = () => {
	const navigate = useNavigate()

	const { user } = useContext(UserContext)

	const { register, handleSubmit, control } = useForm<RegisterForm>({
		defaultValues: {
			birthday: "",
			phone: user.phone,
			surname: "",
			forename: "",
		},
	})

	const onSubmit = async ({ birthday, ...otherData }: RegisterForm) => {
		await userUpdate({
			birthday: formatDateToYMD(birthday),
			...otherData,
		})

		navigate("/")
	}

	return (
		<div className={styles.page}>
			<Container>
				<Typography className={styles.title} variant='h4'>
					Регистрация
				</Typography>
				<form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
					<TextField
						slotProps={{ input: { readOnly: true } }}
						label='Номер телефона '
						{...register("phone")}
					/>
					<TextField label='Имя' {...register("surname")} />
					<TextField label='Отчество' {...register("forename")} />
					<Controller
						control={control}
						name='birthday'
						render={({ field: { onChange, value } }) => (
							<LocalizationProvider dateAdapter={AdapterDayjs}>
								<MobileDatePicker
									maxDate={dayjs(new Date())}
									label='День рождения'
									value={value ? dayjs(value) : null}
									onChange={(newValue) => {
										onChange(newValue ? newValue.toISOString() : null)
									}}
								/>
							</LocalizationProvider>
						)}
					/>
					<Button type='submit' classes={{ contained: styles.button }} variant='contained'>
						Зарегистрироваться
					</Button>
				</form>
			</Container>
		</div>
	)
}

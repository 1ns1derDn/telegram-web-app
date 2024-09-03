import { useForm } from "react-hook-form"

import { Button, Container, TextField, Typography } from "@mui/material"

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider"
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker"

import styles from "./register.module.css"

interface RegisterForm {
	phone: string
	citizenship: string
	surname: string
	name: string
	patronymic: string
	birthday: string
}

export const Register = () => {
	const { register, handleSubmit } = useForm<RegisterForm>({
		defaultValues: {
			birthday: "",
			citizenship: "",
			name: "",
			patronymic: "",
			phone: "",
			surname: "",
		},
	})

	const onSubmit = (data: RegisterForm) => {
		console.log(data)
	}

	return (
		<div className={styles.page}>
			<Container>
				<Typography className={styles.title} variant='h4'>
					Регистрация
				</Typography>
				<form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
					<TextField label='Номер телефона ' {...register("phone")} />
					<TextField label='Гражданство' {...register("citizenship")} />
					<TextField label='Фамилия' {...register("surname")} />
					<TextField label='Имя' {...register("name")} />
					<TextField label='Отчество' {...register("patronymic")} />
					<LocalizationProvider dateAdapter={AdapterDayjs}>
						<MobileDatePicker label='День рождения' />
					</LocalizationProvider>
					<Button classes={{ contained: styles.button }} variant='contained'>
						Зарегистрироваться
					</Button>
				</form>
			</Container>
		</div>
	)
}

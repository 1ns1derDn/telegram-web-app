import CloudUploadIcon from "@mui/icons-material/CloudUpload"
import { Box, Button, styled, Typography } from "@mui/material"
import { useContext } from "react"
import { Controller, useForm } from "react-hook-form"
import { verificationUpload } from "../../../services"
import { UserContext } from "../../contexts/user.context"
import { LayoutMain } from "../../layouts"

const VisuallyHiddenInput = styled("input")({
	clip: "rect(0 0 0 0)",
	clipPath: "inset(50%)",
	height: 1,
	overflow: "hidden",
	position: "absolute",
	bottom: 0,
	left: 0,
	whiteSpace: "nowrap",
	width: 1,
})

interface VerificationForm {
	photo: {
		base64: string
		name: string
		type: string
	}
	document: {
		base64: string
		name: string
		type: string
	}
}

interface IFile {
	type: string
	base64: string
}

function filesToBase64(files: File[]): Promise<IFile[]> {
	const promises: Promise<IFile>[] = files.map((file) => {
		return new Promise((resolve, reject) => {
			const reader = new FileReader()

			reader.onload = () => {
				const base64String = reader.result as string
				resolve({ type: base64String.split(",")[0], base64: base64String.split(",")[1] })
			}

			reader.onerror = () => {
				reject(new Error("Ошибка при чтении файла: " + file.name))
			}

			reader.readAsDataURL(file)
		})
	})

	return Promise.all(promises)
}

export const Verification = () => {
	const { user } = useContext(UserContext)
	const { control, handleSubmit, watch } = useForm<VerificationForm>()

	const onSubmit = async (data: VerificationForm) => {
		const response = verificationUpload({
			phone: user.phone,
			document: data.document.base64,
			photo: data.photo.base64,
		})

		console.log(response)
	}

	console.log(watch())

	return (
		<LayoutMain>
			<Typography variant='h6' textAlign='center' mb='20px'>
				ВЕРИФИКАЦИЯ
			</Typography>

			<form
				onSubmit={handleSubmit(onSubmit)}
				style={{
					display: "flex",
					flexDirection: "column",
					gap: "20px",
				}}
			>
				<Box sx={{ display: "flex", gap: "20px" }}>
					<Controller
						name='photo'
						control={control}
						render={({ field: { value, onChange, ...otherProps } }) => (
							<Button
								component='label'
								role={undefined}
								variant='contained'
								tabIndex={-1}
								startIcon={<CloudUploadIcon />}
								sx={{ alignSelf: "flex-start" }}
							>
								Фотография
								<VisuallyHiddenInput
									type='file'
									multiple={false}
									accept='.jpeg, .png, .jpg'
									onChange={async (e: React.ChangeEvent<HTMLInputElement>) => {
										if (!e.target.files?.[0]) return
										const [file] = await filesToBase64([e.target.files[0]])
										onChange({ name: e.target.files[0].name, type: file.type, base64: file.base64 })
									}}
									{...otherProps}
								/>
							</Button>
						)}
					/>
					{watch("photo.base64") && (
						<img
							style={{ maxWidth: "200px", marginLeft: "auto" }}
							src={`${watch("photo")?.type},${watch("photo")?.base64}`}
							alt='test'
						/>
					)}
				</Box>

				<Box sx={{ display: "flex", gap: "20px" }}>
					<Controller
						name='document'
						control={control}
						render={({ field: { value, onChange, ...otherProps } }) => (
							<Button
								component='label'
								role={undefined}
								variant='contained'
								tabIndex={-1}
								startIcon={<CloudUploadIcon />}
								sx={{ alignSelf: "flex-start" }}
							>
								"Документ"
								<VisuallyHiddenInput
									accept='.jpeg, .png, .jpg'
									onChange={async (e: React.ChangeEvent<HTMLInputElement>) => {
										if (!e.target.files?.[0]) return
										const [file] = await filesToBase64([e.target.files[0]])
										onChange({ name: e.target.files[0].name, type: file.type, base64: file.base64 })
									}}
									type='file'
									multiple={false}
									{...otherProps}
								/>
							</Button>
						)}
					/>

					{watch("document.base64") && (
						<img
							style={{ maxWidth: "200px", marginLeft: "auto" }}
							src={`${watch("document")?.type},${watch("document")?.base64}`}
							alt='test'
						/>
					)}
				</Box>

				<Button variant='contained' type='submit'>
					Загрузить документы
				</Button>
			</form>
		</LayoutMain>
	)
}

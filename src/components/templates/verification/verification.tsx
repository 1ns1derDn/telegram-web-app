import { yupResolver } from "@hookform/resolvers/yup"
import CloudUploadIcon from "@mui/icons-material/CloudUpload"
import { Box, Button, styled, Typography } from "@mui/material"
import { useContext, useEffect, useState } from "react"
import { Controller, useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import * as yup from "yup"
import { verificationUpload } from "../../../services"
import { LoadingButton } from "../../atoms/loading-button/loading-button"
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

const schema = yup.object().shape({
	photo: yup.object().shape({
		base64: yup.string().required(),
		name: yup.string().required(),
		type: yup.string().required(),
	}),
	document: yup.object().shape({
		base64: yup.string().required(),
		name: yup.string().required(),
		type: yup.string().required(),
	}),
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
	const navigate = useNavigate()
	const [loading, setLoading] = useState<boolean>(false)
	const { user } = useContext(UserContext)
	const {
		control,
		handleSubmit,
		watch,
		clearErrors,
		formState: { errors },
	} = useForm<VerificationForm>({
		defaultValues: {
			photo: { base64: "", name: "", type: "" },
			document: { base64: "", name: "", type: "" },
		},
		resolver: yupResolver(schema),
	})

	const onSubmit = async (data: VerificationForm) => {
		try {
			setLoading(true)
			await verificationUpload({
				phone: user.phone,
				document: data.document.base64,
				photo: data.photo.base64,
			})
			toast.success("Documents uploaded successfully")
			navigate("/")
		} catch (error) {
			toast.error("Something went wrong, Please try again later", { type: "error" })
		} finally {
			setLoading(false)
		}
	}

	useEffect(() => {
		if (errors?.photo || errors?.document) {
			toast.error("Photo & Document are required")
			clearErrors()
		}
	}, [errors.document, errors.photo, clearErrors])

	console.log(watch())

	return (
		<LayoutMain>
			<Box sx={{ padding: "30px 0" }}>
				<Typography variant='h6' textAlign='center' mb='20px'>
					VERIFICATION
				</Typography>

				<form
					onSubmit={handleSubmit(onSubmit)}
					style={{
						display: "flex",
						flexDirection: "column",
						gap: "20px",
						pointerEvents: loading ? "none" : "all",
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
									Photo
									<VisuallyHiddenInput
										type='file'
										multiple={false}
										accept='.jpeg, .png, .jpg'
										onChange={async (e: React.ChangeEvent<HTMLInputElement>) => {
											if (!e.target.files?.[0]) return
											const [file] = await filesToBase64([e.target.files[0]])
											onChange({
												name: e.target.files[0].name,
												type: file.type,
												base64: file.base64,
											})
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
									Document
									<VisuallyHiddenInput
										accept='.jpeg, .png, .jpg'
										onChange={async (e: React.ChangeEvent<HTMLInputElement>) => {
											if (!e.target.files?.[0]) return
											const [file] = await filesToBase64([e.target.files[0]])
											onChange({
												name: e.target.files[0].name,
												type: file.type,
												base64: file.base64,
											})
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

					<LoadingButton loading={loading} disabled={loading} variant='contained' type='submit'>
						Upload documents
					</LoadingButton>
				</form>
			</Box>
		</LayoutMain>
	)
}

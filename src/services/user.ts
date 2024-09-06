import axios from "axios"

interface IUserPhone {
	telegram_id: string
}

interface IUserSuccess {
	message: "success"
	phone: string
}

interface IUserError {
	phone: null
	message: "error"
}

export const getUserPhone = async (data: IUserPhone) => {
	try {
		const response = await axios.post<IUserSuccess>("https://telegram.mavinx.app/api/find", data)
		return response.data
	} catch (error: unknown) {
		if (axios.isAxiosError(error)) {
			const response = error.response
			return response?.data as IUserError
		}
	}
}

interface IUserByPhone {
	phone: string
}

export interface IUserData {
	membership: number
	surname: string
	forename: string
	middlename: string
	nameStatus: string
}

export interface ResponseSuccessUserByPhone {
	message: string
	data: IUserData
}

export interface ResponseErrorUserByPhone {
	message: string
}

export const getUserByPhone = async ({ phone }: IUserByPhone) => {
	const response = await axios.get<ResponseSuccessUserByPhone>(
		`https://telegram.mavinx.app/api/profile/+${phone}`
	)
	return response
}

export interface IUserUpdate {
	phone: string
	surname: string
	forename: string
	birthday: string
}

export const userUpdate = async (data: IUserUpdate) => {
	const response = await axios.post(`https://telegram.mavinx.app/api/profile`, data)
	return response
}

export interface IUpload {
	phone: string
	photo: string
	document: string
}

export const verificationUpload = async (data: IUpload) => {
	const response = await axios.post(`https://telegram.mavinx.app/api/upload`, data)
	return response
}

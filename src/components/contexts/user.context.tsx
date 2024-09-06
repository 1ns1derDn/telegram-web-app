import { ReactNode, createContext, useCallback, useMemo, useState } from "react"

interface IUserProviderProps {
	children: ReactNode
}

interface IUser {
	phone: string
	membership: number
	surname: string
	forename: string
	middlename: string
	nameStatus: string
}

interface IUserContextProps {
	setDataValue: (values: Partial<IUser>) => void
	user: IUser
}

const initialValue: IUser = {
	phone: "",
	forename: "",
	membership: 0,
	middlename: "",
	nameStatus: "",
	surname: "",
}

export const UserContext = createContext<IUserContextProps>({} as IUserContextProps)

export const UserProvider = ({ children }: IUserProviderProps) => {
	const [user, setUser] = useState<IUser>(initialValue)

	const setDataValue = useCallback((values: Partial<IUser>) => {
		setUser((prev) => ({
			...prev,
			...values,
		}))
	}, [])

	const value = useMemo(() => ({ user, setDataValue }), [user, setDataValue])

	return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}

import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined"
import BadgeOutlinedIcon from "@mui/icons-material/BadgeOutlined"
import CakeOutlinedIcon from "@mui/icons-material/CakeOutlined"
import CreditCardIcon from "@mui/icons-material/CreditCard"
import FlagOutlinedIcon from "@mui/icons-material/FlagOutlined"
import { Container } from "@mui/material"
import Avatar from "@mui/material/Avatar"
import List from "@mui/material/List"
import ListItem from "@mui/material/ListItem"
import ListItemAvatar from "@mui/material/ListItemAvatar"
import ListItemText from "@mui/material/ListItemText"
import axios from "axios"
import { useEffect, useState } from "react"
import { LayoutMain } from "../../layouts"
import styles from "./profile.module.css"

export interface IUser {
	membership: number
	surname: string
	forename: string
	middlename: string
	nameStatus: string
}

export const Profile = () => {
	const [user, setUser] = useState<IUser>()

	useEffect(() => {
		const fetchUser = async () => {
			try {
				const response = await axios.get("https://telegram.mavinx.app/api/profile/+79031307447")
				console.log(response)

				setUser(response.data.data)
			} catch (error: unknown) {
				if (axios.isAxiosError(error)) {
					console.log(error.response?.data)
				}
			}
		}

		fetchUser()
	}, [])

	return (
		<LayoutMain>
			<div className={styles.page}>
				<Container maxWidth='sm'>
					<AccountCircleOutlinedIcon
						sx={{ fontSize: "100px", display: "block", margin: "0 auto" }}
					/>
				</Container>
				<List sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
					<ListItem>
						<ListItemAvatar>
							<Avatar>
								<CreditCardIcon />
							</Avatar>
						</ListItemAvatar>
						<ListItemText primary='card' secondary={user?.nameStatus} />
					</ListItem>
					<ListItem>
						<ListItemAvatar>
							<Avatar>
								<BadgeOutlinedIcon />
							</Avatar>
						</ListItemAvatar>
						<ListItemText
							primary='User'
							secondary={`${user?.surname} ${user?.middlename} ${user?.forename}`}
						/>
					</ListItem>
					<ListItem>
						<ListItemAvatar>
							<Avatar>
								<CakeOutlinedIcon />
							</Avatar>
						</ListItemAvatar>
						<ListItemText primary='Birthday' secondary='July 20, 2014' />
					</ListItem>
					<ListItem>
						<ListItemAvatar>
							<Avatar>
								<FlagOutlinedIcon />
							</Avatar>
						</ListItemAvatar>
						<ListItemText primary='Citizenship' secondary='test' />
					</ListItem>
				</List>
			</div>
		</LayoutMain>
	)
}

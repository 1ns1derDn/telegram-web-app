import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined"
import BadgeOutlinedIcon from "@mui/icons-material/BadgeOutlined"
import CreditCardIcon from "@mui/icons-material/CreditCard"
import { Container } from "@mui/material"
import Avatar from "@mui/material/Avatar"
import List from "@mui/material/List"
import ListItem from "@mui/material/ListItem"
import ListItemAvatar from "@mui/material/ListItemAvatar"
import ListItemText from "@mui/material/ListItemText"
import { useContext } from "react"
import { UserContext } from "../../contexts/user.context"
import { LayoutMain } from "../../layouts"
import styles from "./profile.module.css"

export const Profile = () => {
	const { user } = useContext(UserContext)

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
						<ListItemText primary='Status' secondary={user.nameStatus} />
					</ListItem>
					<ListItem>
						<ListItemAvatar>
							<Avatar>
								<BadgeOutlinedIcon />
							</Avatar>
						</ListItemAvatar>
						<ListItemText
							primary='User'
							secondary={`${user?.surname} ${user?.forename} ${user?.middlename} `}
						/>
					</ListItem>
				</List>
			</div>
		</LayoutMain>
	)
}

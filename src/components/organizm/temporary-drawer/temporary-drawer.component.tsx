import CloseIcon from "@mui/icons-material/Close"
import MailIcon from "@mui/icons-material/Mail"
import MenuIcon from "@mui/icons-material/Menu"
import InboxIcon from "@mui/icons-material/MoveToInbox"
import { IconButton } from "@mui/material"
import Box from "@mui/material/Box"
import Divider from "@mui/material/Divider"
import Drawer from "@mui/material/Drawer"
import List from "@mui/material/List"
import ListItem from "@mui/material/ListItem"
import ListItemButton from "@mui/material/ListItemButton"
import ListItemIcon from "@mui/material/ListItemIcon"
import ListItemText from "@mui/material/ListItemText"
import * as React from "react"

export const TemporaryDrawer = () => {
	const [open, setOpen] = React.useState(false)

	const toggleDrawer = (newOpen: boolean) => () => {
		setOpen(newOpen)
	}

	const DrawerList = (
		<Box sx={{ width: 250 }} role='presentation' onClick={toggleDrawer(false)}>
			<List>
				{["Inbox", "Starred", "Send email", "Drafts"].map((text, index) => (
					<ListItem key={text} disablePadding>
						<ListItemButton>
							<ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
							<ListItemText primary={text} />
						</ListItemButton>
					</ListItem>
				))}
			</List>
			<Divider />
			<List>
				{["All mail", "Trash", "Spam"].map((text, index) => (
					<ListItem key={text} disablePadding>
						<ListItemButton>
							<ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
							<ListItemText primary={text} />
						</ListItemButton>
					</ListItem>
				))}
			</List>
		</Box>
	)

	return (
		<div>
			<IconButton
				sx={{
					marginLeft: "auto",
					display: "block",
				}}
				onClick={toggleDrawer(true)}
			>
				{open ? <CloseIcon sx={{ fontSize: "40px" }} /> : <MenuIcon sx={{ fontSize: "40px" }} />}
			</IconButton>
			<Drawer open={open} onClose={toggleDrawer(false)}>
				{DrawerList}
			</Drawer>
		</div>
	)
}

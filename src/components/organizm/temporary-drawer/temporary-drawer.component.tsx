import AccountBoxOutlinedIcon from "@mui/icons-material/AccountBoxOutlined"
import CloseIcon from "@mui/icons-material/Close"
import MenuIcon from "@mui/icons-material/Menu"
import VerifiedOutlinedIcon from "@mui/icons-material/VerifiedOutlined"
import { IconButton } from "@mui/material"
import Box from "@mui/material/Box"
import Drawer from "@mui/material/Drawer"
import List from "@mui/material/List"
import ListItem from "@mui/material/ListItem"
import ListItemButton from "@mui/material/ListItemButton"
import ListItemIcon from "@mui/material/ListItemIcon"
import ListItemText from "@mui/material/ListItemText"
import * as React from "react"
import { useNavigate } from "react-router-dom"

const routers = {
	Profile: "/",
	Verification: "/verification",
}

export const TemporaryDrawer = () => {
	const navigate = useNavigate()
	const [open, setOpen] = React.useState(false)

	const toggleDrawer = (newOpen: boolean) => () => {
		setOpen(newOpen)
	}

	const handleClick = (namePage: string) => () => {
		navigate(routers[namePage as keyof typeof routers])
		setOpen(false)
	}

	const DrawerList = (
		<Box sx={{ width: 250 }} role='presentation' onClick={toggleDrawer(false)}>
			<List>
				{["Profile", "Verification"].map((text, index) => (
					<ListItem key={text} disablePadding>
						<ListItemButton onClick={handleClick(text)}>
							<ListItemIcon>
								{index % 2 === 0 ? <AccountBoxOutlinedIcon /> : <VerifiedOutlinedIcon />}
							</ListItemIcon>
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
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
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

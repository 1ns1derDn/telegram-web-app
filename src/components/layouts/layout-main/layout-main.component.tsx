import { TemporaryDrawer } from "../../organizm/temporary-drawer"

interface LayoutMainProps {
	children?: React.ReactNode
}

export const LayoutMain = (props: LayoutMainProps) => {
	const { children } = props
	return (
		<div>
			<TemporaryDrawer />
			{children}
		</div>
	)
}

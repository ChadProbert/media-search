import React from "react";
import { AppBar, Toolbar, Typography } from "@material-ui/core";
import MenuIcon from "@mui/icons-material/Menu";
import IconButton from "@mui/material/IconButton";

import "./css/Menu.css";

/* basic reusable component that holds a title and the possibility of adding 
a dropdown to different navigations */
// data-test-id "menuTest" (line 13) is used for a frontend unit test
const Menu = () => (
	<AppBar position="static" className="appBar">
		<Toolbar data-testid="menuTest">
			<IconButton
				size="large"
				edge="start"
				aria-label="menu"
				sx={{ mr: 2 }}
				className="iconButton"
			>
				<MenuIcon className="menuIcon" />
			</IconButton>
			<Typography variant="h6" className="typography">
				Media Search
			</Typography>
		</Toolbar>
	</AppBar>
);

export default Menu;

/* references:

https://mui.com/components/app-bar/

*/

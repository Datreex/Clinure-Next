"use client";
import { Dropdown, IconButton, Menu, MenuButton, MenuItem } from "@mui/joy";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
export default function NavMenu() {
  return (
    <Dropdown>
      <MenuButton
        slots={{ root: IconButton }}
        slotProps={{ root: { variant: "plain", color: "neutral" } }}
      >
        <MenuRoundedIcon />
      </MenuButton>
      <Menu>
        <MenuItem>Profile</MenuItem>
        <MenuItem>My account</MenuItem>
        <MenuItem>Logout</MenuItem>
      </Menu>
    </Dropdown>
  );
}

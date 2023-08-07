import AddRoundedIcon from "@mui/icons-material/AddRounded";
import RemoveRoundedIcon from "@mui/icons-material/RemoveRounded";
import MyLocationRoundedIcon from "@mui/icons-material/MyLocationRounded";
import { ButtonGroup, IconButton } from "@mui/joy";
export default function MapControls() {
  return (
    <div className={"flex flex-col gap-2 items-center"}>
      <ButtonGroup
        orientation={"vertical"}
        className={"bg-white rounded-full shadow"}
        sx={{
          borderRadius: "9999px",
        }}
      >
        <IconButton>
          <MyLocationRoundedIcon />
        </IconButton>
      </ButtonGroup>
      <ButtonGroup
        orientation={"vertical"}
        className={"bg-white rounded-full shadow"}
        sx={{
          borderRadius: "9999px",
        }}
      >
        <IconButton>
          <AddRoundedIcon />
        </IconButton>
        <IconButton>
          <RemoveRoundedIcon />
        </IconButton>
      </ButtonGroup>
    </div>
  );
}

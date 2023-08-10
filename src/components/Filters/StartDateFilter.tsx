"use client";
import { useFilterSlice, FilterDefaults } from "@/lib/filters";
import {
  Box,
  Input,
  Checkbox,
  Button,
  FormControl,
  FormHelperText,
  FormLabel,
  List,
  ListItem,
  Typography,
} from "@mui/joy";

import { format } from "date-fns";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { Popover } from "@mui/material";
import { useState } from "react";

export const StartDateFilter = () => {
  const [state, setState] = useFilterSlice("studies.start_date");
  const [anchorEl, setAnchorEl] = useState<HTMLDivElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  if (state === undefined) throw new Error("StudyStart: state is undefined");
  if (state instanceof Array) throw new Error("StudyStart: state is a array");
  return (
    <Box>
      <Typography id="status-group" level="body-md" fontWeight="lg">
        Start Date
      </Typography>
      <FormHelperText>
        Select the status of the study you are looking for.
      </FormHelperText>
      {/* <Input value={format(state, "MM/dd/yyyy")} readOnly onClick={()=>setOpen(true)} /> */}

      {/* <Button onClick={handleClick} variant="outlined" sx={{width:"100%"}}>{format(state,)}</Button> */}
      <Input
        value={state.toLocaleDateString("fr-fr")}
        readOnly
        onClick={handleClick}
      />
      <Popover
        open={open}
        id="datepicker-filter"
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        sx={{
          borderRadius: "50px",
        }}
      >
        <DayPicker
          selected={state}
          onDayClick={(day) => {
            setState(day);
          }}
          disabled={{
            after: new Date(),
            //three years ago
            before: FilterDefaults.studyStart,
          }}
          defaultMonth={state}
        />
      </Popover>
    </Box>
  );
};

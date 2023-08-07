"use client";
import { useFilterSlice, FilterDefaults } from "@/lib/filters";
import {
  Box,
  Checkbox,
  FormControl,
  FormHelperText,
  FormLabel,
  List,
  ListItem,
  Typography,
} from "@mui/joy";

export const StatusFilter = () => {
  const [state, setState] = useFilterSlice("studies.status");
  if (state === undefined) throw new Error("StatusFilter: state is undefined");
  if (state instanceof Date) throw new Error("StatusFilter: state is a date");
  return (
    <Box>
      <Typography id="status-group" level="body-md" fontWeight="lg">
        Status
      </Typography>
      <FormHelperText>
        Indicates the current recruitment status or the expanded access status.
      </FormHelperText>
      <Box role="group" aria-labelledby="status-group">
        <List size="sm">
          {FilterDefaults.status.map((phase) => (
            <ListItem key={phase}>
              <Checkbox
                id={phase}
                checked={state && state.includes(phase)}
                label={phase}
                value={phase}
                onChange={(e) => {
                  if (e.target.checked) {
                    setState([...state, phase]);
                  } else {
                    setState(state.filter((p) => p !== phase));
                  }
                }}
              />
            </ListItem>
          ))}
        </List>
      </Box>
    </Box>
  );
};

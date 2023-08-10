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

export const PhaseFilter = () => {
  const [state, setState] = useFilterSlice("studies.phase");
  if (state === undefined) throw new Error("PhaseFilter: state is undefined");
  if (state instanceof Date) throw new Error("PhaseFilter: state is a date");
  return (
    <Box>
      <Typography id="sandwich-group" level="body-md" fontWeight="lg">
        Phases
      </Typography>
      <FormHelperText>
        The stage of a clinical trial studying a drug or biological product,
        based on definitions developed by the U.S. Food and Drug Administration
        (FDA).
      </FormHelperText>
      <Box role="group" aria-labelledby="sandwich-group">
        <List size="sm">
          {FilterDefaults.phases.map((phase) => (
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
                    if (state.length > 1)
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

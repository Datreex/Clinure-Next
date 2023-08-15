"use client";
import {
  Autocomplete,
  AutocompleteOption,
  Box,
  Button,
  Chip,
  FormControl,
  FormHelperText,
  FormLabel,
  ListItem,
  ListItemButton,
  Typography,
} from "@mui/joy";
import {
  PropsWithChildren,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { createPortal } from "react-dom";
import { useFilterSlice } from "@/lib/filters";
import { useQuery } from "@tanstack/react-query";

export const ConditionsFilter = () => {
  const [open, setOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  // const { trigger, loading,  } = useFetch(fetchConditions);
  let url = ` /api/options?dimension=browse_conditions.mesh_term&filter=${JSON.stringify(
    {
      member: "browse_conditions.downcase_mesh_term",
      operator: "contains",
      values: [inputValue.toLowerCase()],
    },
  )}`;
  const {
    isLoading: loading,
    error,
    refetch: trigger,
    data,
  } = useQuery<string[]>({
    queryKey: ["conditions", inputValue],
    queryFn: async () => {
      const response = await fetch(url);
      return await response.json();
    },
    refetchOnWindowFocus: false,
    enabled: false,
  });
  useEffect(() => {
    if (inputValue.length > 2) trigger();
  }, [trigger, inputValue]);
  const [state, setState] = useFilterSlice("browse_conditions.mesh_terms");
  return (
    <Box>
      <Typography level="body-md" fontWeight="lg">
        Condition or disease
      </Typography>
      <FormHelperText>
        The disease, disorder, syndrome, illness, or injury that is being
        studied
      </FormHelperText>
      <Autocomplete
        id="conditions"
        autoComplete
        autoSelect
        freeSolo
        placeholder={"Search for a condition"}
        multiple
        options={data || []}
        value={state as string[]}
        loading={loading}
        onChange={(event, newValue) => {
          setState(newValue);
        }}
        inputValue={inputValue}
        onInputChange={(event, newInputValue) => {
          setInputValue(newInputValue);
          // if (newInputValue.length > 2) trigger();
        }}
        renderOption={(props, option, state) => {
          return (
            <AutocompleteOption {...props} key={option}>
              {option}
            </AutocompleteOption>
          );
        }}
        renderTags={(tagValue, getTagProps) => {
          return tagValue.map((option, index) => (
            <Chip {...getTagProps({ index })} key={option}>
              {option}
            </Chip>
          ));
        }}
      />
      {/*<Debugger>*/}
      {/*  <Button onClick={() => trigger("leukemia")}>click</Button>*/}
      {/*  <SyntaxHighlighter language="json">*/}
      {/*    {JSON.stringify({ loading, data, error }, null, 2)}*/}
      {/*  </SyntaxHighlighter>*/}
      {/*</Debugger>*/}
    </Box>
  );
};

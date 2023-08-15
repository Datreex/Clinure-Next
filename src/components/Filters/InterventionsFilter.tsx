"use client";
import {
  Autocomplete,
  Box,
  Button,
  Chip,
  FormControl,
  FormHelperText,
  FormLabel,
  Typography,
} from "@mui/joy";
import {
  PropsWithChildren,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { ProgressResult } from "@cubejs-client/core";
import { createPortal } from "react-dom";
import SyntaxHighlighter from "react-syntax-highlighter";
import { useFilterSlice } from "@/lib/filters";
import { useQuery } from "@tanstack/react-query";

export const InterventionsFilter = () => {
  const [open, setOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  let url = `/api/options?dimension=browse_interventions.mesh_term&filter=${JSON.stringify(
    {
      member: "browse_interventions.downcase_mesh_term",
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
    queryKey: ["interventions", inputValue],
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
  const [state, setState] = useFilterSlice("browse_interventions.mesh_terms");
  return (
    <Box>
      <Typography level="body-md" fontWeight="lg">
        Intervention/Treatment
      </Typography>
      <FormHelperText>
        A process or action that is the focus of a clinical study. Interventions
        include drugs, medical devices, procedures, vaccines, and other products
        that are either investigational or already available.
      </FormHelperText>
      <Autocomplete
        id="interventions-filter"
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
        }}
        // renderOption={(props, option) => {
        //   return (
        //     <li {...props} key={option}>
        //       {option}
        //     </li>
        //   );
        // }}
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

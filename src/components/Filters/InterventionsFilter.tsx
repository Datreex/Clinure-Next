"use client";
import { cubeJsApi } from "@/Providers/Cube";
import {
  Autocomplete,
  Box,
  Button,
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

async function fetchInterventions(val: string) {
  return await cubeJsApi.load(
    {
      dimensions: ["browse_interventions.mesh_term"],
      filters: [
        {
          member: "browse_interventions.downcase_mesh_term",
          operator: "contains",
          values: [val.toLowerCase()],
        },
      ],
    },
    {
      mutexKey: "conditions",
      progressCallback(result: ProgressResult) {
        // console.log(result);
      },
    },
  );
}

const useFetch = (fn: typeof fetchInterventions) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<string[] | undefined>();
  const [error, setError] = useState<Error | undefined>();

  const trigger = useCallback(
    (val: string) => {
      setLoading(true);
      fn(val)
        .then((data) => {
          setData(
            // @ts-ignore
            data.rawData().map((d) => d["browse_interventions.mesh_term"]),
          );
        })
        .catch(setError)
        .finally(() => setLoading(false));
    },
    [fn],
  );
  return { trigger, loading, data, error };
};

export const InterventionsFilter = () => {
  const [open, setOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const { trigger, loading, data, error } = useFetch(fetchInterventions);
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
          if (newInputValue.length > 2) trigger(newInputValue);
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

const Debugger = ({ children }: PropsWithChildren) => {
  //create a portal to the body so that the debugger can be used anywhere
  const portal = useMemo(() => document.createElement("div"), []);
  portal.className =
    "fixed bottom-0 right-0 z-100 w-1/2 h-1/2 bg-white overflow-auto";
  useEffect(() => {
    document.body.appendChild(portal);
    return () => {
      document.body.removeChild(portal);
    };
  }, [portal]);
  return createPortal(<>{children}</>, portal);
};

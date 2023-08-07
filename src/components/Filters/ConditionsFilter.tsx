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

async function fetchConditions(val: string) {
  return await cubeJsApi.load(
    {
      dimensions: ["browse_conditions.mesh_term"],
      filters: [
        {
          member: "browse_conditions.downcase_mesh_term",
          operator: "contains",
          values: [val.toLowerCase()],
        },
      ],
    },
    {
      mutexKey: "conditions",
      progressCallback(result: ProgressResult) {
        console.log(result);
      },
    },
  );
}

const useFetch = (fn: typeof fetchConditions) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<string[] | undefined>();
  const [error, setError] = useState<Error | undefined>();

  const trigger = useCallback(
    (val: string) => {
      setLoading(true);
      fn(val)
        .then((data) => {
          // @ts-ignore
          setData(data.rawData().map((d) => d["browse_conditions.mesh_term"]));
        })
        .catch(setError)
        .finally(() => setLoading(false));
    },
    [fn],
  );
  return { trigger, loading, data, error };
};

export const ConditionsFilter = () => {
  const [open, setOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const { trigger, loading, data, error } = useFetch(fetchConditions);
  const [state, setState] = useFilterSlice("studies.conditions");
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

"use client";
import { PropsWithChildren, useState } from "react";
import { Button } from "@mui/joy";
import { Collapse } from "@mui/material";
import ExpandMoreRoundedIcon from "@mui/icons-material/ExpandMoreRounded";
import {
  CollapseContextProvider,
  useCollapseContext,
} from "@/components/CollapseContext";
export const CollapseWithTitle = ({
  title,
  children,
}: PropsWithChildren<{ title: string }>) => {
  const [isOpen, setIsOpen] = useState(false);
  const handleCollapse = () => setIsOpen(!isOpen);
  return (
    <CollapseContextProvider collapsed={isOpen} setCollapsed={setIsOpen}>
      <div className={"flex-col justify-start items-start gap-1.5 inline-flex"}>
        <Button
          onClick={handleCollapse}
          sx={{
            bgcolor: "transparent",
            color: "neutral.600",
            fontSize: "1rem",
            fontWeight: "semibold",
            padding: "0rem 0rem",
            margin: "0rem 0rem",
            justifyContent: "flex-start",
            gap: "0rem",
            minHeight: "0rem",
            "&:hover": {
              bgcolor: "transparent",
              color: "neutral.600",
            },
            "&:focus": {
              bgcolor: "transparent",
              color: "neutral.600",
            },
            "&:active": {
              bgcolor: "transparent",
              color: "neutral.600",
            },
          }}
          startDecorator={<CollapseIcon isOpen={isOpen} />}
        >
          {title}
        </Button>
        <Collapse in={isOpen} timeout={100}>
          {children}
        </Collapse>
      </div>
    </CollapseContextProvider>
  );
  {
    /*<div className={"flex-col justify-start items-start gap-1.5 inline-flex"}>*/
  }
  {
    /*  <div className="text-neutral-600 text-xs font-bold uppercase">*/
  }
  {
    /*    Conditions*/
  }
  {
    /*  </div>*/
  }
};

const CollapseIcon = ({ isOpen }: { isOpen: boolean }) => {
  return (
    <div
      className={`w-min flex items-center justify-center transition duration-200 ${
        isOpen ? " rotate-180" : ""
      }`}
    >
      <ExpandMoreRoundedIcon
        sx={{
          padding: "0",
          margin: "0",
        }}
      />
    </div>
  );
};

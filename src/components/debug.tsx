import SyntaxHighlighter from "react-syntax-highlighter";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

export const DEBUGGER = ({ data }: { data: any }) => {
  //create a portal to the body so that the debugger can be used anywhere
  const [portal, setPortal] = useState<HTMLDivElement | null>(null);
  const className =
    "fixed bottom-0 right-0 z-50 w-1/2 h-1/2 bg-white overflow-auto";
  useEffect(() => {
    if (!portal) setPortal(document.createElement("div"));
    if (portal) {
      portal.className = className;
      portal.id = "filterStateDebugger";
      document.body.appendChild(portal);
    }
    return () => {
      if (portal) document.body.removeChild(portal);
    };
  }, [portal]);
  if (!portal) return null;
  return createPortal(
    <SyntaxHighlighter language="json" wrapLines>
      {JSON.stringify(data, null, 2)}
    </SyntaxHighlighter>,
    portal,
  );
};

import { PropsWithChildren } from "react";

export default function Floating(
  props: PropsWithChildren<{ className?: string }>,
) {
  return (
    <div className={`fixed p-5  ${props.className}`}>{props.children}</div>
  );
}

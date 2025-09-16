import classnames from "classnames";
import type { CharStatus } from "../../lib/statuses";

type Props = {
  value?: string;
  status?: CharStatus;
};

export const Cell = ({ value, status }: Props) => {
  const classes = classnames("w-14 h-14 flex items-center justify-center mx-0.5 text-lg font-bold rounded uppercase", {
    "bg-background border-neutral border-solid border-2": !status,
    "bg-absent": status === "absent",
    "bg-present": status === "correct",
    "bg-misplaced": status === "present",
    "cell-animation": !!value,
  });

  return <div className={classes}>{value}</div>;
};

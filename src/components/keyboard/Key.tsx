import classnames from "classnames";
import type { ReactNode } from "react";
import type { KeyValue } from "../../lib/keyboard";
import type { CharStatus } from "../../lib/statuses";

type Props = {
  children?: ReactNode;
  value: KeyValue;
  width?: number;
  status?: CharStatus;
  onClick: (value: KeyValue) => void;
};

export const Key = ({ children, status, width = 40, value, onClick }: Props) => {
  const classes = classnames(
    "flex items-center justify-center rounded mx-0.5 text-s font-mono font-bold cursor-pointer select-none light:shadow-sm sm:m-0.5 sm:mx-1",
    {
      "bg-neutral hover:ring-2 hover:ring-neutral": !status,
      "bg-absent hover:ring-2 hover:ring-absent": status === "absent",
      "bg-present hover:ring-2 hover:ring-present": status === "correct",
      "bg-misplaced hover:ring-2 hover:ring-misplaced": status === "present",
    },
  );

  const handleClick: React.MouseEventHandler<HTMLButtonElement> = (event) => {
    onClick(value);
    event.currentTarget.blur();
  };

  return (
    <button
      style={{
        width: `${width}px`,
        height: "58px",
        textTransform: "uppercase",
      }}
      className={classes}
      onClick={handleClick}
    >
      {children || value}
    </button>
  );
};

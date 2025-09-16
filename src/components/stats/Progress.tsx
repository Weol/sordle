import classnames from "classnames";

type Props = {
  index: number;
  size: number;
  label: string;
};

export const Progress = ({ index, size, label }: Props) => {
  const classes = classnames("bg-active text-s font-medium text-writing text-center p-0.5 pl-2 pr-2 rounded-l-full min-w-5", 
  {
    "rounded-full": size === 1,
  })

  return (
    <div className="flex justify-left m-1">
      <div className="items-center justify-center w-2">{index + 1}</div>
      <div className="rounded-full w-full ml-2 bg-neutral">
        <div
          style={{ width: `${size * 100}%` }}
          className={classes}
        >
          {label}
        </div>
      </div>
    </div>
  );
};

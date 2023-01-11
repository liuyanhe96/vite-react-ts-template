import "./style.scss";

import classnames from "classnames";

type InputSize = "large" | "default" | "small";
// 原声的input是有自己的属性
interface IInputProps
  // 使用Omit排除HTMLInputElement中的size prefix属性
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size" | "prefix"> {
  defaultValue?: string;
  disabled?: boolean;
  size?: InputSize;
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
  addonBefore?: React.ReactNode;
  addonAfter?: React.ReactNode;
  allowClear?: boolean;
  classname?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClear?: () => void;
}

const Input: React.FunctionComponent<IInputProps> = props => {
  const {
    disabled,
    size,
    prefix,
    suffix,
    addonAfter,
    addonBefore,
    allowClear,
    className: cls,
    onClear,
    onChange,
    ...restProps
  } = props;

  const classes = classnames("input", cls, {
    disabled: disabled,
    [`input-${size}`]: size,
    "allow-clear": allowClear,
    "input-before": addonBefore,
    "input-after": addonAfter,
  });

  return (
    <div className={classes}>
      {addonBefore && <div className="addon before">{addonBefore}</div>}
      <input {...restProps} />
      {addonAfter && <div className="addon after">{addonAfter}</div>}
    </div>
  );
};

Input.defaultProps = {
  size: "default",
};

export default Input;

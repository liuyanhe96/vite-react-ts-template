import "./style.scss";

import classnames from "classnames";
import { useRef, useState } from "react";
import { useHover } from "usehooks-ts";

import Icon from "../Icon";

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

  const hoverRef = useRef(null);
  const isHover = useHover(hoverRef);

  const [value, setValue] = useState(props.defaultValue || "");

  const classes = classnames("input", cls, {
    disabled: disabled,
    [`input-${size}`]: size,
    "allow-clear": allowClear,
    "input-before": addonBefore,
    "input-after": addonAfter,
  });

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
    setValue(e.target.value.trim());
    onChange && onChange(e); // 把事件回调出去
  };

  const handleClear = () => {
    setValue("");
    onClear && onClear();
  };

  return (
    <div className={classes}>
      {addonBefore && <div className="addon before">{addonBefore}</div>}
      <div className="input-wrapper">
        {prefix && <span className="prefix">{prefix}</span>}
        <input
          disabled={disabled}
          {...restProps}
          value={value}
          onChange={handleOnChange}
        />
        {allowClear && (
          <span
            className="icons"
            ref={hoverRef}
            onClick={handleClear}
            role="presentation"
          >
            {value.trim().length > 0 && (
              <Icon
                type="bs"
                size={12}
                color={isHover ? "#ddd" : "#eee"}
                icon="BsXCircleFill"
              ></Icon>
            )}
          </span>
        )}
        {suffix && <span className="suffix">{suffix}</span>}
      </div>
      {addonAfter && <div className="addon after">{addonAfter}</div>}
    </div>
  );
};

Input.defaultProps = {
  size: "default",
};

export default Input;

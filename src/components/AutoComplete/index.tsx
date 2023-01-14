import classnames from "classnames";
import { useState } from "react";

type LabelOptions =
  | string
  | { label: string; value: string; [key: string]: any }; // 用户其他属性[key: string]: any

type FilterType = (inputValue: string, option: LabelOptions) => boolean;

interface IAutoCompleteProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "onSelect"> {
  // onSelect属性冲突 这里要把它omit出来
  // 本质是input输入框
  className?: string;
  options?: Array<LabelOptions>;
  autoFocus?: boolean;
  defaultValue?: string;
  disabled?: boolean;
  render?: (options: LabelOptions) => React.ReactNode; // 返回DOM节点
  filterOptions?: FilterType;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSelect?: (item: LabelOptions) => void;
}

const AutoComplete: React.FunctionComponent<IAutoCompleteProps> = props => {
  const {
    className: cls,
    disabled,
    filterOptions,
    onSelect,
    onChange,
    render,
    ...restProps
  } = props;

  // value ---> 绑定input
  const [value, setValue] = useState(props.defaultValue || "");
  // result ---> 存储提示结果列表
  const [result, setResults] = useState([] as Array<LabelOptions>);

  const classes = classnames("auto-complete", cls, {
    disabled: disabled,
  });

  const onChangeHandle = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim();
    setValue(value);
    if (!value) {
      // 没有value 用户未进入到筛选的状态 需要把result设置未空
      // 用户删除value，需要清空所以的弹出提示效果
      setResults([]);
      return;
    }
    // 用户有传onChange 需要回调
    onChange && onChange(e);

    // 1.  LabelOptions --> string | {}; {}类型需要拿到里面的label 再对其进行过滤
    // 2. filterOptions -> 用户自定义筛选
    if (typeof filterOptions === "function") {
      // 2. filterOptions -> 用户自定义筛选
      if (props.options) {
        const arr = [] as Array<LabelOptions>;
        props.options.forEach(item => {
          if (filterOptions(value, item)) {
            arr.push(item);
          }
          setResults(arr);
        });
      }
    } else {
      // 1. 默认情况  LabelOptions --> string | {}; {}类型需要拿到里面的label 再对其进行过滤
      // 用户有设置value 首先判断options是否存在，还需要判断其中元素什么类型（string）
      if (
        props.options &&
        props.options[0] &&
        typeof props.options[0] === "string"
      ) {
        const arr = props.options as string[];
        const result = arr.filter(item => item.indexOf(value) !== -1); // item是否包含value
        setResults(result);
      } else {
        // 对象情形
        const arr = props.options as Array<{
          label: string;
          value: string;
          [key: string]: any;
        }>;
        const result = arr.filter(item => item.label.indexOf(value) !== -1);
        setResults(result);
      }
    }
  };

  const renderNodes = (item: LabelOptions) => {
    // 用户会设置自定义的render方法
    if (typeof render === "function") {
      return render(item);
    } else {
      return typeof item === "string" ? item : item.label;
    }
  };

  const selectHandle = (i: LabelOptions) => {
    // 清空result
    setResults([]);
    // 设置value
    if (typeof i === "string") {
      setValue(i);
    } else {
      setValue(i.label);
    }
    // 回调onSelect
    onSelect && onSelect(i);
  };

  return (
    <div className={classes}>
      <input
        value={value}
        disabled={disabled}
        {...restProps}
        onChange={onChangeHandle}
      />
      {result.length > 0 && (
        <ul>
          {result.map((item, index) => {
            return (
              <li
                key={index}
                onClick={() => selectHandle(item)}
                role="presentation"
              >
                {renderNodes(item)}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default AutoComplete;

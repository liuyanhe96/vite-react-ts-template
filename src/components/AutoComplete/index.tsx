import classnames from "classnames";

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

  const classes = classnames("auto-complete", cls, {
    disabled: disabled,
  });

  return (
    <div className={classes}>
      <input disabled={disabled} {...restProps} />
    </div>
  );
};

export default AutoComplete;

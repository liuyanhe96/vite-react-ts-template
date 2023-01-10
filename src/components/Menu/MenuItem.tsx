// 子组件中是useContext来获取对应的value属性，这里要export 才可以在其他组件中拿到！！
import classnames from "classnames";
import { useContext } from "react";

import { MenuContext } from "@/components/Menu/index";

export interface IMenuItemProps {
  index?: string;
  disabled?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

const MenuItem: React.FunctionComponent<IMenuItemProps> = props => {
  // const context = useContext(MenuContext);
  // console.log("context " + JSON.stringify(context));
  const { onSelect, index: currentIndex } = useContext(MenuContext);
  const { index, className: cls, style, children, disabled } = props;
  const handleClick = () => {
    if (onSelect && !disabled && index && typeof index === "string") {
      // 把MenuItem index属性传递出去
      onSelect(index);
    }
  };

  const classes = classnames("menu-item", cls, {
    disabled: disabled,
    active: index === currentIndex,
  });
  return (
    <li
      className={classes}
      style={style}
      onClick={handleClick}
      role="presentation"
    >
      {children}
    </li>
  );
};

MenuItem.displayName = "MenuItem";

export default MenuItem;

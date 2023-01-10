// import * as React from "react";
import { default as Item, IMenuItemProps } from "./MenuItem"; // 把MenuItem挂到Menu 在其他组件就可以使用<Menu.item>

type MenuMode = "horizontal" | "vertical";

// MenuType是联合类型&
type MenuType = React.FunctionComponent<IMenuProps> & {
  Item: React.FunctionComponent<IMenuItemProps>;
};

interface IMenuProps {
  defaultIndex?: string; // 默认被选中菜单项
  className?: string;
  mode?: MenuMode; // 菜单模式是横向还是纵向
  style?: React.CSSProperties;
  defaultOpenKeys?: string[];
  onSelect?: (selected: string) => void; // 用户选中后执行的回调方法
}

// children是在React.FunctionComponent中定义
const Menu: MenuType = props => {
  const { className: cls, style, children } = props;
  return (
    <ul className={cls} style={style}>
      {children}
    </ul>
  );
};

Menu.defaultProps = {
  defaultIndex: "0",
  mode: "horizontal",
  defaultOpenKeys: [],
};

// 把MenuItem挂到Menu属性上去 在其他组件就可以使用<Menu.item>
Menu.Item = Item;

export default Menu;

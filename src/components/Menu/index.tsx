// import * as React from "react";
import classnames from "classnames";
// 1. 使用classnames合并menu的公共类名
// 2. 当在Menu上面触发onSelect事件 -> 设置MenuItem的active状态，这个状态是存储在Menu上面的 -> 父子状态传递
// 3. 状态管理： hooks -> useContext；或 简单的状态管理方案
import { createContext, useState } from "react";

import { default as Item, IMenuItemProps } from "./MenuItem"; // 把MenuItem挂到Menu 在其他组件就可以使用<Menu.item>
import { default as SubMenu, ISubMenuProps } from "./SubMenu";

/*   -------------------------------- type & interface ---------------------------------------- */
type MenuMode = "horizontal" | "vertical";

// MenuType是联合类型&
type MenuType = React.FunctionComponent<IMenuProps> & {
  Item: React.FunctionComponent<IMenuItemProps>;
  SubMenu: React.FunctionComponent<ISubMenuProps>;
};
type SelectFunction = (selected: number) => void;

interface IMenuProps {
  defaultIndex?: number; // 默认被选中菜单项
  className?: string;
  mode?: MenuMode; // 菜单模式是横向还是纵向
  style?: React.CSSProperties;
  defaultOpenKeys?: string[];
  onSelect?: SelectFunction; // 用户选中后执行的回调方法
}

interface IMenuContext {
  index: number;
  onSelect?: SelectFunction;
  // 传递给SubMenu的
  mode?: string;
  defaultOpenKeys?: string[];
}

/*   -------------------------------- Code ---------------------------------------- */

// 去子组件中是useContext来获取对应的value属性，这里要export 才可以在其他组件中拿到！！
export const MenuContext = createContext<IMenuContext>({ index: 0 });

// children是在React.FunctionComponent中定义
const Menu: MenuType = props => {
  const {
    className: cls,
    mode,
    style,
    children,
    defaultIndex,
    onSelect,
    defaultOpenKeys,
  } = props;

  const classes = classnames("menu", cls, {
    vertical: mode === "vertical",
  });

  const [current, setCurrent] = useState(defaultIndex);
  const handleClick = (index: number) => {
    setCurrent(index);
    if (onSelect) {
      // 如果用户设置了onSelect方法 就需要执行onSelect回调
      onSelect(index); // 把index传递出去
    }
  };
  // 设置要传递的val
  const value: IMenuContext = {
    index: current ? current : 0,
    onSelect: handleClick,
    // 传递给SubMenu的
    mode,
    defaultOpenKeys,
  };
  return (
    <div>
      <ul className={classes} style={style}>
        <MenuContext.Provider value={value}>{children}</MenuContext.Provider>
      </ul>
      <div>current: {current}</div>
    </div>
  );
};

Menu.defaultProps = {
  defaultIndex: 0,
  mode: "horizontal",
  defaultOpenKeys: [],
};

// 把MenuItem挂到Menu属性上去 在其他组件就可以使用<Menu.item>
Menu.Item = Item; // Item: React.FunctionComponent<IMenuItemProps>;
// SubMenu挂到Menu上去
Menu.SubMenu = SubMenu;

export default Menu;
